import { ElectronService } from './../electron/electron.service';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  production: boolean;

  constructor(private e:ElectronService) { 
    this.log("LoggerService: ctor()");
    this.production == AppConfig.production;
    if(this.production){
      this.e.logger.transports.console.level = false
    }
  }

  log(...args){
    this.e.logger.info(args.toString())
  }
  error(...args){
    this.e.logger.error(args.toString())
  }
  debug(...args){
    this.e.logger.debug(args.toString())
  }
}
