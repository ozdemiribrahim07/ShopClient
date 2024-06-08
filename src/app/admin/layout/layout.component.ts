import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent extends BaseComponent implements OnInit {
  
  constructor(spinner :NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);
  } 

  


  

}
