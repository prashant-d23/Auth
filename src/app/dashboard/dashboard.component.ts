import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
constructor(private http:SharedService){};

userData:any[] = [];
ngOnInit(){
  this.http.getDataFromServer('users.json').subscribe((response:any)=>{
    this.userData = response;
    console.log(response);
  })
}
}
