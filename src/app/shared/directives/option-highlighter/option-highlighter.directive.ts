import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[optionHighlighter]'
})
export class OptionHighlighterDirective {

  constructor(public elementRef:ElementRef) { } 
  
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
 }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.background = 'white';
  }

}
