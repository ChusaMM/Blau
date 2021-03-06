import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public pokemons;
  public hayPokemons;
  constructor(private iab: InAppBrowser, private emailComposer:EmailComposer, private camera:Camera,private callNumber: CallNumber,private geolocation: Geolocation,private socialSharing: SocialSharing,private http: HTTP) {
    
  }

  navegar(){
    const browser = this.iab.create('https://ionicframework.com/','_self');
  }
  abrir_mail(){
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }
    
    // Send a text message using default options
   this.emailComposer.open(email);
    
  }

  foto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
   
  }

callnumber(){
  this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}
geolocalizacion(){
  this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
   });
}
  compartir(){

// Share via email
    this.socialSharing.share(null,null,null,'Hola Prueba').then(() => {
  // Success!
  console.log('Prueba')
      }).catch(() => {
        console.log('Error!')
    });
  }
  apiweb(){
        this.http.get('https://pokeapi.co/api/v2/pokemon/ditto', {}, {})
      .then(data => {
        this.pokemons=JSON.parse(data.data);
        this.hayPokemons = true;
        console.log(this.pokemons);
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }
  poke(){
    this.pokemons.habilitis();
  }
}

