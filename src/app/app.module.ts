import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchableGroupedMatSelectModule } from './searchable-grouped-mat-select/searchable-grouped-mat-select.module';
import { Demo1Component } from './demos/demo1/demo1.component';

@NgModule({
    declarations: [
        AppComponent,
        Demo1Component,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SearchableGroupedMatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
