import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BoundariesService {

  private readonly _apiUrl = 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode';

  constructor(private http: HttpClient, private _notifiactionService: NotificationService) { }

  public getBoundariesOfZipcode(zipcode: string): Observable<any> {
    return this.http.get(this._apiUrl, {
      params: { zipcode }, headers: {
        'X-RapidAPI-Key': 'bc97661cbbmshfb25c7af7bf2d3dp1a71e8jsna3b6d8393d94',
        'X-RapidAPI-Host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com'
      }
    }).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    this._notifiactionService.create('error', 'API Error', err.error.message);
    return of(null);
  }
}
