import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArtisanComponent } from './delete-artisan.component';

describe('DeleteArtisanComponent', () => {
  let component: DeleteArtisanComponent;
  let fixture: ComponentFixture<DeleteArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
