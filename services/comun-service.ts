import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
import { Camera } from 'ionic-native';

import 'rxjs/add/operator/map';

/*
  Generated class for the ComunService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComunService {

    constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

	/**
   * show a native menssage in Ionic 
   * @param {string} title
   * @param {string} msg
   * @memberOf UnregisteredPage
   */
    showAlert(title: string, msg: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: ["Aceptar"]
        })
        alert.present()
    }


	/**
	 * Show a native loading popup in ionic 
	 * @param {string} msg
	 * @returns {Loading} isntancia de la ventana de cargando
	 * @memberOf ComunService
	 */
    showLoad(msg: string): Loading {
        let loader = this.loadingCtrl.create({
            content: msg,
        });
        return loader
    }

    /**
     * Take a picture and return base 64 image
     * @returns {Promise<any>}
     * @memberOf UserBack
     */
    takePhoto(): Promise<any> {
        return new Promise((resul, err) => {
            let cameraOptions = {
                sourceType: Camera.PictureSourceType.CAMERA,
                destinationType: Camera.DestinationType.DATA_URL,
                quality: 100,
                targetWidth: 1000,
                targetHeight: 1000,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true
            }
            Camera.getPicture(cameraOptions).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                resul(base64Image)
            }, (error) => {
                err(error)
            });
        })
    }

    /**
     * Muestra una ventana de confirmación
     * @param {string} title Titulo de la ventana
     * @param {string} msg Mensaje de la ventana
     * @param {string} name1 Nombre del primer boton de 
     * @param {()=> any} acc1 Accion del primer boton
     * @param {string} name2 Nombre del segundo boton
     * @param {()=> any} acc2 Accion del segundo boton
     * @memberOf ComunService
     */
    showConfirm(title: string, msg: string, name1: string, acc1: () => any, name2: string, acc2: () => any) {
        let confirm = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: name1,
                    handler: acc1
                },
                {
                    text: name2,
                    handler: acc2
                }
            ]
        });
        confirm.present();
    }
}
