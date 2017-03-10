import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { KeguratorService } from '../../common/kegurator/kegurator.service';

@Component({
    moduleId: module.id,
    selector: 'pour-select',
    templateUrl: './pour-select.html',
    styleUrls: ['./pour-select.less'],
    //providers: [KeguratorService],
    encapsulation: ViewEncapsulation.None
})

export class PourSelectComponent {
    selectedOunces = '0';
    constructor(
        private router: Router,
        private kegService: KeguratorService
    ) {}

    selectSize(size: string) {
        console.info('size selected: ' + size);
        this.selectedOunces = size;
    }

    startPour() {
        if (this.selectedOunces !== '0') {
            this.kegService.startPour(this.selectedOunces)
                .subscribe(
                    body => {
                        this.kegService.pourID = body.pour_id;
                        this.router.navigate(['toast']);
                    },
                    error => {

                    });
        }
    }
}
