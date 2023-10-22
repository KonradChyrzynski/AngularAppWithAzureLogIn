import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { FavouriteItemsComponent } from './favourite-items/favourite-items.component';
import { ItemsCardsComponent } from './items-cards/items-cards.component';
import { ItemCardComponent } from './items-cards/item-card/item-card.component';
import { AddItemToCartComponent } from './items-cards/item-card/add-item-to-cart/add-item-to-cart.component';
import { ItemCounterComponent } from './items-cards/item-card/item-counter/item-counter.component';
import { RemoveItemFromCartComponent } from './items-cards/item-card/remove-item-from-cart/remove-item-from-cart.component';
import { MainItemsLayoutComponent } from './main-items-layout/main-items-layout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BeerService } from './services/beer.service';
import { ShoppingCartService } from './services/cart.service';
import { PaginationService } from './services/pagination.service';
import { FavouriteItemsService } from './services/favourite-items.service';
import { AddItemToFavouriteComponent } from './items-cards/add-item-to-favourite/add-item-to-favourite.component';
import { PaginationComponent } from './items-cards/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { FavouriteItemsEventStrategyService } from './services/favourite-items-strategy.service';
import { PaginationButtonComponent } from './items-cards/pagination/pagination-button/pagination-button.component';



const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'fe3a646e-7c0f-471c-8607-544863b54d37',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:4200/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    FavouriteItemsComponent,
    ItemsCardsComponent,
    AddItemToFavouriteComponent,
    ItemCardComponent,
    PaginationComponent,
    AddItemToCartComponent,
    ItemCounterComponent,
    RemoveItemFromCartComponent,
    ShoppingCartComponent,
    MainItemsLayoutComponent,
    NavbarComponent,
    PaginationButtonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MsalModule,
    FlexLayoutModule,
    FormsModule,
    MatIconModule   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    BeerService,
    ShoppingCartService,
    PaginationService,
    FavouriteItemsService,
    FavouriteItemsEventStrategyService 
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
