# Utility library Ionic

This is a common library used for proyects in Ionic 2 with Firebase

## Prerequisites
Ionic version:
```
Ionic Framework Version: 2.0.0
Ionic CLI Version: 2.2.1
```
Install ionic
````
$ npm install -g cordova ionic
````

 
If the project use Firebase:
```
$ npm install firebase --save
```

##  How to use
*   In your Ionic proyect, inside of src folder, create a folder with the name providers
*   Copy inside providers folder the comun-service.ts and firebase-service.ts files
*   open `./src/app/app.module.ts` and import the services
    ```typescript
    ...
    import { ComunService } from '../providers/comun-service';
    import { FirebaseService } from '../providers/firebase-service';
    ...
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ComunService,FirebaseService]
    ```
*   In the page that you need use the library import the respective services
    ```typescript
    ...
    import { ComunService } from '../../providers/comun-service'
    import { FirebaseService } from '../../providers/firebase-service'
    ...
    constructor(public comon: ComunService, public fireCommon:FirebaseService){}
    ...
    ```

## Documentation
[Ionic](http://ionicframework.com/) page
[Firebase](https://firebase.google.com/docs/server/setup) page