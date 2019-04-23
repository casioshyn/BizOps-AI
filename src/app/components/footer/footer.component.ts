import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  showPDF=false;
  constructor() { }

  ngOnInit() {
  }
  termsData(){
    this.showPDF=true;   
  }
}
