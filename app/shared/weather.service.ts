import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class WeatherService {
  constructor(private _http: Http) {}

  getCurrentTemperature(latitude: number, longitude: number) {
    console.log(latitude, longitude);
    return this._http.get(`https://api.darksky.net/forecast/***REMOVED***/${latitude},${longitude}/?units=si`)
      .map(res => res.json())
      .map(d => d.currently.temperature)
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}