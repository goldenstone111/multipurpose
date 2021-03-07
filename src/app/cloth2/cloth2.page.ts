import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/provider/helper.service';
import { IonSlides} from '@ionic/angular';
@Component({
  selector: 'app-cloth2',
  templateUrl: './cloth2.page.html',
  styleUrls: ['./cloth2.page.scss'],
})
export class Cloth2Page implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
  @ViewChild('mySlider1')  slides1: IonSlides;
  gender;
  data: any = [];
  lowerwear;
  upperwear;
  dress;
  selectedUW = -10;
  selectedLW = -10;
  status= 0
  slideOpts = {
    initialSlide: 0,
    freeMode: true,
    spaceBetween: 20,
    loop:true,
    speed: 400,
    slidesPerView: 5,
   
  };
  slideOpts1 = {
    initialSlide: 0,
    // initialSlide: -1,
    freeMode: true,
    loop:true,
    spaceBetween: 20,
    speed: 500,
    slidesPerView: 5,
   
  };
  constructor( public helper: HelperService, public router: Router, public route: ActivatedRoute) {
      this.gender = this.route.snapshot.params.gender;
      this.data[0] = this.route.snapshot.params.upperwear;
      this.data[1] = this.route.snapshot.params.lowerwear;
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getItemFromCategory()
  }

  swipeNext(i) {
    debugger;
    i==0?this.slides.slideNext():this.slides1.slideNext()
    
    this.slides.getActiveIndex().then((value)=> {
      this.selectedUW = value-this.dress.Upperwear.length;
    })
    this.slides1.getActiveIndex().then((value1)=> {
      this.selectedLW = value1-this.dress.Lowerwear.length;
    })
     
  }
  swipePrevious(i) {
    debugger;
    i==0?this.slides.slidePrev():this.slides1.slidePrev()
    this.slides.getActiveIndex().then((value)=> {
      this.selectedUW = value-this.dress.Upperwear.length;
    })
    this.slides1.getActiveIndex().then((value1)=> {
      this.selectedLW = value1-this.dress.Lowerwear.length;
    })
  }

  getItemFromCategory() {
    this.helper.httpRequest('Getitemlist','POST', {type: this.gender,cat_id: this.data}).then((res:any)=>{
      if(res.status==true || res.status == "true"  || res.code == 200) {
        debugger;
        if(res.message.Upperwear.length>0 || res.message.Lowerwear.length>0) {
          this.dress = res.message;
          this.status = 1;
          setTimeout(() => {


            this.slides.getSwiper().then(sw => sw.init()).then(() => {
              this.slides.slideTo(2, 0);
              });
              this.slides1.getSwiper().then(sw => sw.init()).then(() => {
                this.slides1.slideTo(4, 0);
                });
            // this.slides.slideTo(1);

            // this.slides1.slideTo(6);
            
          }, 200);
          // this.slideOpts.initialSlide =  this.dress.Upperwear.length-2
          // this.slideOpts1.initialSlide = this.dress.Lowerwear.length-1
        } else {
          this.dress = {};
          this.status = -1;
        }
        // this.dress = res.message;
      } else {
        // this.helper.showToast(res.message);
      }
    }) 
  }
 back() {
   
 }
}
