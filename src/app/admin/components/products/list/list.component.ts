import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product_List } from '../../../../contracts/product_list';
import { ProductService } from '../../../../services/common/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/common/custom-toastr.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $ :any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {


  constructor(spinner : NgxSpinnerService,private productService : ProductService, private toastr : CustomToastrService) {
    super(spinner);
  }

  displayedColumns: string[] = ['productName', 'productPrice', 'productStock', 'createdDate','updatedDate','delete','update'];
  dataSource : MatTableDataSource<Product_List>  = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getAllProducts(){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const allProducts: {total : number , products : Product_List[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5,() => this.hideSpinner(SpinnerType.BallScaleMultiple), errorMessage => this.toastr.message(errorMessage, "Hata", 
      {
        messageType: ToastrMessageType.Error, 
        position: ToastrMessagePosition.TopRight
      }))

    this.dataSource = new MatTableDataSource<Product_List>(allProducts.products);
    this.paginator.length = allProducts.total;

  }


  async ngOnInit() {
    await this.getAllProducts()
  }

  
  async pageChanged(){
       await this.getAllProducts()
  }
  


    





}
