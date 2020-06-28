import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { UserService } from './user.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { ShareModule } from './share.module';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
import { PopoverComponent } from './popover/popover.component';
import { AngularFireFunctionsModule, FunctionsRegionToken} from '@angular/fire/functions'

@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpModule,
    ShareModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule,
    AngularFireFunctionsModule
    
   
    
    
    
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
       },
       
       NativePageTransitions,
       UserService,
       AuthService,
       Clipboard,
       PayPal,
       {provide: FunctionsRegionToken, useValue: 'us-cental1'}
     
    
      
       
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
