import {Injectable} from '@angular/core';

@Injectable()
export class DeliveryMapperService {
    mapStringToTxt(data: string){
        let blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
        return URL.createObjectURL(blob);
    }
}
