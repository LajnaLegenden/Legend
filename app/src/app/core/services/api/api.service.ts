import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './../logger/logger.service'
import { AppConfig } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = AppConfig["apiBaseUrl"];
  constructor(private http: HttpClient, private logger: LoggerService) {
    logger.debug("ApiService: ctor()")
    logger.debug("ApiService: baseUrl = " + this.baseUrl)
  }
//hi
  getOwnedSteamGames(userId: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.baseUrl}/steam/getOwnedGames/${userId}`;
      this.logger.debug("Getting owned games")
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }
}
