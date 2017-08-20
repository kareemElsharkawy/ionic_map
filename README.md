## First you have to creat your ionic app through CLI

creating new ionic App with cli:
--------------------------------------
1- npm install -g ionic cordova  
2- ionic start [app name] --ts  
3- cd [app name]  
4- ionic serve    // to test your application


### then what you need is to creat another page to deal with it call it map

generating a new page in ionic App with cli:
----------------------------------------------
`ionic g page map `

###### after creating the page you need to route to it through the main page before coding the map

so you have to:

1-import this page into the `app.modules.ts` then change @NgModule 

```Bash
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecondPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SecondPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

```
2-import this page into the `home.ts` to push it into the NvCtrl
```Bash
  GoToSecondPage(){
    this.navCtrl.push(SecondPage);
  }
```
add the previouse function to your `HomePage` class then call it when pressing a button that navigate to the second page

### Now the Map page

1-first you need to add this line of code 
`<script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>`
above `<script src="cordova.js"></script>` in the index.html file 

###### 1.1-To creat an API_KEY follow these steps:

1-Go to the Google API Console [https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,places_backend&reusekey=true].  
2-Create or select a project.  
3-Click Continue to enable the API and any related services.  
4-On the Credentials page, get an API key.   
(Note: If you have an existing unrestricted API key, or a key with browser restrictions, you may use that key.)  
5-From the dialog displaying the API key, select Restrict key to set a browser restriction on the API key.  
6-In the Key restriction section, select HTTP referrers (web sites), then follow the on-screen instructions to set referrers.  
7-(Optional) Enable billing. See Usage Limits for more information.  

2-then take the code that is in home.html and put it into your map.html page.
   *this is the code : *
```Bash
<ion-header>
    <ion-navbar>
        <ion-title>
            Map
        </ion-title>
    </ion-navbar>
</ion-header>

<ion-content>
    <div #map id="map"></div>    //a Div to load the map into 
</ion-content>
```
3-you must take the style in home.css and add it to your map.css page to be able to see the map.
*this is the code :*
```Bash
.ios,
.md {
    home-page {
        .scroll {
            height: 100%
        }
        #map {
            width: 100%;
            height: 100%;
        }
    }
}
```
5-now the main part of the code *take this code* and but it into the MapPage Class

```Bash
 homeContry='egypt';
  //homeContry='lybia';
  latitude:number;
  longitude:number;
  cityArray=[{city:'cairo',jobs:20},{city:'alexandria',jobs:5},{city:'asyot',jobs:6},{city:'aswan',jobs:3}];
  //cityArray=[{city:'trabls',jobs:20},{city:'mosrata',jobs:5},{city:'bnyghazi',jobs:6}];
  map;
  
  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad(){
    //////////////////////////////////////////////////////////////
    this.getLatLan(this.homeContry,function (lat,lng){ 
    let latLng = new google.maps.LatLng(lat,lng);
    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
      let mapElement = document.getElementById("map");
      this.map = new google.maps.Map(mapElement, mapOptions);
    }.bind(this));
    //////////////////////////////////////////////////////////////
    for(let City of this.cityArray){  
      this.getLatLan(City.city,function(lat,lng){  
         let latlng = new google.maps.LatLng(lat,lng);
         let marker = new google.maps.Marker({
                      map: this.map,
                      animation: google.maps.Animation.DROP,
                      position: latlng,
                      label:""+City.jobs
                    });          
    }.bind(this));
    }
  }


  getLatLan(address: string,callback) {
        console.log('Getting Address - ', address);
        let lat;
        let lng;
        const geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                      lng = results[0].geometry.location.lng();  // longitude
                      lat = results[0].geometry.location.lat(); // latitude
                      callback(lat,lng);
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                }
            });    
    }
```
