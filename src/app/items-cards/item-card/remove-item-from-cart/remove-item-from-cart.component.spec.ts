import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemFromCartComponent } from './remove-item-from-cart.component';

describe('RemoveItemFromCartComponent', () => {
  let component: RemoveItemFromCartComponent;
  let fixture: ComponentFixture<RemoveItemFromCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveItemFromCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItemFromCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
