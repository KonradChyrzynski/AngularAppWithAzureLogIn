import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { MainItemsLayoutComponent } from './main-items-layout/main-items-layout.component';
import { FavouriteItemsComponent } from './favourite-items/favourite-items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      MsalGuard
    ]
  },
  { path: 'items', component: MainItemsLayoutComponent},
  { path: 'favourite-items', component: FavouriteItemsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: '', redirectTo: '/items', pathMatch: 'full' },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
