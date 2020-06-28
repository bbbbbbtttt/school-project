import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  mainuser: AngularFirestoreDocument
  titre: string
  username: string
  profilePic: string
  postID: string
  effect: string = ''
  euro
  post
  postReference: AngularFirestoreDocument
  sub
  num
  details
  date
  copyText: string=""
  heartType: string = "heart-outline"
  
  sliderOpts = {
    zoom: {
      maxRatio: 2
    }
  }

  constructor(
    
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router,
    

     ) {
       this.mainuser = afs.doc(`users/${user.getUID()}`)
     this.sub = this.mainuser.valueChanges().subscribe(event =>{
      this.username = event.username
      this.titre = event.titre
      this.profilePic = event.profilePic
      this.num = event.num
      this.details = event.details
      
    
   })
  }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id')
    this.postReference = this.afs.doc(`posts/${this.postID}`)
    this.sub = this.postReference.valueChanges().subscribe(val => {
      this.post = val
      this.effect = val.effect
      this.heartType = val.likes.includes(this.user.getUsername()) ? 'heart-sharp' : 'heart-outline'
    })
  }
  ngONDestroy(){
    this.sub.unsubscribe()
  }
  toggleHeart() {
    if(this.heartType == 'heart-outline'){
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUsername())
      })
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUsername())
      })
    }
  }
  
  

  

  

}
