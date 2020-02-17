import { ProductService } from './../../providers/product.service';
import { AuthService } from 'src/providers/auth.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';


import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavController, Events, ModalController, ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/providers/loading/loading.service';
import { CouponService } from 'src/providers/coupon/coupon.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../modals/login/login.page';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  total: any;
  subtotal: any;
  c = '';
  couponArray = [];
  products = [];
  loadingServerData = true;
  productQArray = {};

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public config: ConfigService,
    public http: HttpClient,
    public loading: LoadingService,
    private storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
    private applicationRef: ApplicationRef,
    public couponProvider: CouponService,
    public actionSheetCtrl: ActionSheetController,
    public auth: AuthService,
    public productService: ProductService,
  ) {
  }
  
  qunatityMinus(prd):void{
    if (this.productQArray[prd] == null) {
      this.productQArray[prd] = 0;
    } else if (this.productQArray[prd] > 0) {
      this.productQArray[prd] --;
    }

  }

  qunatityPlus(prd):void{
    if (this.productQArray[prd] == null) {
      this.productQArray[prd] = 0;
    } else {
      this.productQArray[prd] ++;
    }
  }

  getQunatity(prd){
    if (this.productQArray[prd] == null) {
      return 0;
    } else {
      return this.productQArray[prd];
    }
  }

  removeCart(prd){
    this.productService.removeFromCartList(prd);
    this.reLoadCart();
  }


  reLoadCart(){
    this.products = this.productService.getCartArray();
  }
  ngOnInit() {
  //  var result = Object.keys(this.productService.cartArray).map(function(key) {
  //   return [key, this.productService.cartArray[key]];
  // });
  this.reLoadCart();
    
  // console.log(Object.entries(this.productService.cartArray)[0][1]);
  // console.log(result)
  }

}
