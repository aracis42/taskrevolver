import { Injectable } from '@angular/core';

@Injectable()
export class FootercontentService {

    constructor() { }
    newcontent = {header: 'Die Überschrift',  textcontent: 'Dies ist der Content aus einem Objekt im Content Service'};

}
