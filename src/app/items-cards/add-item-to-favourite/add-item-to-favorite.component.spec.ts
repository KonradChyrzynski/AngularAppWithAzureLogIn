import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemToFavouriteComponent } from './add-item-to-favourite.component';


describe('AddItemToFavouriteComponent', () => {
  let component: AddItemToFavouriteComponent;
  let fixture: ComponentFixture<AddItemToFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemToFavouriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemToFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
