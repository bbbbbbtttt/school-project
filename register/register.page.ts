import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  username: string = ""
  password: string = ""
  cpassword: string = ""
  num: string = ""
  details: string = ""

  constructor( 
    public afAuth: AngularFireAuth,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
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

  async register() {
    const { username, password, cpassword, num, details } = this
    if(password !== cpassword) {
     return console.error("Password don't match")
    }
  
    
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword( username + '@gmail.com', password)
      
      this.router.navigate(['/profil'])
     
      this.afstore.doc(`users/${res.user.uid}`).set({
        username,
        num,
        details,
       
        
        
        
      })

      
      this.user.setUser({
        username,
        
        
        
        uid: res.user.uid
        
      })
    
    
    } catch(err){
      console.dir(err)
      if(err.code === "auth/invalid-email"){
        console.log("non")
      this.presentAlert('oups', "verifié votre nom d'utilisateur car il n'est pas au bon format: (vous avez peut-être mis une espace ils ne sont pas autorisés)")
     }
     if(err.code === "auth/weak-password"){
      console.log("non")
    this.presentAlert('oups', 'Vous devez utiliser un mot de passe plus compliqué: (minimum 6 caractères)')
   }
   if(err.code === "auth/email-already-in-use"){
    console.log("non")
  this.presentAlert('oups', "nom d'utilisateur déjà utilisé")
 }
  }

 
}
}
