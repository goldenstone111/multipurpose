import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HttpClientModule } from '@angular/common/http';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    FilePath,
    MusicControls,
    AndroidPermissions,
    Camera,
    ImagePicker,
    Diagnostic,
    CameraPreview,
    ImagePicker,
    FileTransfer,
    MediaCapture,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
