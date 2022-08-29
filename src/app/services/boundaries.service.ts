import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoundariesService {

  private readonly _apiUrl = 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode';

  constructor(private http: HttpClient) { }

  public getBoundariesOfZipcode(zipcode: string): Observable<any> {
    return this.http.get(this._apiUrl, {
      params: { zipcode }, headers: {
        'X-RapidAPI-Key': 'ab4d529734msh37d1b18ec46a3b0p1d7faejsnc2ab9bc9c03f',
        'X-RapidAPI-Host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com'
      }
    });
  }
}
