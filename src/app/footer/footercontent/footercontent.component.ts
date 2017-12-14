import { Component, OnInit } from '@angular/core';
import { FootercontentService } from './footercontent.service';

@Component({
  selector: 'app-footer-footercontent',
  templateUrl: './footercontent.component.html',
  styleUrls: ['./footercontent.component.css']
})



export class FootercontentComponent implements OnInit {
  footercontent ;

  constructor(private footercontentService: FootercontentService) {

  }

  header = '';
  textcontent = '';

  ngOnInit() {
    // console.log(this.footercontentService.content );
    this.header = this.footercontentService.newcontent.header;
    this.textcontent = this.footercontentService.newcontent.textcontent;
  }

}
