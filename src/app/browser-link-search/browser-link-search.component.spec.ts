import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserLinkSearchComponent } from './browser-link-search.component';

describe('BrowserLinkSearchComponent', () => {
  let component: BrowserLinkSearchComponent;
  let fixture: ComponentFixture<BrowserLinkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserLinkSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserLinkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
