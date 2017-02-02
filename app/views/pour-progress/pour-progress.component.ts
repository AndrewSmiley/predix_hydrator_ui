import { Component, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { KeguratorService } from '../../common/kegurator/kegurator.service';

@Component({
    moduleId: module.id,
    selector: 'pour-progress',
    templateUrl: './pour-progress.html',
    styleUrls: ['./pour-progress.less'],
    //providers: [KeguratorService],
    encapsulation: ViewEncapsulation.None
})

export class PourProgressComponent implements AfterViewInit {
    fullnessPercentage = '0%';
    status = 'Pouring';
    percent = 0;
    intervalID: any;

    constructor(
        private router: Router,
        private kegService: KeguratorService
    ) {}

    ngAfterViewInit() {
        this.mockStatus();
    }
    setDoneState() {
        this.status = 'Done';
        console.info('Done Done');
    }

    goBackToSplash() {
        this.router.navigate(['/']);
    }
    goToToast() {
        this.router.navigate(['toast']);
    }
    stopPour() {
        this.status = 'Stopping';
        this.sendStopSignal();
        console.info('Stop Pouring...');
        clearInterval(this.intervalID);
        setTimeout(() => { this.setDoneState(); }, 4000);
        setTimeout(() => { this.goBackToSplash(); }, 5500);
    }

    sendStopSignal(){
        this.kegService.stopPour().subscribe(
            body => { this.setDoneState(); },
            error => { console.info('error stopping the pour'); });
    }

    formatStatus() {
        console.info(this.kegService.pollPourStatus());

        this.kegService.getPour(this.kegService.pourID).subscribe(body => {
                        this.percent = body.percentage;
                        if (body.status === 'complete') {
                            this.status = "Done :)";
                            clearInterval(this.intervalID);
                            setTimeout(() => { this.goToToast(); }, 1000);
                        }
                    },
                    any => { console.info('error'); });

        this.fullnessPercentage = this.percent + '%';
    }
    mockStatus() {
        this.intervalID = setInterval(() => { this.formatStatus(); }, 250);
    }
}
