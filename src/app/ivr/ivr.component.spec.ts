import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrComponent } from './ivr.component';

describe('IvrComponent', () => {
  let component: IvrComponent;
  let fixture: ComponentFixture<IvrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvrComponent]
    });
    fixture = TestBed.createComponent(IvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
