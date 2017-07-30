var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
//declare var Promise: any;
let HomePage = class HomePage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.homeContry = 'cairo';
        this.locs = [];
    }
    ionViewDidLoad() {
        this.getLatLan(this.homeContry);
        this.loadMap();
    }
    computeAnswerToLifeTheUniverseAndEverything() {
        return new Promise((resolve, reject) => {
            resolve(42);
        });
    }
    getLatLan(address) {
        console.log('Getting Address - ', address);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                this.longitude = results[0].geometry.location.lng(); // latitude
                this.latitude = results[0].geometry.location.lat(); // longitude
                console.log(this.longitude, this.latitude);
            }
            else {
                console.log('Error - ', results, ' & Status - ', status);
            }
            console.log(this.longitude, this.latitude);
        });
    }
    loadMap() {
        console.log(this.latitude, this.longitude);
        console.log('done');
        let latLng = new google.maps.LatLng(9.1021, 18.2812);
        let mapOptions = {
            center: latLng,
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
    addMarker() {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
    }
};
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], HomePage.prototype, "mapElement", void 0);
HomePage = __decorate([
    Component({
        selector: 'home-page',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController])
], HomePage);
export { HomePage };
export class Locations {
    constructor(Lat, lng) {
        this.Lat = Lat;
        this.lng = lng;
    }
}
//# sourceMappingURL=home.js.map