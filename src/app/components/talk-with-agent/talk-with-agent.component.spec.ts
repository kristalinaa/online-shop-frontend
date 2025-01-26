import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkWithAgentComponent } from './talk-with-agent.component';

describe('TalkWithAgentComponent', () => {
  let component: TalkWithAgentComponent;
  let fixture: ComponentFixture<TalkWithAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkWithAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkWithAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
