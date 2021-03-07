import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ModalController, Platform } from '@ionic/angular';
// import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HelperService } from 'src/provider/helper.service';

declare var cordova: any
@Component({
  selector: 'app-getmusic',
  templateUrl: './getmusic.page.html',
  styleUrls: ['./getmusic.page.scss'],
})
export class GetmusicPage implements OnInit {
  musicfiles = [];
  isPlay = false;
  _fileList = [];
  promises = [];
  playing= false;
  count = 1
  nodata: any = 'Fetching audio files...'
  audioFile: MediaObject;
  fileList = [];
  constructor(public filePath: FilePath,
    public platform: Platform,
    public media: Media,
    public modalCtrl: ModalController,
    public cd: ChangeDetectorRef,
    public helper: HelperService,
    public musicControls: MusicControls,
    public androidPermissions: AndroidPermissions,
    public file: File,) { }
  ngOnInit() {

  }
  ionViewWillEnter() {
    var permissions = cordova.plugins.permissions;
    // this.gridFlag = this.gridListFlag;
    this._fileList = [];
    let that = this;
    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE,
      function (status) {

        if (!status.hasPermission)
          error();
        else
          permissions.requestPermission(permissions.CAMERA, success.bind(this),
            error);

        function error() {
          console.log('CAMERA permission is not turned on');
        }
      }
      , error);

    function error() {
      console.log('READ_EXTERNAL_STORAGE permission is not turned on');
    }

    function success(status) {
      if (!status.hasPermission) {
        error();
      }
      else {
        if (that.platform.is('ios')) {
          that.getMp3(that.file.documentsDirectory);
          // that.listDir(that.file.documentsDirectory, '');
        } else {
          that.getMp3(that.file.externalRootDirectory + "/Download/");
          // that.getMp3("cdvfile://localhost/temporary/");
        }
      }
    }
  }

  ionViewWillLeave() {
    if(this.playing) 
      this.stop()
    
  }

  getMp3(path) {
    this.platform.ready().then(() => {
      this.helper.showLoading();
      this.file.listDir(path, '').then((result) => {
        for (let item of result) {
          this.helper.hideLoading();
          this.nodata = "No audio found."
          if (item.isDirectory == true && item.name != '.' && item.name != '..') {
            this.getFileList(item.name);
          }
          else if (item.isFile == true) {
            this.saveFileToArray(item);
          }
        }
      },
        (error) => {
          console.log(error);
        });
    })
  }

  saveFileToArray(item) {
    let extn = item.fullPath.split(".").pop();
    if (extn == 'mp3' || extn == 'm4a') {
      console.log("mp3 found");
      // this.count++
      this._fileList.push({
        name: item.name,
        path: item.fullPath
      })
      if(this.count<=50) {
      this.fileList.push({
        name: item.name,
        path: item.fullPath
      })
      this.cd.detectChanges();
      }
      else {
        return;
      }
      this.count++

    }
  }

  public getFileList(path: string): any {
    let file = new File();
    this.file.listDir(file.externalRootDirectory, path)
      .then((result) => {
        for (let item of result) {
          if (item.isDirectory == true && item.name != '.' && item.name != '..') {
            // this.getFileList(path + '/' + item.name);
          }
          else {
            this.saveFileToArray(item);
          }   
        }
      }, (error) => {
        console.log(error);
      })
  }
  play(item,k) {
    if(this.playing) {
      this.stop();
      setTimeout(() => {
        this.audioFile = this.media.create(item.path);
        this.audioFile.play();
        this.playing = true
      }, 200);
    } else {
      this.audioFile = this.media.create(item.path);
      this.audioFile.play();
      this.playing = true
    }
    for (let j = 0; j < this.fileList.length; j++) {
      if(k == j) {
       this.fileList[j].isPlay = true;
      } else {
       this.fileList[j].isPlay = false;
      }
     }
  } 
  stop() {
    this.audioFile.stop();
    this.playing = false;
    for (let j = 0; j < this.fileList.length; j++) {
      this.fileList[j].isPlay = false;
     }
  }

  audioplay(item,i,k) {
   if(i == 0){
    this.play(item,k)
    this.cd.detectChanges();
  } else if(i == 1) {
    this.stop();
    this.cd.detectChanges();
  }

  }
  close() {
    this.modalCtrl.dismiss();
  }

  selectMusic(mp3) {
    this.helper.showToast("Your audio has been selected to merge with video.");
    this.modalCtrl.dismiss(mp3);
  }



  folders: any;


  async listDir(path, dirName) {
    this.folders = await this.listDirHelper(path, dirName);
    console.log('Folders who have pdf files', this.folders);
  }


  async listDirHelper(path, dirName) {
    var current_folder = {
      path: path,
      dirName: dirName,
      children: []
    };

    return await this.file
      .listDir(path, dirName)
      .then(async entries => {
        var does_current_have_pdf = false;

        for (var i = 0; i < entries.length; ++i) {
          if (entries[i]['isDirectory'] === false) {
            var pdf_index = entries[i]['fullPath'].lastIndexOf('.mp3');
            if (pdf_index != -1 && pdf_index + 4 === entries[i]['fullPath'].length) {
              does_current_have_pdf = true;
            }
          } else {
            var children_data = await this.listDirHelper(entries[i]['nativeURL'], entries[i]['name']);
            if (children_data !== false) {
              current_folder['children'].push(children_data);
            }
          }
        }

        if (current_folder['children'].length === 0 && does_current_have_pdf === false) {
          return false;
        }

        return current_folder;
      })
      .catch((err) => {
        console.log('error in listing directory', err);
      });
  }

  doInfinite(event) {
    if (event != ''){
      event.target.complete();
    } else {
      this.helper.hideLoading();
    }
    for (let i = this.fileList.length; i <= this.fileList.length+15; i++) {
      this.fileList.push(this._fileList[i]);
    }
  }
}