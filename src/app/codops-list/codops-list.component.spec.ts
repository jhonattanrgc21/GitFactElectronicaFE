import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodopsListComponent } from './codops-list.component';

describe('CodopsListComponent', () => {
  let component: CodopsListComponent;
  let fixture: ComponentFixture<CodopsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodopsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
