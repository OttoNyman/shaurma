import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() fileDropped: EventEmitter<FileList> = new EventEmitter;

  @HostBinding('class.fileOver')
  private fileOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(e: Event){
    e.preventDefault();
    e.stopPropagation();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: Event){
    e.preventDefault();
    e.stopPropagation();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent){
    e.preventDefault();
    e.stopPropagation();

    this.fileOver = false;
    if(e.dataTransfer.files.length > 0){
      this.fileDropped.emit(e.dataTransfer.files);
    }
  }
}
