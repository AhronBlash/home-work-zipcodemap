import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly _apiUrl = 'https://api.weatherapi.com/v1/current.json?key=7e18e893ebc445469c6180610222808';

  constructor(private http: HttpClient, private readonly _notificationService: NotificationService) { }

  public getTheWeatherOfZipcodeArea(zipcode: string): Observable<any> {
    return this.http.get(this._apiUrl, { params: { q: zipcode, api: 'yes' } })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let message: string;

    switch (err.error.error.code) {
      case 1006:
      case 2007:
        message = err.error.error.message;
        break;

      default:
        message = 'Internal application error.';
        break;
    }

    this._notificationService.create('error', message);
    return of(null);
  }
}
