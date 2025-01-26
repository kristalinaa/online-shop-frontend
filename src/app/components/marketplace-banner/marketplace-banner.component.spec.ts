import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceBannerComponent } from './marketplace-banner.component';

describe('MarketplaceBannerComponent', () => {
  let component: MarketplaceBannerComponent;
  let fixture: ComponentFixture<MarketplaceBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
