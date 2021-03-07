import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from "@ionic-native/camera-preview/ngx";
import { IonRouterOutlet, ModalController, Platform } from "@ionic/angular";
import { GetmusicPage } from "../getmusic/getmusic.page";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
  CaptureVideoOptions,
} from "@ionic-native/media-capture/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { File } from "@ionic-native/file/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HelperService } from "src/provider/helper.service";
import { Media, MediaObject } from '@ionic-native/media/ngx'
// import VideoTrimmingEditor from "VideoTrimmingEditor";
declare var cordova: any;
declare var VideoTrimmingEditor:any;
declare var FFmpeg: any;
@Component({
  selector: "app-video1",
  templateUrl: "./video1.page.html",
  styleUrls: ["./video1.page.scss"],
})
export class Video1Page implements OnInit {
  isVideoPlaying = false;
  videoPath: string;
  count = 1;
   MAX_FILE_SIZE = 5 * 1024 * 1024;
   ALLOWED_MIME_TYPE = "video/mp4";
  @ViewChild("previewVideo") previewVideo: any;
  params: any = {};
  flashMode: string = "off";
  switchCameraOn: boolean = false;
  cameraDirection: string = "front";
  signature: string = "";
  signaturePadOptions: any;
  drawsData: any = [""];
  audioFile: any;
  isDrawing: boolean = false;
  allowDraw: boolean = true;
  showPicker: boolean = false;
  showPenSize: boolean = false;
  penWidth: number = 2;
  mp3: any = '';
  selectedAudio = false;
  customtime = false;
  iscustime = false;
  color: string = "#000000";
  recordingVideo: boolean = false;
  setupVideo: boolean = false;
  recordTimer: number = 60;
  recordTimerInterval: any;
  mediaType: string = "image";
  previewFile: any;
  permissionsToRequest: any = [];
  cameraStarted: boolean = false;
  takePictureOptions: any = {};
  recordAudio: boolean = true;
  videoHasData: boolean = false;

  @ViewChild("myvideo") myVideo: any;
  constructor(
    private viewCtrl: ModalController,
    public camera: Camera,
    private statusBar: StatusBar,
    private domSanitizer: DomSanitizer,
    private file: File,
    public platform: Platform,
    public  media: Media,
    private transfer: FileTransfer,
    private cameraPreview: CameraPreview,
    public mediaCapture: MediaCapture,
    public helper: HelperService,
    public routerOutlet: IonRouterOutlet,
    public router: Router,
    public modalCtrl: ModalController
  ) {
    this.startcamera();
  }

  ngOnInit() {}

  // switchCamera() {
  //   this.cameraPreview.switchCamera();
  // }
  startcamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: "rear",
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1,
    };
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        this.count = 1;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // openGallery() {
  //   let options = {
  //     quality: 40,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     mediaType: this.camera.MediaType.VIDEO,
  //     allowEdit: true,
  //   };
  //   this.setupVideo = true;
  //   this.videoHasData = false;
  //   window.clearInterval(this.recordTimerInterval);
  //   this.camera.getPicture(options).then((res) => {
  //     // this.previewFile = this.convertToFile( "file://" + res);
  //     if (this.platform.is("android")) {
  //       this.previewFile = this.helper.convertToFile("data:image/jpeg;base64," + res);
  //       // this.previewFile = (<any>window).Ionic.WebView.convertFileSrc(
  //       //   "file://" + res
  //       // );
  //       this.videoHasData = true;
  //       this.setEditMode();
  //     } else {
  //       //ios
  //       let path = res.split("/");
  //       const fileName = path[path.length - 1];
  //       this.file.readAsDataURL(this.file.cacheDirectory, fileName).then(
  //         (base64) => {
  //           console.log("read success");
  //           let blob = this.b64toBlob(base64, "video/mp4");
  //           this.saveBlobToFile(blob);
  //         },
  //         (err) => {
  //           console.log("read err: ", err);
  //         }
  //       );
  //     }
  //   });
  // }

  openGallery() {
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options)
      .then( async (videoUrl) => {
        if (videoUrl) {
          this.helper.showLoading();
          // this.uploadedVideo = null;
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
            this.helper.hideLoading();
            return this.helper.alert("Error: Something went wrong.");
          }
          
          retrievedFile.file( data => {
              this.helper.hideLoading();
              if (data.size > this.MAX_FILE_SIZE) return this.helper.alert("You cannot upload more than 5mb.");
              if (data.type !== this.ALLOWED_MIME_TYPE) return this.helper.alert("Incorrect file type.");

              this.previewFile = retrievedFile.nativeURL;
              // this.videoHasData = true;
              // this.setEditMode();
              VideoTrimmingEditor.open({
                input_path: this.previewFile,
                video_max_time: 60,
              },
              function(result) {
                console.log("result",result); 
                // { output_path: "/path/to/zzz.mp4" }
              },
              function(error) {
                console.log("error", error);
                
              })
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }


  convertToFile(dataURI) {
    let blob = this.dataURItoBlob2(dataURI);
    // let file = new File([blob], 'image.jpeg', {type: "'image/jpeg"});
    return blob;
  }

  dataURItoBlob2(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "audio/mp3" });
  }
  closeCamera() {
    this.cameraPreview.stopCamera();
  }
  flash() {
    this.cameraPreview.getFlashMode().then((currentFlashMode) => {
      console.log(currentFlashMode);
      if (currentFlashMode == "off")
        this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.TORCH);
      else this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.OFF);
    });
  }
  ionViewWillLeave() {
    this.closeCamera();
  }

  switchCamera() {
    this.switchCameraOn = !this.switchCameraOn;
    this.cameraPreview.switchCamera();
    this.cameraDirection = this.cameraDirection == "back" ? "front" : "back";

    if (this.cameraDirection == "back") {
      this.cameraPreview.setFlashMode(this.flashMode);
    }
  }
  takeOtherPicture() {
    this.allowDraw = false;
    this.videoHasData = false;
    this.setupVideo = false;
    // this.signaturePad.off();
    this.cameraPreview.show();
    // this.setBackButtonToCloseModal();
    this.startcamera();
  }

  changeFlashMode() {
    debugger;
    const flashMode = this.flashMode == "off" ? "torch" : "off";

    this.cameraPreview.setFlashMode(flashMode).then(
      (res) => {
        this.flashMode = flashMode;
        console.log("flashmode res: ", res);
      },
      (err) => {
        console.log("flashmode err: ", err);
      }
    );
  }

  setBackButtonToCancelRecord() {
    this.platform.backButton.subscribe(() => {
      this.cancelRecord();
    });
  }

  setBackButtonToTakeOtherPicture() {
    this.platform.backButton.subscribe(() => {
      this.takeOtherPicture();
      this.isVideoPlaying = false;
    });
  }


  playAudio(item) {
    this.audioFile = this.media.create(item.path);
    this.audioFile.play();
  } 
  stopAudio() {
    this.audioFile.stop();
  }
  async getMusic() {
    const modal = await this.modalCtrl.create({
      component: GetmusicPage,
      // swipeToClose: true,
      // presentingElement: await this.modalCtrl.getTop(),
      cssClass: "my-custom",
    });
    modal.onDidDismiss().then((data)=> {
      if(data.data) {
        this.mp3 = data.data;
        this.selectedAudio = true;
      } else {
        this.mp3 = '';
        this.selectedAudio = false
      }
      
    })
    return await modal.present();
  }

  colorEffect() {
    debugger;
    if (this.count == 1) {
      this.cameraPreview.setColorEffect(this.cameraPreview.COLOR_EFFECT.AQUA);
      ++this.count;
    } else if (this.count == 2) {
      this.cameraPreview.setColorEffect(
        this.cameraPreview.COLOR_EFFECT.BLACKBOARD
      );
      ++this.count;
    } else if (this.count == 3) {
      this.cameraPreview.setColorEffect(this.cameraPreview.COLOR_EFFECT.MONO);
      ++this.count;
    } else if (this.count == 4) {
      this.cameraPreview.setColorEffect(
        this.cameraPreview.COLOR_EFFECT.NEGATIVE
      );
      ++this.count;
    } else if (this.count == 5) {
      this.cameraPreview.setColorEffect(
        this.cameraPreview.COLOR_EFFECT.POSTERIZE
      );
      ++this.count;
    } else if (this.count == 6) {
      this.cameraPreview.setColorEffect(this.cameraPreview.COLOR_EFFECT.SEPIA);
      ++this.count;
    } else if (this.count == 7) {
      this.cameraPreview.setColorEffect(
        this.cameraPreview.COLOR_EFFECT.SOLARIZE
      );
      ++this.count;
    } else if (this.count == 8) {
      this.cameraPreview.setColorEffect(
        this.cameraPreview.COLOR_EFFECT.WHITEBOARD
      );
      ++this.count;
    } else {
      this.cameraPreview.setColorEffect(this.cameraPreview.COLOR_EFFECT.NONE);
      this.count = 1;
    }
  }

  takeMedia() {
    if(this.mp3 != '') {
      if (!this.recordingVideo) {
        this.startRecord();
      } else {
        this.stopRecord();
      }
    } else {
      this.helper.showToast("Please select a audio.");
    }
    
  }

  startRecordTimer() {
    if (this.recordTimerInterval) {
      window.clearInterval(this.recordTimerInterval);
    }
    this.playAudio(this.mp3);
    this.recordTimerInterval = window.setInterval(() => {
      if (this.recordTimer > 0) {
        this.recordTimer--;
      } else {
        window.clearInterval(this.recordTimerInterval);
        this.stopRecord();
        this.stopAudio();
      }
    }, 1000);
  }

  settimer(timer) {
    this.recordTimer = timer;
  }

  customtimer() {
    this.customtime = true;
  }
  recordTimerrangeChange(ev) {
    this.settimer(ev);
    this.customtime = false;
    this.iscustime = true;
  }

  startRecord() {
    // this.recordTimer = 15;

    this.setBackButtonToCancelRecord();
    this.backgroundVideoStart().then(
      (res: any) => {
        console.log("backgroundVideoStart res: ", res);
        this.recordingVideo = true;
        this.startRecordTimer();
      },
      (err) => {
        console.log("start err: ", err);
      }
    );
  }

  backgroundVideoStart() {
    return new Promise((resolve, reject) => {
      let options: any = {
        cameraDirection: this.cameraDirection,
        width: (window.screen.height),
        height: (window.screen.height),
        quality: 100,
        withFlash: this.flashMode == "on",
      };

      this.cameraPreview.startRecordVideo(options).then(
        (res: any) => {
          console.log("startRecordVideo res: ", res);
          resolve(res);
        },
        (err) => {
          console.log("startRecordVideo: err ", err);
          reject(err);
        }
      );
    });
  }

  backgroundVideoStop() {
    return new Promise((resolve, reject) => {
      this.cameraPreview.stopRecordVideo().then(
        (res: any) => {
          console.log("stopRecordVideo res: ", res);
          this.isVideoPlaying = true;
          resolve(res);
        },
        (err) => {
          console.log("stopRecordVideo: err ", err);
          reject(err);
        }
      );
    });
  }

  
  cancelRecord() {
    window.clearInterval(this.recordTimerInterval);
    this.backgroundVideoStop().then(() => {
      this.recordingVideo = false;
      // this.sharedProvider.isCameraOn = true;
      this.cameraPreview.hide();
      this.cameraPreview.stopCamera().then(() => {
        this.startcamera();
      });
      // this.setBackButtonToCloseModal();
    }, (err) => {
      console.log('backgroundVideoStop err: ', err);
    });
  }

  stopRecord() {
    this.setupVideo = true;
    this.videoHasData = false;
    window.clearInterval(this.recordTimerInterval);
    this.backgroundVideoStop().then((res: any) => {
      this.stopAudio();
      if (this.platform.is('android')) {
        // this.previewFile = (<any>window).Ionic.WebView.convertFileSrc('file://' + res);
        let previewFile = (<any>window).Ionic.WebView.convertFileSrc('file://' + res);
         this.previewFile = this.mergeVideo(previewFile,this.mp3); 
        this.videoHasData = true;
        this.setEditMode();
      } else {//ios
        let path = res.split('/');
        const fileName = path[path.length -1];
        this.file.readAsDataURL(this.file.cacheDirectory, fileName).then((base64) => {

          console.log('read success');
          let blob = this.b64toBlob(base64, 'video/mp4');
          this.saveBlobToFile(blob);
        }, (err) => {
          console.log('read err: ', err);
        })
      }

    }, (err) => {
      this.setupVideo = false;
      console.log('backgroundVideoStop err: ', err);
    });
  }

  b64toBlob(b64Data, contentType) {
    b64Data = b64Data.split(",")[1];
    contentType = contentType || "";
    const sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  saveBlobToFile(blob) {
    const fileName = "tmp.mp4";

    const dirPlatform = this.platform.is("android")
      ? this.file.externalDataDirectory
      : this.file.syncedDataDirectory;

    this.file.writeFile(dirPlatform, fileName, blob, { replace: true }).then(
      (res: any) => {
        let imagePath = res.nativeURL;
        var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        const tmpName =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        this.copyFileToLocalDir(correctPath, currentName, tmpName + ".mp4");
      },
      (err) => {
        console.log("saveBlobToFile errr: ", err);
      }
    );
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    const dirPlatform = this.platform.is("android")
      ? this.file.externalDataDirectory
      : this.file.syncedDataDirectory;
    this.file.copyFile(namePath, currentName, dirPlatform, newFileName).then(
      (success) => {
        this.previewFile = this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.file.externalDataDirectory + newFileName
        );
        this.videoHasData = true;
        this.setEditMode();
        console.log("copyFileToLocalDir success:", success);
        console.log("this.previewFile:", this.previewFile);
      },
      (error) => {
        console.log("err:", error);
      }
    );
  }

  videoDataLoaded() {
    console.log("loadeddata");
    this.setupVideo = false;

    setTimeout(() => {
      this.previewVideo.nativeElement.play();
      this.isVideoPlaying = true;
    }, 100);
  }

  setEditMode() {
    this.recordingVideo = false;
    // this.sharedProvider.isCameraOn = false;
    this.cameraPreview.hide();
    this.cameraPreview.stopCamera();
    this.cameraStarted = false;
    this.videoHasData = true;
    this.setupVideo = false;
    this.setBackButtonToTakeOtherPicture();
  }
  

  async  mergeVideo(video, audio) {
    debugger;
    let { createFFmpeg, fetchFile } = FFmpeg;
    let ffmpeg = createFFmpeg();
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(video));
    ffmpeg.FS('writeFile', 'audio.mp4', await fetchFile(audio));
    await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp4', '-c', 'copy', 'output.mp4');
    let data = await ffmpeg.FS('readFile', 'output.mp4');
    return new Uint8Array(data.buffer);
  };
}
