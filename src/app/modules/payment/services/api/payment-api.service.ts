import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { OrderItemDto } from 'src/app/core/dto/OrderItemDto';
import { PaymentDto } from 'src/app/core/dto/PaymentDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { environment } from 'src/environments/environment';
import { PaymentApiInterface } from './payment-api.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService extends PaymentApiInterface {
  constructor(private http: HttpClient, private userService: UserService, private datePipe: DatePipe) {
    super();
  }

  getCurrent() {
    const date = new Date();

    return this.http.get<IResponse<OrderItemDto[]>>(
      environment.APP_URL + '/order',
      {params: {userId: this.userService.getUser().value.id, date: this.datePipe.transform(date, 'YYYY-MM-dd')}}
    ).pipe(share());
  }

  getPayment(){
    return this.http.get<IResponse<PaymentDto>>(environment.APP_URL + '/payment/' + this.userService.getUser().value.id)
      .pipe(share());
  }
}
