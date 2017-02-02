import { Component } from '@angular/core';
import { KeguratorService } from './common/kegurator/kegurator.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.html',
  providers: [KeguratorService]
})
export class AppComponent  { name = 'Angular'; }
