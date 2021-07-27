import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { SimpleGridComponent } from './simple-grid.component';



@NgModule({
  declarations: [SimpleGridComponent],
  imports: [
    CommonModule,
    GridModule,
    DirectivesModule,
	TranslateModule
  ],
  exports: [SimpleGridComponent]
})
export class SimpleGridModule { }

