import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSayAboutComponent } from './clients-say-about.component';

describe('ClientsSayAboutComponent', () => {
  let component: ClientsSayAboutComponent;
  let fixture: ComponentFixture<ClientsSayAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsSayAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsSayAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
