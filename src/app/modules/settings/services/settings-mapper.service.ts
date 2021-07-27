import { Injectable } from '@angular/core';
import { AssortmentItemDto } from 'src/app/core/dto/AssortmentItemDto';
import { EditAssortmentDto } from 'src/app/core/dto/EditAssortmentDto';
import { SimpleDto } from 'src/app/core/dto/SimpleDto';
import { SimplePriceDto } from 'src/app/core/dto/SimplePriceDto';
import { ISimpleItem } from 'src/app/core/interfaces/ISimpleItem';
import { ISimplePriceItem } from 'src/app/core/interfaces/ISimplePriceItem';

@Injectable()
export class SettingsMapperService {
  fromSimplePriceToDto(data: ISimplePriceItem): SimplePriceDto{
    return {name: data.name, price: data.price};
  }

  fromSimpleToDto(data: ISimpleItem): SimpleDto{
    return {name: data.name};
  }

  toAssortmentEditDto(data: AssortmentItemDto): EditAssortmentDto{
    return {
      additions: data.additions.map(add => add.id),
      halfAble: data.halfable
    }
  }

  fromAssortment(dto: any): AssortmentItemDto{
    return {
      additions: dto.additions || [],
      halfable: dto.halfAble,
      dish: dto.dish
    }
  }
}
