import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudGridComponent } from './crud-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/core/directives/directives.module';


@NgModule({
  declarations: [CrudGridComponent],
  imports: [
    CommonModule,
    GridModule,
    TranslateModule,

    FormElementsModule,
    DirectivesModule
  ],
  exports: [CrudGridComponent]
})
export class CrudGridModule { }
