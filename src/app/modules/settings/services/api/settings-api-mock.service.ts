import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AssortmentItemDto } from 'src/app/core/dto/AssortmentItemDto';
import { EditAssortmentDto } from 'src/app/core/dto/EditAssortmentDto';
import { SimpleDto } from 'src/app/core/dto/SimpleDto';
import { SimplePriceDto } from 'src/app/core/dto/SimplePriceDto';
import { SettingsApiInterface } from './settings-api.interface';

@Injectable()
export class SettingsApiMockService extends SettingsApiInterface {
    //dishes
    getDishes(page: number, pageSize: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {
                page,
                pageSize,
                totalElements: 30,
                totalPages: Math.ceil(30 / pageSize),
                responseList: [
                    {id: 1, name: 'Shawerma', price: 50},
                    {id: 2, name: 'Shawerma Chicken', price: 30},
                    {id: 3, name: 'Roll', price: 60},
                    {id: 4, name: 'Roll2', price: 75},
                    {id: 5, name: 'Roll3', price: 60}
                ]
            }
        }).pipe(delay(3000));
    }

    createDish(dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: 6, name: dto.name, price: dto.price}
        }).pipe(delay(2000));
    }

    editDish(dishID: number, dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: dishID, ...dto}
        }).pipe(delay(2000));
    }

    deleteDish(dishID: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: dishID, name: '', price: 0}
        }).pipe(delay(2000));
    }

    //additions
    getAdditions(page: number, pageSize: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {
                page,
                pageSize,
                totalElements: 30,
                totalPages: Math.ceil(30 / pageSize),
                responseList: [
                    {id: 1, name: 'Cheese', price: 5},
                    {id: 2, name: 'Tomato', price: 3},
                    {id: 3, name: 'Mashrooms', price: 10}
                ]
            }
        }).pipe(delay(3000));
    }

    createAddition(dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: 4, name: dto.name, price: dto.price}
        }).pipe(delay(2000));
    }

    editAddition(additionID: number, dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: additionID, ...dto}
        }).pipe(delay(2000));
    }

    deleteAddition(dishID: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: dishID, name: '', price: 0}
        }).pipe(delay(2000));
    }

    //drinks
    getDrinks(page: number, pageSize: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {
                page,
                pageSize,
                totalElements: 30,
                totalPages: Math.ceil(30 / pageSize),
                responseList: [
                    {id: 1, name: 'Cheese', price: 5},
                    {id: 2, name: 'Tomato', price: 3},
                    {id: 3, name: 'Mashrooms', price: 10}
                ]
            }
        }).pipe(delay(3000));
    }

    createDrink(dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: 4, name: dto.name, price: dto.price}
        }).pipe(delay(2000));
    }

    editDrink(drinkID: number, dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: drinkID, ...dto}
        }).pipe(delay(2000));
    }

    deleteDrink(drinkID: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: drinkID, name: '', price: 0}
        }).pipe(delay(2000));
    }

    //remarks
    getRemarks(page: number, pageSize: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {
                page,
                pageSize,
                totalElements: 30,
                totalPages: Math.ceil(30 / pageSize),
                responseList: [
                    {id: 1, name: 'No souce'},
                    {id: 2, name: 'More souce'}
                ]
            }
        }).pipe(delay(3000));
    }

    createRemark(dto: SimpleDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: 3, name: dto.name}
        }).pipe(delay(2000));
    }

    editRemark(remarkID: number, dto: SimplePriceDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: remarkID, ...dto}
        }).pipe(delay(2000));
    }

    deleteRemark(remarkID: number){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {id: remarkID, name: ''}
        }).pipe(delay(2000));
    }

    //assortments
    getAllAdditions(){
        return of({
          status: ResponseStatus.OK,
          data: [
            {name: 'Cheese', price: 10, id: 1},
            {name: 'Mashrooms', price: 16, id: 2},
            {name: 'Tomato', price: 12, id: 3}
          ],
          errors: []
        }).pipe(delay(2000));
      }

      getAssortments(page: number, pageSize: number){
          return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {
                page,
                pageSize,
                totalElements: 30,
                totalPages: Math.ceil(30 / pageSize),
                responseList: [
                    {additions: [{name: 'Tomato', id: 3}], dish: {id: 1, name: 'Test'}, halfable: true},
                    {additions: [{name: 'Cheese', id: 1}], dish: {id: 2, name: 'Shawerma'}, halfable: true}
                ]
            }
        }).pipe(delay(2000));
      }

      editAssortment(id: number, dto: EditAssortmentDto){
        return of({
            status: ResponseStatus.OK,
            errors: [],
            data: {additions: [{name: 'Tomato', id: 3}], dish: {id, name: 'Test edited'}, halfable: true}
        }).pipe(delay(1500));
      }
}
