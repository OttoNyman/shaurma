import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AssortmentItemDto } from 'src/app/core/dto/AssortmentItemDto';
import { EditAssortmentDto } from 'src/app/core/dto/EditAssortmentDto';
import { SimpleDto } from 'src/app/core/dto/SimpleDto';
import { SimplePriceDto } from 'src/app/core/dto/SimplePriceDto';
import { IPaginator } from 'src/app/core/interfaces/IPaginator';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { ISimpleItem } from 'src/app/core/interfaces/ISimpleItem';
import { ISimplePriceItem } from 'src/app/core/interfaces/ISimplePriceItem';
import { environment } from 'src/environments/environment';
import { SettingsApiInterface } from './settings-api.interface';

@Injectable()
export class SettingsApiService extends SettingsApiInterface {
  constructor(private http: HttpClient) { 
    super();
  }

  //dishes
  getDishes(page: number, pageSize: number){
    return this.http.get<IResponse<IPaginator<ISimplePriceItem>>>(environment.APP_URL + '/dish', {params: {page, pageSize}})
      .pipe(share());
  }

  createDish(dto: SimplePriceDto){
    return this.http.post<IResponse<ISimplePriceItem>>(environment.APP_URL + '/dish', dto).pipe(share());
  }

  editDish(dishID: number, dto: SimplePriceDto){
    return this.http.put<IResponse<ISimplePriceItem>>(environment.APP_URL + `/dish/${dishID}`, dto).pipe(share());
  }

  deleteDish(dishID: number){
    return this.http.delete<IResponse<ISimplePriceItem>>(environment.APP_URL + `/dish/${dishID}`).pipe(share());
  }

  //additions
  getAdditions(page: number, pageSize: number){
    return this.http.get<IResponse<IPaginator<ISimplePriceItem>>>(environment.APP_URL + '/addition', {params: {page, pageSize}})
      .pipe(share());
  }

  createAddition(dto: SimplePriceDto){
    return this.http.post<IResponse<ISimplePriceItem>>(environment.APP_URL + '/addition', dto).pipe(share());
  }

  editAddition(additionID: number, dto: SimplePriceDto){
    return this.http.put<IResponse<ISimplePriceItem>>(environment.APP_URL + `/addition/${additionID}`, dto)
      .pipe(share());
  }

  deleteAddition(additionID: number){
    return this.http.delete<IResponse<ISimplePriceItem>>(environment.APP_URL + `/addition/${additionID}`)
      .pipe(share());
  }

  //drinks
  getDrinks(page: number, pageSize: number){
    return this.http.get<IResponse<IPaginator<ISimplePriceItem>>>(environment.APP_URL + '/drink', {params: {page, pageSize}})
      .pipe(share());
  }

  createDrink(dto: SimplePriceDto){
    return this.http.post<IResponse<ISimplePriceItem>>(environment.APP_URL + '/drink', dto).pipe(share());
  }

  editDrink(drinkID: number, dto: SimplePriceDto){
    return this.http.put<IResponse<ISimplePriceItem>>(environment.APP_URL + `/drink/${drinkID}`, dto)
      .pipe(share());
  }

  deleteDrink(drinkID: number){
    return this.http.delete<IResponse<ISimplePriceItem>>(environment.APP_URL + `/drink/${drinkID}`)
      .pipe(share());
  }

  //remarks
  getRemarks(page: number, pageSize: number){
    return this.http.get<IResponse<IPaginator<ISimpleItem>>>(environment.APP_URL + '/remark', {params: {page, pageSize}})
      .pipe(share());
  }

  createRemark(dto: SimpleDto){
    return this.http.post<IResponse<ISimpleItem>>(environment.APP_URL + '/remark', dto).pipe(
      share(), 
      catchError(err => of({status: ResponseStatus.ERROR, errors: [{code: 1, message: err.message}], data: null}))
    );
  }

  editRemark(remarkID: number, dto: SimpleDto){
    return this.http.put<IResponse<ISimpleItem>>(environment.APP_URL + `/remark/${remarkID}`, dto).pipe(share());
  }

  deleteRemark(remarkID: number){
    return this.http.delete<IResponse<ISimpleItem>>(environment.APP_URL + `/remark/${remarkID}`).pipe(share());
  }

  //assortment
  getAllAdditions(){
    return this.http.get<IResponse<ISimplePriceItem[]>>(environment.APP_URL + '/addition/all').pipe(share());
  }

  getAssortments(page: number, pageSize: number){
    return this.http
      .get<IResponse<IPaginator<AssortmentItemDto>>>(environment.APP_URL + '/assortment', {
        params: {page, pageSize}
      }).pipe(share());
  }

  editAssortment(id: number, dto: EditAssortmentDto){
    return this.http.put<IResponse<AssortmentItemDto>>(environment.APP_URL + `/assortment/${id}`, dto)
      .pipe(share());
  }
}
