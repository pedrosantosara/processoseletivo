import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFormComponent } from './items-form.component';

describe('ItemsFormComponent', () => {
  let component: ItemsFormComponent;
  let fixture: ComponentFixture<ItemsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
