import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private readonly _apiUrl = 'https://api.weatherapi.com/v1/current.json?key=7e18e893ebc445469c6180610222808';

  constructor(private http: HttpClient) { }

  public getTheWeatherOfZipcodeArea(zipcode: string): Observable<any> {
    return this.http.get(this._apiUrl, { params: { q: zipcode, api: 'yes'} });
  }
}
