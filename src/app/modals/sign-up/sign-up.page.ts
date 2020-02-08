import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/providers/config/config.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { TermServicesPage } from '../term-services/term-services.page';
import { RefundPolicyPage } from '../refund-policy/refund-policy.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { AuthService } from '../../../providers/auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  formData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    wpgdprc: 1,
    register: 'Register',
    adr1:'',
    adr2:'',
    adr3:'',
  };
  image;
  errorMessage = '';
  constructor(
    public http: HttpClient,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    //public shared: SharedDataService,
    public platform: Platform,
    public auth : AuthService,

  ) {
    // /api/appusers/register/?insecure=cool&username=abcd&password=123456&email=abcdxyz@gmail.com&display_name=aopi&nonce=6ad2605198
  }
  createAccount() {
    this.loading.show();
      this.signUp();
  }

  signUp() {

    this.errorMessage = '';
    var formData = {
      phoneNo: this.formData.username,
      password: this.formData.password,
      role: "User",
      email: this.formData.email,
      fname: this.formData.first_name,
      lname:  this.formData.last_name,
      profileImg: "string",
      address: this.formData.adr1 + ', ' + this.formData.adr2 + ', ' + this.formData.adr3 + '.',
      exp: 2,
      iat: 2,
    }
    ;
    console.log(formData)
    this.auth.register(formData).subscribe((data:any)=>{
      console.log(data.token);
      console.log(this.auth.getUserDetails());
      this.dismiss();
      
    },(err)=>{
      this.loading.hide();
      console.log(err);
      this.errorMessage=err.error.message;
      
    })
  }

  async  openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }
  async  openTermServicesPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage
    });
    return await modal.present();
  }
  async  openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage
    });
    return await modal.present();
  }
  async dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
