import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemsLayoutComponent } from './main-items-layout.component';

describe('MainItemsLayoutComponent', () => {
  let component: MainItemsLayoutComponent;
  let fixture: ComponentFixture<MainItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainItemsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
