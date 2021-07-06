import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FaqsService } from '../Services/faqs.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.page.html',
  styleUrls: ['./list-faq.page.scss'],
})
export class ListFAQPage implements OnInit {

  public faqs = []
  
  constructor(
    private faqsService:FaqsService,
    private navCtrl:NavController
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
      const sub = this.faqsService.getAll().subscribe(data =>{
          const resp:any = data
          this.faqs = resp.data.data
          console.log(this.faqs)
          sub.unsubscribe()
      })
  }
  
  cancelar(){
      this.navCtrl.back()
  }

  public getKeys(data){ 
      return Object.keys(data)
  }

  public getValues(data) {
      return Object.values(data)
  }

}
