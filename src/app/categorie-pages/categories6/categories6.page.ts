import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';

@Component({
  selector: 'app-categories6',
  templateUrl: './categories6.page.html',
  styleUrls: ['./categories6.page.scss'],
})
export class Categories6Page implements OnInit {

  parent: any;
  name: any;
  categories: any = [];
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.parent = this.activatedRoute.snapshot.paramMap.get('parent');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
  }
  openProducts(id, name) {
    let count = 0;
    for (let val of this.shared.allCategories) {
      if (val.parent == id) {
        count++;
      }
    }
    if (count == 0) {
      this.router.navigateByUrl("/products/" + id + "/" + name + "/newest");
    }
    else {
      this.router.navigateByUrl("/categories6/" + id + "/" + name);
    }

  }
  openParentProducts() {
    this.router.navigateByUrl("/products/" + this.parent + "/" + this.name + "/newest");
  }
}


