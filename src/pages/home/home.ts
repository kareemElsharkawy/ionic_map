import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 
declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {  
  homeContry='egypt';
  latitude:number;
  longitude:number;
  cityArray:string[]=['cairo','alexandria','asyot','aswan','sohag','Hurgada'];
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
    let i=1;
    for(let city of this.cityArray){  
      this.getLatLan(city,function(lat,lng){  
         let latlng = new google.maps.LatLng(lat,lng);
         let marker = new google.maps.Marker({
                      map: this.map,
                      animation: google.maps.Animation.DROP,
                      position: latlng,
                      label: ""+i
                    });
         i++;            
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

}
