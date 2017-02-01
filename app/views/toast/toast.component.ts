import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'toast',
    templateUrl: './toast.html',
    styleUrls: ['./toast.less'],
    encapsulation: ViewEncapsulation.None
})

export class toastComponent {
    
    constructor(private router: Router) {}

    goToSplash() {
        this.router.navigate(['/']);
    }

    ngAfterViewInit() {
        setTimeout(() => { this.goToSplash(); }, 4000);
    }
}
