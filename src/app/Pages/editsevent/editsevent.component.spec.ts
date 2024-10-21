import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditseventComponent } from './editsevent.component';

describe('EditseventComponent', () => {
  let component: EditseventComponent;
  let fixture: ComponentFixture<EditseventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditseventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditseventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
