import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as logger from 'electron-log'
import * as SteamAPI from 'steamapi';
import * as vdf from 'vdf-parser'
@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  global: typeof window;
  path: typeof path;
  logger: typeof logger;
  SteamAPI: typeof SteamAPI;
  vdfParser: typeof vdf;


  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      // If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
      this.remote = window.require('electron').remote;
      this.global = window;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.logger = window.require('electron-log');
      this.SteamAPI = window.require('steamapi')
      this.vdfParser = window.require('vdf-parser')
    }
  }
}
