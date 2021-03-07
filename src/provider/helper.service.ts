import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import {
  AlertController,
  ToastController,
  MenuController,
  Config,
  LoadingController,
  ActionSheetController,
  NavController,
  Platform
} from "@ionic/angular";
import { Injectable } from "@angular/core";
// import { FCM } from "@ionic-native/fcm/ngx";
import { Storage } from "@ionic/storage";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  token:any;
  isPremium:any = false;
  url = "";
  public loading: any;
  imageurl: any;
  constructor(
    // private fb: Facebook,
    public altCtrl: AlertController,
    public toastController: ToastController,
    public http: HttpClient,
    private imagePicker: ImagePicker,
    // public fcm: FCM,
    public router: Router,
    public navCtrl: NavController,
    public Storage: Storage,
    public actionSheetController: ActionSheetController,
    public menuCtrl: MenuController,
    public config: Config,
    private diagnostic: Diagnostic,
    public platform: Platform,
    public loadingController: LoadingController,
    public camera: Camera
  ) {
    // this.url = 'http://192.168.0.53/you_flip/api/';
    this.imageurl = "http://sarweb.itsharshgupta.com/managepro/api/Dashboard/";
    this.url = "http://sarweb.itsharshgupta.com/managepro/api/Dashboard/";
  }

  // camera functions ------------------------------------------------------------------------------------------------------->
  async cameraOptions(cb) {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      buttons: [
        {
          text: "Camera",
          role: "destructive",
          icon: "camera",
          handler: () => {
            this.openCamera(1, cb);
          }
        },
        {
          text: "Gallery",
          icon: "image",
          handler: () => {
            this.openCamera(0, cb);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async multiImageOptions(cb) {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      buttons: [
        {
          text: "Camera",
          role: "destructive",
          icon: "camera",
          handler: () => {
            this.openCamera(1, cb);
          }
        },
        {
          text: "Gallery",
          icon: "image",
          handler: () => {
            this.multiImagePicker(0, cb);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  openCamera(i, cb?) {
    if (i == 1) {
      const options: CameraOptions = {
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 50,
        // targetWidth: 375,
        allowEdit: false,
        // targetHeight: 300,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
      this.camera.getPicture(options).then(
        imageData => {
          let base64Image = "data:image/jpeg;base64," + imageData;
          let data = {
            type: "camera",
            image: base64Image,
            file: this.convertToFile(base64Image)
          };
          cb(data);
        },
        err => {
          if (err == 20 || err == "20") {
            let that = this;
            that.permissionConfirm(
              "Allow You-Flip access to your device's photo,media and camera.",
              function(status) {
                if (status) {
                  that.diagnostic.switchToSettings();
                }
              }
            );
          }
          cb(-1);
        }
      );
    } else {
      var options: any = {
        maximumImagesCount: 1,
        quality: 50,
        outputType: 1
      };
      this.imagePicker
        .hasReadPermission()
        .then(status => {
          if (status) {
            this.imagePicker.getPictures(options).then(imageData => {
              let base64Image = "data:image/jpeg;base64," + imageData;
              let data = {
                type: "camera",
                image: base64Image,
                file: this.convertToFile(base64Image)
              };
              cb(data);
            });
          } else {
            this.imagePicker
              .requestReadPermission()
              .then(status1 => {
                if (status1 === null) {
                } else {
                }
              })
              .catch(() => {
                let that = this;
                that.permissionConfirm(
                  "Allow You-Flip access to your device's photo,media and camera.",
                  function(status) {
                    if (status) {
                      that.diagnostic.switchToSettings();
                    }
                  }
                );
              });
          }
        })
        .catch(err => {
          alert("catch hasReadPermission");
        });
    }
  }

  multiImagePicker(a, cb ) {

    this.Storage.get("subscription").then((data)=> {
      debugger;
      let validUpTo = new Date(data.end_date) 
      let currentDate = new Date();
      if( validUpTo> currentDate) {
        this.isPremium = true;
        
      } else {
        this.isPremium = false;
      }
      var options: any = {
        maximumImagesCount: this.isPremium?10:4,
        quality: 50,
        outputType: 1
        // width: 375,
        // height: 300,
      };
      this.imagePicker
        .hasReadPermission()
        .then(status => {
          if (status) {
            this.imagePicker.getPictures(options).then(results => {
              let imageResponse = [];
              let fileResponse: any = [];
              for (var i = 0; i < results.length; i++) {
                imageResponse.push("data:image/jpeg;base64," + results[i]);
                fileResponse.push(
                  this.convertToFile("data:image/jpeg;base64," + results[i])
                );
              }
              const data = {
                images: imageResponse,
                files: fileResponse
              };
              cb(data);
            });
          } else {
            this.imagePicker
              .requestReadPermission()
              .then(status => {
                if (status === true) {
                } else {
                }
              })
              .catch(() => {
                let that = this;
                that.permissionConfirm(
                  "Allow You-Flip access to your device's photo,media and camera.",
                  function(status) {
                    if (status) {
                      that.diagnostic.switchToSettings();
                    }
                  }
                );
              });
          }
        })
        .catch(err => {
          console.log("errerr", err);
        });
    })
  }

  convertToFile(dataURI) {
    let blob = this.dataURItoBlob2(dataURI);
    // let file = new File([blob], 'image.jpeg', {type: ''image/jpeg'});
    return blob;
  }

  dataURItoBlob2(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  // facebook login ------------------------------------------------------------------------------------------------------------>

  // facebookLogin() {
  //   this.fb
  //     .login(["public_profile", "email"])
  //     .then(res => {
  //       this.fb
  //         .api(
  //           "me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)",
  //           []
  //         )
  //         .then(profile => {
  //           let userData = {
  //             name: profile["name"],
  //             email: profile["email"],
  //             image: profile["picture_large"]["data"]["url"],
  //             social_type: "facebook",
  //             social_id: res.authResponse.userID
  //           };
  //           this.fb.logout();
  //           console.log("userData", userData);
  //           debugger;
  //           this.httpRequest("userSocial", "POST", userData).then(
  //             (resp: any) => {
  //               if (resp.status === "true") {
  //                 localStorage.setItem("userloginforyouflip", "true");
  //                 this.Storage.set("token", resp.token);
  //                 localStorage.setItem("userData", JSON.stringify(resp.data));
  //                 this.Storage.set("userData", resp.data);
  //                 this.navCtrl.navigateRoot(["/tabs/home"]);
  //                 setTimeout(() => {
  //                   if(resp.data.is_premium == 0) {
  //                     this.router.navigateByUrl('/premium');
  //                   } 
  //                 }, 1000);
  //               } else {
  //                 this.showToast(resp.message);
  //               }
  //             }
  //           );
  //         })
  //         .catch(err => {
  //           this.fb.logout();
  //           this.showToast(err);
  //         });
  //     })
  //     .catch(e => {
  //       console.log("hello error", e);

  //       this.showToast(e);
  //     });
  // }

  // utilities for app -------------------------------------------------------------------------------------------->

  // alert('are sdas',(res)=>{
  // if (res === 'cancel') {
  // do nothing
  // } else {
  // do something
  // }
  // });
   
   
  async alert(msg) {
    const alert = await this.altCtrl.create({
      header: "Confirm!",
      message: msg,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          cssClass: "secondary",
        },
      ]
    });
  }
  async showAlert(msg, cb) {
    const alert = await this.altCtrl.create({
      header: "Confirm!",
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            cb(false);
          }
        },
        {
          text: "Okay",
          handler: () => {
            cb(true);
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      mode: "md",
      duration: 3000,
      position: "bottom",
      cssClass: "bottomtoast"
    });
    await toast.present();
  }

  async showLoading() {
    console.log("this.loading",this.loading);
    if (!this.loading) {
      this.loading = await this.loadingController.create({message:"Please wait..."});
      this.loading.present();
    }
  }

  //Hide loading
  async hideLoading() {
    try {
     // const t = this.loadingController.getTop();
     // console.log('loading handler',t);
     await this.loading.dismiss();
     this.loading=null;
       console.log('loading handler',this.loading);
    } catch (err) {
      console.log('Loading Provider Error:', err);
    }
  }




  setVaidations(form: any, custmMsg?: any): boolean {
    console.log("checking valiadtions");
    const formErrors = {};
    let formError = false;
    const validationMsg = {
      fullname: "Full name",
      email: "Email address",
      phone: "Mobile number",
      mobile: "Mobile number",
      country_code: "ISD code",
      old_password: "Old Password",
      current_password: "Current password",
      new_password: "New password",
      confirm_new_password: "Confirm new password",
      address_detail: "Business address",
      business_license: "License image",
      tax_document: "Document image",
      business_license_text: "License name",
      tax_document_text: "Document name",
      business_contact: "Business contact",
      // custom
      my_title: " Ad title",
      my_condition: "Condition",
      my_description: "Description",
      my_price: "Price Range",
      my_address: "Location",
      other_title: "Trade with ad title",
      other_category: "Category",
      other_subcategory: "Sub category",
      other_price: "Trade with price"
    };
    for (let i in form.controls) {
      if (form.controls[i].errors) {
        console.log(form.controls[i].errors);
        for (let j in form.controls[i].errors) {
          if (form.controls[i].errors[j]) {
            formError = true;
            let msg = "";
            let str = "";
            if (validationMsg[i]) {
              str = validationMsg[i];
            } else {
              if (i.indexOf("_") !== -1) {
                str = (i.charAt(0).toUpperCase() + i.slice(1))
                  .split("_")
                  .join(" ");
              } else {
                str = i.charAt(0).toUpperCase() + i.slice(1);
                for (let ii = 1; ii < str.length; ii++) {
                  if (str.charAt(ii) >= "A" && str.charAt(ii) <= "Z") {
                    str = str.substring(0, ii) + " " + str.substr(ii);
                    ii = ii + 2;
                  }
                }
              }
            }
            if (j === "required") {
              msg = "is required";
            } else if (j === "maxlength") {
              let term = "characters";
              if (i === "phone" || i === "business_contact") {
                term = "digits";
              }
              let lrn = form.controls[i].errors[j].requiredLength;
              msg = "should be minimum of " + lrn + " " + term;
            } else if (j === "minlength") {
              let term = "characters";
              if (i === "mobile_number" || i === "business_contact") {
                term = "digits";
              }
              let lrn = form.controls[i].errors[j].requiredLength;
              msg = "should be minimum of " + lrn + " " + term;
            } else if (j === "pattern") {
              console.log("custmMsg[str]", custmMsg[str.toLowerCase()]);
              console.log("str hurrr", str);
              let field = str.toLowerCase().replace(/ /g, "_");
              if (custmMsg[field]) {
                console.log("str hurrr", str);
                msg = custmMsg[field];
                str = "";
              } else {
                msg = "is Invalid!";
              }
            }
            if (
              str + " " + msg === "Password is Invalid!" ||
              str + " " + msg === "Confirm password is Invalid!" ||
              str + " " + msg === "Current password is Invalid!" ||
              str + " " + msg === "New password is Invalid!" ||
              str + " " + msg === "Confirm new password is Invalid!"
            ) {
              this.showToast(
                "Please enter minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character in " +
                  str +
                  "!"
              );
            } else {
              this.showToast(str + " " + msg);
            }

            break;
          }
        }
        if (formError) {
          break;
        }
      }
    }
    return !formError;
  }

  // getFcmToken(cb) {
  //   this.Storage.get("fcmtoken").then(token => {
  //     if (!token) {
  //       this.fcm
  //         .getToken()
  //         .then(token => {
  //           this.Storage.set("fcmtoken", token);
  //           localStorage.setItem("fcmtoken", token);
  //           cb(token);
  //         })
  //         .catch(() => {
  //           cb("NOTFOUND");
  //         });
  //     } else {
  //       if (token === "NOTFOUND") {
  //         this.fcm
  //           .getToken()
  //           .then(token => {
  //             this.Storage.set("fcmtoken", token);
  //             localStorage.setItem("fcmtoken", token);
  //             cb(token);
  //           })
  //           .catch(() => {
  //             cb("NOTFOUND");
  //           });
  //       } else {
  //         cb(token);
  //       }
  //     }
  //   });
  // }

  async httpRequest(url, type, form, withoutloder?) {
    if(withoutloder){
      
    } else{
      this.showLoading();
    }
   
    return new Promise((resolve, reject) => {
      this.Storage.get("token").then(data => {
        this.token = data;

        let headers;

        console.log("method type", type);
        if (
          this.token === "" ||
          this.token === undefined ||
          this.token === undefined
        ) {
          headers = {
            headers: {
              Accept: "application/json"
            }
          };
        } else {
          console.log("token found", this.token);

          headers = {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + this.token
            }
          };
        }
        if (type === "POST") {
          form.device_id = "123225212321"; //this.Config.getConf('device_id') ? this.Config.getConf('device_id') : '123225212321';
          form.device_type = "ANDROID"; //this.Config.getConf('device_type') ? this.Config.getConf('device_type') : 'IPHONE';
          url = this.url + url;
          console.log("hello url", url);

          this.http.post(url, form, headers).subscribe(
            (response: any) => {
              if (response) {
                resolve(response);
                if(withoutloder){
      
                } else{
                  this.hideLoading();
                }
              } else {
                reject(response);
                if(withoutloder){
      
                } else{
                  this.hideLoading();
                }
              }
            },
            err => {
              if(withoutloder){
      
              } else{
                this.hideLoading();
              }
              if (err.status == 401) {
                this.Storage.clear();
                localStorage.clear();
                localStorage.setItem("introforyouflip", "true");
                this.navCtrl.navigateRoot(["/login"]);
                this.showToast(err.error.message);
              }
            }
          );
        } else if (type == "POSTUPLOAD") {
          let formData: FormData = new FormData();
          console.log("form", form);

          form.device_id = "123225212321"; //this.Config.getConf('device_id') ? this.Config.getConf('device_id') : '123225212321';
          form.device_type = "ANDROID";

          for (let property in form) {
            if (form[property] instanceof Array) {
              for (let files in form[property]) {
                formData.append(property + "[]", form[property][files]);
              }
            } else formData.append(property, form[property]);
          }
          console.log("formData", formData);
          url = this.url + url;
          this.http.post(url, formData, headers).subscribe(
            response => {
              console.log("response", response);
              resolve(response);
              if(withoutloder){
      
              } else{
                this.hideLoading();
              }
            },
            err => {
              if(withoutloder){
      
              } else{
                this.hideLoading();
              }
              if (err.status == 401) {
                this.Storage.clear();
                localStorage.clear();
                localStorage.setItem("introforyouflip", "true");
                this.navCtrl.navigateRoot(["/login"]);
                this.showToast(err.error.message);
              }
            }
          );
        } else if (type === "GET") {
          url = this.url + url;
          console.log("hello url", url);
          this.http.get(url, headers).subscribe(
            (response: any) => {
              if (response) {
                resolve(response);
                if(withoutloder){
      
                } else{
                  this.hideLoading();
                }
              }
            },
            err => {
              if(withoutloder){
      
              } else{
                this.hideLoading();
              }
              if (err.status == 401) {
                this.Storage.clear();
                localStorage.clear();
                localStorage.setItem("introforyouflip", "true");
                this.navCtrl.navigateRoot(["/login"]);
                this.showToast(err.error.message);
              }
            },
          );
        }
      });
    });
  }

  async permissionConfirm(msg: string, callback) {
    const alert = await this.altCtrl.create({
      // header: this.config.getConf('app_name'),
      message: msg,
      buttons: [
        {
          text: "NOT NOW",
          role: "cancel",
          handler: () => {
            callback(false);
            console.log("Cancel clicked");
          }
        },
        {
          text: "SWITCH TO SETTINGS",
          handler: () => {
            callback(true);
          }
        }
      ]
    });
    await alert.present();
  }


async permissionConfirm1(msg: string, callback) {
  const alert = await this.altCtrl.create({
    // header: this.config.getConf('app_name'),
    message: msg,
    buttons: [
      {
        text: "SWITCH TO SETTINGS",
        handler: () => {
          callback(true);
        }
      }
    ]
  });
  await alert.present();
}
}

