import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class SharedRoutingModule { }
