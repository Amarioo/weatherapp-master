import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  currentWeather: any = {} as any;
  msg: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    });
  }
  ngOnInit(): void {
  }
  searchWeather(loc: string): void {
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.currentWeather = res;
      }, err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          alert('Misslyckades att hämta väder.');

          this.msg = err.error.message;
          return;
        }
      }, () => {
      });
  }
  locationFound(): boolean {
    return Object.keys(this.currentWeather).length > 0;
  }
}
