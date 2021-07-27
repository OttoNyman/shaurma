import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { InputComponent } from './input/input.component';
import { MaskedInputComponent } from './masked-input/masked-input.component';
import { ButtonComponent } from './button/button.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { SelectComponent } from './select/select.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NumericComponent } from './numeric/numeric.component';
import { DateInputComponent } from './date-input/date-input.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChipWithInputComponent } from './chip-with-input/chip-with-input.component';
import { DatetimeInputComponent } from './datetime-input/datetime-input.component';
import { MultiselectComponent } from './multiselect/multiselect.component';


@NgModule({
  declarations: [
    InputComponent,
    MaskedInputComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    NumericComponent,
    DateInputComponent,
    ChipWithInputComponent,
    DatetimeInputComponent,
    MultiselectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    DateInputsModule,
    FloatingLabelModule,
    ButtonsModule,
    IndicatorsModule,
    DropDownsModule,
	  TranslateModule
    
  ],
  exports: [
    InputComponent,
    MaskedInputComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    NumericComponent,
    DateInputComponent,
    ChipWithInputComponent,
    DatetimeInputComponent,
    MultiselectComponent
  ]
})
export class FormElementsModule { }
