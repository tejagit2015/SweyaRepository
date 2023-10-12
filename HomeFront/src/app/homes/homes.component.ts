import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit{
  ngOnInit(){
    this.getHomes();
}
constructor(private http: HttpClient){}
home: any;
getHomes()
{
  this.http.get("http://localhost:8080/getHome")
  .subscribe((homes) => {
    console.log(homes);
    this.home=homes;
  })
}
}
