import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({selector: '[gauge]'})
export class GaugeDirective implements AfterViewInit{
    constructor(element: ElementRef) {

    }

    ngAfterViewInit() {
       
    }
}
