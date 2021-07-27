import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { LanguageSelectorComponent } from './language-selector.component';



@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [
    CommonModule,
    PopupModule,
    ListViewModule,
    TranslateModule,
    PipesModule
  ],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule { }
