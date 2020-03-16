import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo1',
    templateUrl: './demo1.component.html',
    styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {
    dropdownEntries = [
        { value: 'vader', text: 'Darth Vader' },
        { value: 'rey', text: 'Rey Skywalker' },
        { value: 'kylo', text: 'Kylo Ren' },
        { value: 'chewie', text: 'Chewbacca' },
    ];

    constructor() { 

    }

    ngOnInit() {
    }

}
