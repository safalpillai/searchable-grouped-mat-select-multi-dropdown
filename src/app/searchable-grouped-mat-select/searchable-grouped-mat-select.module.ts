import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchableGroupedMultiSelectComponent } from './searchable-grouped-multi-select/searchable-grouped-multi-select.component';


@NgModule({
    declarations: [
        SearchableGroupedMultiSelectComponent,
    ],
    imports: [
        CommonModule,
        NgxMatSelectSearchModule,
    ],
    exports: [
        SearchableGroupedMultiSelectComponent,
    ]
})
export class SearchableGroupedMatSelectModule { }
