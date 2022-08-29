import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeFinderComponent } from './zipcode-finder.component';

describe('ZipcodeFinderComponent', () => {
  let component: ZipcodeFinderComponent;
  let fixture: ComponentFixture<ZipcodeFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipcodeFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZipcodeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
