import { Subject } from 'rxjs';
// tslint:disable
import { Injectable } from '@angular/core';
import { AngularCsv } from 'angular7-csv';

@Injectable({
  providedIn: 'root'
})
export class FileGenerationService {

  public onDownloadCompleted = new Subject<boolean>();

  constructor() { }

  generateCSV(data: any, headers: string[], filename: string) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers,
      showTitle: false,
      useBom: false,
      removeNewLines: true,
      nullToEmptyString: false,
      keys: []
    };

    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(data, filename, options);

  }
}
