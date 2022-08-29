import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, combineLatest, Observable, of, Subject, takeUntil } from 'rxjs';
import { BoundariesService } from 'src/app/services/boundaries.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-zipcode-finder',
  templateUrl: './zipcode-finder.component.html',
  styleUrls: ['./zipcode-finder.component.scss']
})
export class ZipcodeFinderComponent implements OnInit, OnDestroy {

  public zipcodePolygonArea: any;

  public weatherInTheArea: any;

  public zipcodeInput: string | undefined;

  public isLoading: boolean = false;

  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly _boundariesService: BoundariesService,
    private readonly _weatherService: WeatherService,
    private readonly _notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSearch(): void {
    if (this.zipcodeInput && this.validateZipCode(this.zipcodeInput)) {
      this.isLoading = true;
      const zipcoeBounds$ = this._boundariesService.getBoundariesOfZipcode(this.zipcodeInput);
      const zipcoeWeather$ = this._weatherService.getTheWeatherOfZipcodeArea(this.zipcodeInput);

      // Combine the two observabls results
      combineLatest([zipcoeBounds$, zipcoeWeather$]).pipe(takeUntil(this.destroy$))
        .subscribe(([geoJson, weather]) => {
          this.isLoading = false;

          if (geoJson && weather) {
            this.zipcodePolygonArea = geoJson;
            this.weatherInTheArea = this.generateHtmlTemplate(weather);
          }
        })
    } else {
      this._notificationService.create('error', 'Invalid Zipcode', 'Try again...');
    }
  }

  private validateZipCode(zipcode: string): boolean {
    return new RegExp('^[0-9]{5}(?:-[0-9]{4})?$').test(zipcode);
  }

  private generateHtmlTemplate(weather: any) {
    const title = `- The Weather in ${this.zipcodeInput} -`;
    const subTitle = `Local time: ${weather.location.localtime}`;
    const content = `The temperature is ${weather.current.temp_c}°C`;
    return `<h2>${title}</h2> 
      <h4>${subTitle}</h4>
      <h4>${content}</h4>
    `
  }

}
