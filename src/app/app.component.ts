import { Component, OnInit } from '@angular/core';

declare var  $  : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
     $.get("https://localhost:7000/api/products")
    
  }
  
}

