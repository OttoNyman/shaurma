import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PanelComponent } from './panel.component';



@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [PanelComponent]
})
export class PanelModule {}
