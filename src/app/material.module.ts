import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';

const modules = [
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    MatDatepickerModule,
  ],
})
export class MaterialModule { }