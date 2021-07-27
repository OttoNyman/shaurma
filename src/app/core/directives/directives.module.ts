import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderDirective } from './loader.directive';
import { DndDirective } from './dnd.directive';



@NgModule({
  declarations: [LoaderDirective, DndDirective],
  imports: [CommonModule],
  exports: [LoaderDirective, DndDirective]
})
export class DirectivesModule { }
