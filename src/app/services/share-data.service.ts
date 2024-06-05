import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Puppy } from '../models/puppydata.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  //private sharePuppy = new BehaviorSubject<Array<Puppy>>([]);
  private sharePuppy = new BehaviorSubject<Puppy>(new Puppy(0, '', 0));
  currentSharePuppy = this.sharePuppy.asObservable();
  private _editPuppy = new BehaviorSubject<Puppy>(new Puppy(0, '', 0));
  editSharePuppy = this._editPuppy.asObservable();
  
  shareNewPuppy(newPuppy: Puppy) {
    //let arrayPuppy: Array<Puppy> = this.sharePuppy.getValue();
    //arrayPuppy.push(newPuppy);
    this.sharePuppy.next(newPuppy);
  }

  editMascota(mascota: Puppy) {
    this._editPuppy.next(mascota);
    //console.log(mascota);
  }
}
