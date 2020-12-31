import { Component } from '@angular/core';
import { ElectronService, LoggerService} from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private logger: LoggerService
  ) {
    this.translate.setDefaultLang('en');

    if (electronService.isElectron) {
      logger.log('Run in electron');
    } else {
      logger.log('Run in browser');
    }
  }
}
