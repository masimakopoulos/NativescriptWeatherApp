import { Observable } from 'rxjs/Rx';
import { Component } from "@angular/core";
import { WeatherService } from './shared/weather.service';
import geolocation = require("nativescript-geolocation");

@Component({
    providers: [WeatherService],
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    constructor(private _weather: WeatherService) {

    }

    public onTap() {
        if (!geolocation.isEnabled()) {
            console.log('geolocation is disabled');
            geolocation.enableLocationRequest();
            return;
        }
        Observable.fromPromise(geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, timeout: 20000 }))
            .concatMap(loc => this._weather.getCurrentTemperature(loc.latitude, loc.longitude))
            .subscribe(d => alert(d));
    }
}
