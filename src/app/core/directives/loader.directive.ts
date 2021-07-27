import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnInit, OnChanges {
  @Input('appLoader') loading = false;

  private loaderElement: any = null;
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(){
    //change parent position
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    //create loader element
    this.loaderElement = this.renderer.createElement('div');
    const loaderIcon = this.renderer.createElement('i');
    this.renderer.addClass(this.loaderElement, 'app-loader');
    this.renderer.addClass(loaderIcon, 'k-icon');
    this.renderer.addClass(loaderIcon, 'k-i-loading');

    //show element
    this.renderer.appendChild(this.loaderElement, loaderIcon);
    this.renderer.appendChild(this.el.nativeElement, this.loaderElement);
    this.renderer.setStyle(this.loaderElement, 'visibility', this.loading ? 'visible' : 'hidden');
  }

  ngOnChanges(){
    if(this.loaderElement)
      this.renderer.setStyle(this.loaderElement, 'visibility', this.loading ? 'visible' : 'hidden');
  }
}
