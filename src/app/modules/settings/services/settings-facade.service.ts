import { Injectable } from '@angular/core';
import { EditAssortmentDto } from 'src/app/core/dto/EditAssortmentDto';
import { SimpleDto } from 'src/app/core/dto/SimpleDto';
import { SimplePriceDto } from 'src/app/core/dto/SimplePriceDto';
import { SettingsApiInterface } from './api/settings-api.interface';

@Injectable()
export class SettingsFacadeService {
  constructor(private settingsApi: SettingsApiInterface) { }

  //dishes
  getDishes(page: number, pageSize: number){
    return this.settingsApi.getDishes(page, pageSize);
  }

  createDish(dto: SimplePriceDto){
    return this.settingsApi.createDish(dto);
  }

  editDish(dishID: number, dto: SimplePriceDto){
    return this.settingsApi.editDish(dishID, dto);
  }

  deleteDish(dishID: number){
    return this.settingsApi.deleteDish(dishID);
  }

  //additions
  getAdditions(page: number, pageSize: number){
    return this.settingsApi.getAdditions(page, pageSize);
  }

  createAddition(dto: SimplePriceDto){
    return this.settingsApi.createAddition(dto);
  }

  editAddition(additionID: number, dto: SimplePriceDto){
    return this.settingsApi.editAddition(additionID, dto);
  }

  deleteAddition(additionID: number){
    return this.settingsApi.deleteAddition(additionID);
  }

  //drinks
  getDrinks(page: number, pageSize: number){
    return this.settingsApi.getDrinks(page, pageSize);
  }

  createDrink(dto: SimplePriceDto){
    return this.settingsApi.createDrink(dto);
  }

  editDrink(additionID: number, dto: SimplePriceDto){
    return this.settingsApi.editDrink(additionID, dto);
  }

  deleteDrink(additionID: number){
    return this.settingsApi.deleteDrink(additionID);
  }

  //remarks
  getRemarks(page: number, pageSize: number){
    return this.settingsApi.getRemarks(page, pageSize);
  }

  createRemark(dto: SimpleDto){
    return this.settingsApi.createRemark(dto);
  }

  editRemark(additionID: number, dto: SimpleDto){
    return this.settingsApi.editRemark(additionID, dto);
  }

  deleteRemark(additionID: number){
    return this.settingsApi.deleteRemark(additionID);
  }

  //assortment
  getAllAdditions(){
    return this.settingsApi.getAllAdditions();
  }

  getAssortments(page: number, pageSize: number){
    return this.settingsApi.getAssortments(page, pageSize);
  }

  editAssortment(id: number, dto: EditAssortmentDto){
    return this.settingsApi.editAssortment(id, dto);
  }
}
