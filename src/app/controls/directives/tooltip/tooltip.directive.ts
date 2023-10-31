import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip!: string;

  constructor(private host: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.host.nativeElement, 'tooltip');
  }
}
