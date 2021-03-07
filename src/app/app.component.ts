import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HelperService } from 'src/provider/helper.service';
declare var cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private helper: HelperService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false)
      this.statusBar.backgroundColorByHexString('#44A08D')
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      // this.helper.alert('This device does not support this application.').then(()=> {
      //   // navigator['app'].exitApp();
      // })
      // this.helper.showAlert('This device does not support this application.',()=>{
      //   navigator["app"].exitApp();
      // })
      
      cordova.plugins.diagnostic.requestRuntimePermissions(function(statuses){
        for (var permission in statuses){
            switch(statuses[permission]){
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                    console.log("Permission denied to use "+permission+" - ask again?");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                    break;
            }
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    },[
        cordova.plugins.diagnostic.permission.CAMERA,
        cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
        cordova.plugins.diagnostic.permission.RECORD_AUDIO
    ]);
    });
  }
}
