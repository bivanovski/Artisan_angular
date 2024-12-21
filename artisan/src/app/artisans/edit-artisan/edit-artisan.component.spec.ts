import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtisanComponent } from './edit-artisan.component';

describe('EditArtisanComponent', () => {
  let component: EditArtisanComponent;
  let fixture: ComponentFixture<EditArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
