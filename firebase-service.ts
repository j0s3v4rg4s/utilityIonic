import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Facebook } from 'ionic-native';


/*
  Generated class for the UserBack provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {

	// -----------------------------------------------------------------
	// Atributos
	// -----------------------------------------------------------------

	/** Instance of User Firebase  */
	user: firebase.User


	// -----------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------
	constructor() {}

	// -----------------------------------------------------------------
	// Metodos
	// -----------------------------------------------------------------


	/**
	 * Register a user with email and password
	 * @param {string} email
	 * @param {string} pass
	 * @returns {Promise<any>}
	 * @memberOf UserBack
	 */
	registerEmail(email: string, pass: string): Promise<any> {
		return new Promise((result, err) => {
			firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
				result()
			}).catch(error => {
				err(error)
			})
		})
	}

	/**
	 * login a user with email and password
	 * @param {string} email email of user
	 * @param {string} pass password of user
	 * @returns {Promise<any>} Promise that finish login
	 * @memberOf UserBack
	 */
	sigInEmail(email: string, pass: string): Promise<any> {
		return new Promise((result, err) => {
			firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
				result()
			}).catch(error => {
				err(error)
			})
		})
	}

	/**
	 * method for login with Facebook
	 * @returns {Promise<any>} Promise that finish login
	 * @memberOf LoginPage
	 */
	signInFacebook(): Promise<any> {
		return new Promise((result, err) => {
			Facebook.login(['email']).then((_response) => {
				let creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken)
				firebase.auth().signInWithCredential(creds)
			}).then((authData) => {
				result()
			}).catch((error) => {
				err(error)
			});
		})
	}


	/**
	 * return a menssage in spanish of error auth
	 * @param {firebase.FirebaseError} error
	 * @returns {string}
	 * @memberOf UserBack
	 */
	getErrorLogin(error: firebase.FirebaseError): string {
		let mensaje: string
		if (error.code === 'auth/user-not-found')
			mensaje = 'Correo o contraseña invalida'
		else if (error.code === 'auth/argument-error')
			mensaje = 'Ingrese su correo y contraseña'
		else if (error.code === 'auth/weak-password')
			mensaje = 'La contraseña debe tener minimo 6 caracteres'
		else if (error.code === 'auth/email-already-in-use')
			mensaje = 'El correo ya esta en uso'
		else {
			mensaje = error.message
		}
		return mensaje
	}


	/**
	 * Update inforamtion user auth
	 * @param {string} name new name of user
	 * @param {string} photo photo of user
	 * @returns {Promise<any>} promise to finish update
	 * @memberOf UserBack
	 */
	updateInfoUser(name: string, photo: string): Promise<any> {
		return new Promise((res, err) => {
			this.user.updateProfile({
				displayName: name,
				photoURL: photo
			}).then(
				() => res(),
				error => err(err)
			)
		})
	}

}