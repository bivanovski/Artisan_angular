import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDialogComponent } from './artisan-dialog.component';

describe('ArtisanDialogComponent', () => {
  let component: ArtisanDialogComponent;
  let fixture: ComponentFixture<ArtisanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
