import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@core/products/product';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss']
})
export class AddToCartDialogComponent{

  constructor(public dialogRef: MatDialogRef<AddToCartDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product) { }

  // ngOnInit(): void {
  //   console.log('loading Modal', this.data);
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
