import {Component, OnInit} from '@angular/core';
import {apiConfig} from 'environments/environment';

@Component({
  selector: 'sho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('API URL:' + apiConfig.url);
  }
}
