import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanSelectionDialogComponent } from './artisan-selection-dialog.component';

describe('ArtisanSelectionDialogComponent', () => {
  let component: ArtisanSelectionDialogComponent;
  let fixture: ComponentFixture<ArtisanSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanSelectionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
