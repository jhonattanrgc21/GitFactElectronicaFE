import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsBillComponent } from './recipients-bill.component';




describe('PublicServiceComponent', () => {
  let component: RecipientsBillComponent;
  let fixture: ComponentFixture<RecipientsBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsBillComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
