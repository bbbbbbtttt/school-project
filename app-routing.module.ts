import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service'
const routes: Routes = [

  
  //welcome...withtheprofilpage
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  
  //thetabsmodule
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule), canActivate: [AuthService]
  },
  
  
  
  //option
  {
    path: 'option',
    loadChildren: () => import('./option/option.module').then( m => m.OptionPageModule), canActivate: [AuthService]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },

  //messagepath
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  
  {
    path: 'seletedboost',
    loadChildren: () => import('./seletedboost/seletedboost.module').then( m => m.SeletedboostPageModule)
  },
  
  
  //postorder
  
  {
    path: 'post/:id',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'postboost1/:id',
    loadChildren: () => import('./postboost1/postboost1.module').then( m => m.Postboost1PageModule)
  },
  {
    path: 'postboost2/:id',
    loadChildren: () => import('./postboost2/postboost2.module').then( m => m.Postboost2PageModule)
  },
  {
    path: 'postboost3/:id',
    loadChildren: () => import('./postboost3/postboost3.module').then( m => m.Postboost3PageModule)
  },
  {
    path: 'uploaderboost1',
    loadChildren: () => import('./uploaderboost1/uploaderboost1.module').then( m => m.Uploaderboost1PageModule), canActivate: [AuthService]
  },
  {
    path: 'uploaderboost2',
    loadChildren: () => import('./uploaderboost2/uploaderboost2.module').then( m => m.Uploaderboost2PageModule),canActivate: [AuthService]
  },
  {
    path: 'uploaderboost3',
    loadChildren: () => import('./uploaderboost3/uploaderboost3.module').then( m => m.Uploaderboost3PageModule),canActivate: [AuthService]
  },
  {
    path: 'paypal',
    loadChildren: () => import('./paypal/paypal.module').then( m => m.PaypalPageModule)
  },
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
