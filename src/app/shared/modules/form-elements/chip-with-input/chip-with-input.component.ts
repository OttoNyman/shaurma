import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { IValidateError } from 'src/app/core/interfaces/IValidator';


type IChipItem = {
  id: number,
  name: string
} & {[key: string]: any}

type IChipLoadItems = (details: any) => Observable<IResponse<IChipItem[]>>;

@Component({
  selector: 'app-chip-with-input',
  templateUrl: './chip-with-input.component.html',
  styleUrls: ['./chip-with-input.component.scss']
})
export class ChipWithInputComponent {
  @Input('selectedItems') selectedItems: IChipItem[] = [];
  @Input('variants') _variants: IChipItem[] = [];
  @Input() loadItems: IChipLoadItems = null;
  @Input() details: any = null;
  @Input() errors: IValidateError[] = [];
 
  @Input() mode: 'single' | 'multiple' = 'multiple';
  @Input() canRepeat = false;
  @Input() placeholder = '';
  @Input() loading = false;

  @Output() added: EventEmitter<IChipItem> = new EventEmitter;
  @Output() removed: EventEmitter<IChipItem> = new EventEmitter;

  @ViewChild('autocomplete') autocomplete: AutoCompleteComponent;

  private filter = '';

  get variants(){
    if(this.canRepeat)
      return this._variants;

    return this._variants.filter(variant => (
      !this.selectedItems.find(it => it.id == variant.id) && 
        variant.name.toLowerCase().includes(this.filter.toLowerCase())
    ));
  }

  onChange(indexes: number[]){
    indexes.map(index => this.selectedItems[index].id).forEach(id => this.onRemove(id));
  }

  onRemove(id: number){
    let item = this.variants.find(variant => variant.id == id);

    if(!item)
      item = this.selectedItems.find(it => it.id == id);

    this.removed.emit(item);
  }

  onAdd(name: string){
    const item = this._variants.find(variant => variant.name == name);

    if(item){
      this.added.emit(item);
      this.autocomplete.reset();
    }
  }

  onLoad(){
    if(!this._variants.length){
      this.loading = true;
      this.loadItems(this.details).subscribe(
        res => {
          this._variants = res.data;
          this.loading = false;
        }
      );
    }
  }

  onFilterChange(filterVal: string){
    this.filter = filterVal;
  }
}
