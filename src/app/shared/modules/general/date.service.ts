import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private date: BehaviorSubject<string> = new BehaviorSubject(null);

  setDate(newDate: string){
    this.date.next(newDate);
  }

  getDate(): Observable<string>{
    return this.date;
  }
}
