import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersTableComponent } from './letters-table.component';

describe('LettersTableComponent', () => {
  let component: LettersTableComponent;
  let fixture: ComponentFixture<LettersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LettersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
