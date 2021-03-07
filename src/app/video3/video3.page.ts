// import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
@Component({
  selector: 'app-video3',
  templateUrl: './video3.page.html',
  styleUrls: ['./video3.page.scss'],
})
export class Video3Page implements OnInit {
  videoPath: string;
  @ViewChild('myvideo') myVideo: any;
  constructor(public navCtrl: NavController, public mediaCapture: MediaCapture) { }

  ngOnInit() {
  }
  record() {
    const options: CaptureVideoOptions = {
      limit: 1,
      // portraitOverlay: 'assets/img/camera/overlay/portrait.png',
      // landscapeOverlay: 'assets/img/camera/overlay/landscape.png'
    }

    this.mediaCapture
      .captureVideo(options)
      .then(async (res: MediaFile[]) => {
        console.log(res[0].fullPath)

        this.videoPath = res[0].fullPath;


        let video = this.myVideo.nativeElement;
        video.src = this.videoPath;
        video.play();

        //
        // tried to transcode - no luck
        //
        // const filename = res[0].name.split('.MOV').join('');
        // this.videoEditor.transcodeVideo({
        //   fileUri: res[0].fullPath,
        //   outputFileName: filename,
        //   outputFileType: this.videoEditor.OutputFileType.MPEG4,
        //   // saveToLibrary: true
        // })
        //   .then((fileUri: string) => {
        //     console.log('video transcode success', fileUri);
        //     // this.getFileEntry(fileUri).then(result => console.log(JSON.stringify(result))).catch(err => console.log(JSON.stringify(err)))
        //     // let fromDirectory: any = fileUri.split('/');
        //     // fromDirectory.pop();
        //     // fromDirectory = fromDirectory.join('/');
        //     // let toDirectory = this.file.dataDirectory;
        //     // console.log(fromDirectory, toDirectory, filename + '.mp4')
        //     // this.file.copyFile(fromDirectory, filename + '.mp4', this.file.dataDirectory, filename + '.mp4').then((res) => {
        //     //   console.log(JSON.stringify(res))
        //     // }).catch(err => console.log('=/', JSON.stringify(err)));
        //   })
        //   .catch((error: any) => console.log('video transcode error', error));



      })
      .catch(err => console.log('Something went wrong', JSON.stringify(err)));
  }

}
