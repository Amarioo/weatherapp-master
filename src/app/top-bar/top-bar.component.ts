import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SET_LOCATION} from '../../location-reducer';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  location: string;

  topbarForm = new FormGroup(
    {
      topBarSearch: new FormControl('', [
        Validators.required,
      ])
    });

  get topBarSearch(): AbstractControl {
    return this.topbarForm.get('topBarSearch');
  }

  isInputInvalidTouchedOrDirty(searchControl: AbstractControl): boolean {
    return (searchControl.invalid && (searchControl.touched || searchControl.dirty));
  }

  constructor(private store: Store<any>) {
  }

  search(): void {
    if (this.topbarForm.invalid) {
      return;
    }
    this.store.dispatch({type: SET_LOCATION, payload: this.location});
  }
}
