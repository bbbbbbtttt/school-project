import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  username: string=""
  password: string=""

  constructor(
    public afAuth: AngularFireAuth,
     public user: UserService, 
     public router: Router,
     public alert: AlertController,
     public alertController: AlertController
      ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string){
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['Ok']
    })
    await alert.present()
  }
  register() {
    this.router.navigate(['/register'])
  }

  

   async login() {
    const { username, password} = this
    
    try{
      
      const res = await this.afAuth.auth.signInWithEmailAndPassword( username + '@gmail.com' , password)
      
      this.presentAlert('génial', 'tu est connecter!')
      this.router.navigate(['/feed'])

      if(res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/tabs'])


      }

    }catch(err) {
      console.dir(err)
      if(err.code === "auth/user-not-found" ){
        console.log("user not found")
        
      this.presentAlert('oups', 'utilisateur introuvable')
    }
    if(err.code === "auth/wrong-password"){
      console.log("wrong password")
      this.presentAlert('oups', 'mauvais mot de passe')
    }
    if(err.code === "auth/invalid-email"){
      console.log("wrong password")
      this.presentAlert('oups', "le nom d'utilisateur et mal écrit")
    }
    
    

    }
    
    
  }
  


}