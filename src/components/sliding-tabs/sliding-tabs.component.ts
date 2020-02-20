import { ProductService } from './../../providers/product.service';
import { Component, OnInit, Input, ViewChild, ApplicationRef } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';


@Component({
  selector: 'app-sliding-tabs',
  templateUrl: './sliding-tabs.component.html',
  styleUrls: ['./sliding-tabs.component.scss'],
})
export class SlidingTabsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

  @Input('type') type;//product data
  @Input ('search') search;
  products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  selected = '0';
  page = 1;
  count = 0;
  loadingServerData = false;
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public loading: LoadingService,
    public prod: ProductService,
    private applicationRef: ApplicationRef
  ) {

  }
  getProducts(infiniteScroll) {

    this.products = this.prod.searchResult;
    
  }

  


  ngOnInit() {
    this.getProducts(null);
  }

}
