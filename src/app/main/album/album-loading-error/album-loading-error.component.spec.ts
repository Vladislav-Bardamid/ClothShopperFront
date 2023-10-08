import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumLoadingErrorComponent } from './album-loading-error.component';

describe('AlbumLoadingErrorComponent', () => {
  let component: AlbumLoadingErrorComponent;
  let fixture: ComponentFixture<AlbumLoadingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumLoadingErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumLoadingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
