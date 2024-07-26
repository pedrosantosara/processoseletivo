import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAcessComponent } from './input-acess.component';

describe('InputAcessComponent', () => {
  let component: InputAcessComponent;
  let fixture: ComponentFixture<InputAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
