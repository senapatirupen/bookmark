import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserLinksComponent } from './browser-links.component';

describe('BrowserLinksComponent', () => {
  let component: BrowserLinksComponent;
  let fixture: ComponentFixture<BrowserLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
