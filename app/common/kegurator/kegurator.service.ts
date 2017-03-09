import { Injectable } from '@angular/core';

import { LogEntry } from '../../views/status/logEntry';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class KeguratorService {
    private kegURL = 'http://localhost:8000';
    public pourID = '2';
    constructor (private http: Http) {}

    getKegVolume(): number {
        return 34;
    }
    getOverview(): Observable<any> {
        return this.http.get(this.kegURL + '/v1/dt/overview/')
                        .map(this.readData)
                        .catch(this.handleError);
    }
    startPour(size: string): Observable<any> {
        return this.http.get(this.kegURL + '/v1/start_pour/' + size + '/210040001')
                        .map(this.readData)
                        .catch(this.handleError);
    }

    stopPour(): Observable<any> {
        return this.http.get(this.kegURL + '/v1/stop_pour/')
                        .map(this.readData)
                        .catch(this.handleError);
    }

    getVolume(): Observable<any> {
        return this.http.get(this.kegURL + '/v1/system_info')
                    .map(this.readData)
                    .catch(this.handleError);
    }

    getOmt(): Observable<any> {
    return this.http.get(this.kegURL + '/v1/dt/omt/')
      .map(this.readData)
      .catch(this.handleError);
    }

    handleError(error: Response | any) {
        console.log(error);
        return Observable.throw(error);
    }

    readData(res: Response) {
        let body = res.json();
        return body;
    }

    getPour(pour_id: string): Observable<any> {
        return this.http.get(this.kegURL + '/v1/pour_status/' + pour_id + '/')
                .map(response => {
                    let body = response.json();
                    return body;
                })
                .catch(this.handleError);
    }

    getTempurature(): number {
        return 32;
    }

    getOuncesDispenced(): number {
        return 66;
    }

    getLogEntries(): LogEntry[] {
        let logs: LogEntry [] = [{
             status: 'complete',
            timestamp: 12345675,
            name: 'Max Randolph',
            user_id: '210040001',
            pour_id: 1
        },
        {
            status: 'complete',
            timestamp: 12345675,
            name: 'Max Randolph',
            user_id: '210040001',
            pour_id: 1
        }];

        return logs;
    }

    pollPourStatus(): number {
        return 80;
    }
}
