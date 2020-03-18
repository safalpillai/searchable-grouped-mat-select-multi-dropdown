import { Component, OnInit } from '@angular/core';
import { IDropdownEntries } from 'src/app/searchable-grouped-mat-select/common.model';

@Component({
    selector: 'app-demo1',
    templateUrl: './demo1.component.html',
    styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {
    dropdownEntries: Array<IDropdownEntries> = [
        { value: 'vader', text: 'Darth Vader' },
        { value: 'rey', text: 'Rey Skywalker' },
        { value: 'kylo', text: 'Kylo Ren' },
        { value: 'chewie', text: 'Chewbacca' },
    ];

    constructor() { 

    }

    ngOnInit() {
    }

    unGroupedSelection(matSelectValues) {
        console.log('Grouped selection output - ', matSelectValues)
    }

}
