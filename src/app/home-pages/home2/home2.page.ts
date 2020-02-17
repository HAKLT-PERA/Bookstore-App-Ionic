import { ProductService } from './../../../providers/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { IonContent, Events } from '@ionic/angular';
@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  scrollTopButton = false;//for scroll down fab 
  search = "";
  constructor(
    public shared: SharedDataService,
    public events: Events, 
    public product: ProductService,
    ) {

  }
  // For FAB Scroll
  onScroll(e) {
    if (e.detail.scrollTop >= 500) {
      this.scrollTopButton = true;
    }
    if (e.detail.scrollTop < 500) {
      this.scrollTopButton = false;
    }
  }
  // For Scroll To Top Content
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }

  getCartSize(){
    return this.product.getCartArray().length;
  }

  ngOnInit() {
  }

  onChangeKeyword(event){
    console.log(this.search);
  }

  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }
}
