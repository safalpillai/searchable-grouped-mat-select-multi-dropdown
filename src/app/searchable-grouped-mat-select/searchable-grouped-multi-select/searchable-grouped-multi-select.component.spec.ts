import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableGroupedMultiSelectComponent } from './searchable-grouped-multi-select.component';

describe('SearchableGroupedMultiSelectComponent', () => {
  let component: SearchableGroupedMultiSelectComponent;
  let fixture: ComponentFixture<SearchableGroupedMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchableGroupedMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableGroupedMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
