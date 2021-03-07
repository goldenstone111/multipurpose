import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HelperService } from 'src/provider/helper.service';

@Component({
  selector: "app-cloth1",
  templateUrl: "./cloth1.page.html",
  styleUrls: ["./cloth1.page.scss"],
})
export class Cloth1Page implements OnInit {
  ishighlightB = false;
  ishighlightG = false;
  category: any;
  clothSelected: any = false;
  status = 0 
  title = "Select your gender";
  gender: any;
  category1: any;
  slideOpts = {
    initialSlide: 0,
    freeMode: true,
    spaceBetween: 10,
    speed: 20,
    slidesPerView: 2,
  };
  upperWear: any;
  lowerWear: any;
  
  constructor( public helper: HelperService, public router: Router) {
    
  }

  ngOnInit() {}
  selectGender(i) {
    this.title = "Select cloth type";
    if (i == 0) {
      this.gender = "Boy";
      this.ishighlightB = true;
      this.ishighlightG = false;
    } else {
      this.gender = "Girl";
      this.ishighlightB = false;
      this.ishighlightG = true;
    }
    this.helper.httpRequest('Getcategorylist','POST', {type: this.gender}).then((res:any)=>{
      if(res.status==true || res.status == "true"  || res.code == 200) {
        if(res.message.upperwear.length>0 || res.message.lowerwear.length>0) {
          this.category = res.message;
          this.status = 1;
        } else {
          this.category = {};
          this.status = -1;
        }
        
      } else {
        // this.helper.showToast(res.message);
      }
    }) 
  }

  selectWear(type,j,data) {
    if (type==0) {
      for (let i = 0; i < this.category?.upperwear.length; i++) {
        let id = this.category?.upperwear[i].id;
        if(id == data.id) {
          this.upperWear = data.id;
          this.category.upperwear[i].isSelected = true;
        } else {
          this.category.upperwear[i].isSelected = false;
        }
      }
    } else {
      for (let i = 0; i < this.category?.lowerwear.length; i++) {
        let id = this.category?.lowerwear[i].id;
        if(id == data.id) {
          this.lowerWear = data.id;
          this.category.lowerwear[i].isSelected = true
        } else {
          this.category.lowerwear[i].isSelected = false;
        }
      }
    }
    if(this.upperWear && this.lowerWear )
    {
      this.clothSelected = true;
    } else {
      this.clothSelected = false;
    }
  }
  
  Next() {
    if(this.gender) {
      if(this.upperWear && this.lowerWear ) {
        this.router.navigate(['/cloth2', {gender:this.gender, upperwear:this.upperWear,lowerwear:this.lowerWear}])
      } else {
        this.helper.showToast('Please select both upperwear and lowerwear !');
      }
    }else {
      this.helper.showToast('Please select gender !');
    }
    
  }
}
