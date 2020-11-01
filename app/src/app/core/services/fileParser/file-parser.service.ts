import { LoggerService } from './../logger/logger.service';
import { ElectronService } from './../electron/electron.service';
import { Injectable } from '@angular/core';
import * as acfParser from 'steam-acf-parser'
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {

  constructor(private electron: ElectronService, private logger: LoggerService) {
    this.logger.debug("FileParser: ctor()")
  }

  parseVdf(filePath): object {
    this.logger.debug("parseVdf: path:" + filePath)
    let fileData = this.electron.fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    return this.electron.vdfParser.parse(fileData)



    /*  return new Promise<any>((res, rej) => {
       let out: any = {}
       debugger;
       this.electron.fs.readFile(filePath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
 
         if (err) rej(err);
         out = this.electron.vdfParser.parse(data)
         console.log(out);
         res(out)
 /*
 
 
         let rows = data.split(/\r?\n/);
         for (let i = 2; i < rows.length - 2; i++) {
           let item = rows[i].split(/\t/)
           out[item[1].substr(1, 1)] = item[3];
         }
         res(out)
        });
     }) */
  }
  parseAcf(filePath) {
    this.electron.fs.readFile(filePath, 'utf8', (err, text) => {
      if (err) throw err;
      return acfParser(text);
    });
  }
}
