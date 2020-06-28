import { Component, OnInit, ViewChild } from '@angular/core';

import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController, ToastController, } from '@ionic/angular';


import {  AngularFirestoreDocument } from "@angular/fire/firestore";


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string
  titre: string
  desc: string
  desc2: string
  
  details:string
  date: string
  position: string
  notifications: string

  noFace: boolean = false
 
  
  scaleCrop: string = '-/scale_crop/300x300'
  
  mainuser: AngularFirestoreDocument
  
  userPosts
  sub
  posts
  num: string

  

  effects = {
    effect1: '',
    effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
    effect3: '-/filter/vevera/150/',
    effect4:  '-/filter/carris/150/',
    effect5: '-/filter/misiara/150/'

  } 
  
  activeEffect: string = this.effects.effect1

  busy: boolean = false
  
 
  @ViewChild('filebtn', {static: false}) filebtn
  
  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private afs: AngularFirestore) {
      
      this.mainuser = afs.doc(`users/${user.getUID()}`)
    
    this.sub = this.mainuser.valueChanges().subscribe(event =>{

      this.num = event.num
      this.details = event.details
        
      
    }) }

  ngOnInit() {
  }
 
  
  

async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "ajouter une nouvelle annonce",
        buttons: [{
                text: 'selectionner votre image',
                handler: () => {
                    this.uploadFile();
                },
                
            }, {
              text: 'retour',
              
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            
            
            
            }]
    });
    await actionSheet.present();
}
  async createPost() {
    this.busy = true
    const image = this.imageURL
    const activeEffect = this.activeEffect
    const titre = this.titre
    const desc = this.desc
    const desc2 = this.desc2
    const date = this.date
    const position = this.position
    const num = this.num
    const details = this.details
    const notifications = this.notifications

   

  

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`),
      
    })

     this.afstore.doc(`posts/${image}`).set({
         titre,
         desc,
          desc2,
      position,
      date: new Date().toISOString(),
      num,
      details,
      notifications,
      
           
          author: this.user.getUsername(),
          likes: [],
        

          effect: activeEffect
    })


    this.busy = false
    this.imageURL = ""
    this.titre = ""
    this.desc = ""
    this.desc2 = ""
    this.date = ""
    this.position =""
    this.num = ""
    this.details = ""
    this.notifications = ""
   
    const alert = await this.alertController.create({
      header: 'OK',
      message: 'ton annonce est publier',
      buttons: ['Cool!']
    })

    await alert.present()

    this.router.navigate(['/tabs/profile'])
  }

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect]
  }
  uploadFile() {
    this.filebtn.nativeElement.click()
  }
  

 
  
  fileChanged(event) {
   
    this.busy = true
    
    
    const files = event.target.files
    
    
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','70ad163c6ba4aefe8e2d')

    
    this.http.post('https://upload.uploadcare.com/base/',data)
    .subscribe(event =>{
      console.log(event)
      this.imageURL = event.json().file
      this.busy = false
      this.http.get(`http://ucarecdn.com/${this.imageURL}/detect_faces/`)
      .subscribe(event => {
        this.noFace = event.json().faces == 0
      })
    })
    
  }
  gotoseletedboost() {
    this.router.navigate(['/seletedboost'])
  }






}

