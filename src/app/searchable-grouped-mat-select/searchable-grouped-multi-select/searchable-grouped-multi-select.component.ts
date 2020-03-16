import { Component, OnInit, Output, OnDestroy, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDropdownEntries, ISearchOutput, IGroupedDropdownEntries } from '../common.model';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-searchable-grouped-multi-select',
  templateUrl: './searchable-grouped-multi-select.component.html',
  styleUrls: ['./searchable-grouped-multi-select.component.scss']
})
export class SearchableGroupedMultiSelectComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    // title of dropdown (note: provide property as string)
    @Input() title: string;
    // initial mat-select entries
    @Input() dropdownEntries: IDropdownEntries[];
    // initial grouped mat-select entries
    @Input() groupedDropdownEntries: IGroupedDropdownEntries[];
    // check entries on load
    @Input() initialValues: Array<string>;
    // dropdown with grouping 
    @Input() grouping: boolean = false;
    // disabled 
    @Input() disabled: boolean = false;
    // selection change event for ungrouped dropdowns
    @Output() ungroupedChange: EventEmitter<ISearchOutput> = new EventEmitter<ISearchOutput>();
    // selection change event for grouped dropdowns
    @Output() groupedChange: EventEmitter<ISearchOutput> = new EventEmitter<ISearchOutput>();
    subSink: SubSink = new SubSink();
    _onDestroy = new Subject<void>();
    searchTextbox;
    dropdown;
    // list filtered by search query
    filteredEntries: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    copyOfDropdownEntries: IDropdownEntries[];
    copyOfGroupedDropdownEntries: any[];
    // search criteria for grouped dropdowns (if true, for grouped dropdowns, search will filter using group headings)
    @Input() searchCriteriaForGroupedDropdown: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        // form setup
        this.formGroup = this.formBuilder.group({
            multiSelector: [{ value: '', disabled: this.disabled }],
            search: ['']
        });
        this.searchTextbox = this.formGroup.get('search');
        this.dropdown = this.formGroup.get('multiSelector');
        // make a copy of dropdown entries
        if (this.grouping) this.copyOfGroupedDropdownEntries = this.groupedDropdownEntries?.slice();
        else this.copyOfDropdownEntries = this.dropdownEntries?.slice();
        // set initial values
        this.formGroup.get('multiSelector').setValue(this.initialValues);
        // set filtered entries in dropdown & if search query is null repopulate whole dropdown entries
        this.subSink.sink = this.filteredEntries.subscribe(entries => {
            if (this.grouping) this.groupedDropdownEntries = entries;
            else this.dropdownEntries = entries;
        });
        // search on textbox input
        this.subSink.sink = this.searchTextbox.valueChanges.pipe(
            takeUntil(this._onDestroy)
        )
        .subscribe(() => this.filterDropdown());
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    // emit events to parent => ISearchOutput: {selections: string[]}
    selectionChanged(event) {
        // extract selected/unselected privileges
        if (this.grouping) {
            const unselections = this.groupedDropdownEntries.map(x => x.iterables.filter(y => !event.value.includes(y.value)).map(z => z.value)).flat(Infinity).filter(Boolean);
            this.groupedChange.emit({ selections: event.value, unselections });
        }
        else this.ungroupedChange.emit({ selections: event.value });
    }

    private filterDropdown() {
        // if iterables are empty do nothing
        if (!this.dropdownEntries && !this.grouping) return;
        if (!this.groupedDropdownEntries && this.grouping) return;
        let searchQuery = this.searchTextbox.value;
        if (searchQuery) {
            // return grouped filtered entries
            if (this.grouping) {
                // search all group headings
                if (this.searchCriteriaForGroupedDropdown) {
                    this.filteredEntries.next(
                        this.copyOfGroupedDropdownEntries.map(entries => {
                            if (entries.name.toLowerCase().includes(searchQuery.toLowerCase())) return { name: entries.name, iterables: entries.iterables };
                        })
                        .filter(Boolean)
                    );
                } else {
                    // search all group entries
                    this.filteredEntries.next(
                        this.copyOfGroupedDropdownEntries.map(entry => {
                            const validSubIterables = entry.iterables.filter(iterable => iterable.text.toLowerCase().includes(searchQuery.toLowerCase()));
                            if (validSubIterables.length) return { name: entry.name, iterables: validSubIterables };
                        })
                        .filter(Boolean)
                    );
                }
            } else {
                // return filtered entries
                this.filteredEntries.next(
                    this.copyOfDropdownEntries.filter(iterable => iterable.text.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }
        } else {
            // reinsert dropdown entries on search clear
            if (this.grouping) this.groupedDropdownEntries = this.copyOfGroupedDropdownEntries;
            else this.dropdownEntries = this.copyOfDropdownEntries;
        }
    }
}
