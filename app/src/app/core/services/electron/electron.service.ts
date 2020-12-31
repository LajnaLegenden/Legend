import * as SteamAPI from 'steamapi';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as logger from 'electron-log'
import * as path from 'path';
import * as regedit from 'regedit'
import * as vdf from 'vdf-parser';

import { ipcRenderer, remote, webFrame } from 'electron';

import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
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
  regedit: typeof regedit
  env : typeof process.env


  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    this.env = process.env
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.global = window;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.logger = window.require('electron-log');
      this.SteamAPI = window.require('steamapi')
      this.vdfParser = window.require('vdf-parser')
      this.regedit = window.require("regedit")
    }
  }

  readRegistry(path) {
    this.regedit.list(path, function (err, result) {
      if (err) throw err;
      return result
    })
  }
}
