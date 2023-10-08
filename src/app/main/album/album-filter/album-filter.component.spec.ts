import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumFilterComponent } from './album-filter.component';

describe('ToolbarComponent', () => {
  let component: AlbumFilterComponent;
  let fixture: ComponentFixture<AlbumFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
