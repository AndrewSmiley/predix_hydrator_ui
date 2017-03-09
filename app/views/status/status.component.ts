import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LogEntry } from './logEntry';
import { KeguratorService } from '../../common/kegurator/kegurator.service';
import {error} from "util";

@Component({
    moduleId: module.id,
    selector: 'status',
    templateUrl: './status.html',
    styleUrls: ['./status.less'],
    providers: [KeguratorService],
    encapsulation: ViewEncapsulation.None
})

export class StatusComponent implements AfterViewInit {
    @ViewChild('gauge') gauge: ElementRef;
    ounces: number = 345;
    temp: number = 35;
    fullness: number = 100;//this.kegService.getVolume()
    overview: any = {
        "days_in_lines": 5,
        "days_in_keg": 5,
        "result": "true",
        "days_in_c02": 5


    };
    omt: any={
      "omt_start": "6PM",
      "omt_end": "12AM",
      "result": "true"
    };
    entries: LogEntry [] = [{
            status: 'complete',
            timestamp: 12345675,
            name: 'Max Randolph',
            user_id: '210040001',
            pour_id: 1
    }];
    constructor(private kegService: KeguratorService) {

    }

     ngAfterViewInit() {
        this.entries = this.kegService.getLogEntries();
        this.getStatus();
        this.getOverview();
        this.getOmt();
        console.log("ng After View init")
       console.log(this.omt.omt_start)
       console.log(this.omt.omt_end)
    }

    getStatus() {
        console.info("trying to get the volume");
        this.kegService.getVolume()
                    .subscribe(body => {
                        this.fullness = body.health.keg.percentage;
                        this.temp = body.health.keg.temperature;
                        console.info(this.fullness);
                        this.renderGauge();
                    },
                    any => { console.info('error'); });
    }
    getOmt(){
      this.kegService.getOmt().subscribe(body => {this.omt = body}, error => {console.info(error)})
    }
    getOverview() {
        this.kegService.getOverview().subscribe(
            body => {this.overview = body; },
            error => {console.info(error); }
        );
    }

    renderGauge() {
      console.log(this.overview)
      // this.kegService.getVolume().subscribe(body => {this.fullness= body.health.keg.percentage})
      console.log(this.fullness);
      let x = 90;
        let y = 90;
        let radius = 75;

        let degrees = ((100-this.fullness)/ 100) * 360;
        let radians = degrees * Math.PI / 180;
        if (this.gauge) {
            let context:  CanvasRenderingContext2D = this.gauge.nativeElement.getContext('2d');
            context.fillStyle = '#75B825';
            context.beginPath();
               context.arc(x, y , radius, 0, radians, false); // outer (filled)
           context.lineWidth = 30;
           context.strokeStyle = '#75B825';
           context.stroke();

           context.beginPath();
               context.arc(x, y , radius, 0, radians, true); // outer (filled)
           context.lineWidth = 30;
           context.strokeStyle = 'lightgrey';
           context.stroke();

           context.font = '60px Impact, Helvetica, Arial, sans-serif';
           context.fillText((100-this.fullness).toString(), x - 37, y + 20);

           context.strokeStyle = 'green';
           context.font = '20px Helvetica, Arial, sans-serif';
           context.fillText('%', x + 30, y - 10);
        }
    }
}
