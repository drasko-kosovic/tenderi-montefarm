import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTenderiComponent } from './home-tenderi.component';

describe('HomeTenderiComponent', () => {
  let component: HomeTenderiComponent;
  let fixture: ComponentFixture<HomeTenderiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTenderiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTenderiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
