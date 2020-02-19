import { AuthService } from "src/providers/auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private auth: AuthService) {}
  public products = [];
  public wishList = [];
  public cart = {};
  public cartArray = {};
 



  public getCartArray(){
    var result = [];
    
    // Object.entries(this.cartArray).forEach(element => {
    //   console.log("ent" + this.cart[element[1]['id']]);
    //   if(this.cart[element[1]['id']]){
        
    //     result.push(element[1]);
    //   }
      
    // });
    
    Object.entries(this.cart).forEach(ent=>{
      //console.log(ent);
      if (ent[1]){
        result.push(this.cartArray[ent[0]]);
      }
    })

    //console.log(result);
    return result;
  }

  public calculatePrice(price, rate)  {
    console.log(price - (price * rate / 100))
    return price - (price * rate / 100);
  }

  public addToWishList(item: any): void {
    if (!this.checkWishList(item)) {
      this.wishList.push(item);
    }
  }

  public checkWishList(item: any): boolean {
    this.wishList.forEach(element => {
      if (item === element) {
        return true;
      }
    });
    return false;
  }

  public removeFromWishList(item): void {
    let newArray = [];
    this.wishList.forEach(element => {
      if (item !== element) {

        newArray.push(element);
      }
    });
    this.wishList = newArray;
  }

  public addToCartList(item: any): void {
    if (!this.checkCartList(item)) {
      this.cart[item.id] = true;
      this.cartArray[item.id] = item;
      //this.updateCart();
    }
  }

  public checkCartList(item: any): boolean {
    if (this.cart[item.id] == true) {
      return true;
    }
    return false;
  }

  public getBookDetails(id){

    return this.auth.request("post", "getBookDetails", false, { id:id });

  }

  public removeFromCartList(item): void {
    this.cart[item.id] = false;
    this.cartArray[item.id] = null;
    //this.updateCart();
  }

  public getProducts(): void {
    this.auth.request("post", "getBookList", false, {}).subscribe(
      data => {
        if (data) {
          //console.log(data);
          this.products = data;
        }
      },
      err => {}
    );
  }

  public getLoadedProduct() {
    return this.products;
  }
}
