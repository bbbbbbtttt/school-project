import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  
})
export class ProfilePage implements OnInit {
  mainuser: AngularFirestoreDocument
  mainusers: AngularFirestoreDocument
  userPosts
  sub
  posts
  titre: string
  username: string
  profilePic: string
  date: string 
  postboost1
  postboost2
  postboost3
  postsboost1
  postsboost2
  postsboost3
  post
  num
  
  postID
  author:string 
  desc
  
  constructor( public afDB: AngularFireDatabase, private afs: AngularFirestore, private user: UserService, private router: Router) {
    
    this.mainuser = afs.doc(`users/${user.getUID()}`)

    this.sub = this.mainuser.valueChanges().subscribe(event =>{

      
      
      this.posts = event.posts
      
      this.username = event.username
      
      this.profilePic = event.profilePic
      
      this.date = event.date
      this.titre = event.titre
      this.num = event.num
        
      
    })

    this.sub = this.mainuser.valueChanges().subscribe(event =>{

      
      
      this.postsboost1 = event.postsboost1
      
      this.username = event.username
      
      this.profilePic = event.profilePic
      
      this.date = event.date
      this.titre = event.titre
        
      
    })
    this.sub = this.mainuser.valueChanges().subscribe(event =>{

      
      
      this.postsboost2 = event.postsboost2
      
      this.username = event.username
      
      this.profilePic = event.profilePic
      
      this.date = event.date
      this.titre = event.titre
        
      
    })
    this.sub = this.mainuser.valueChanges().subscribe(event =>{

      
      
      this.postsboost3 = event.postsboost3
      
      this.username = event.username
      
      this.profilePic = event.profilePic
      
      this.date = event.date
      this.titre = event.titre
        
      
    })
    
    
  }
    


   

    
   
   
   ngOnDestroy() {
      this.sub.unsubscribe()
  }
   goTo1(postboost1ID: string) {
     this.router.navigate(['postboost1/' + postboost1ID.split('/')[0]])

   }
   goTo2(postboost2ID: string) {
    this.router.navigate(['postboost2/' + postboost2ID.split('/')[0]])

  }
  goTo3(postboost3ID: string) {
    this.router.navigate(['postboost3/' + postboost3ID.split('/')[0]])

  }
   goTo(postID: string) {
    this.router.navigate(['post/' + postID.split('/')[0]])

  }

   lets() {
     this.router.navigate(['option'])
   }

  ngOnInit() {
    
  }


} 
