import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTrabajadorComponent } from './reserva-trabajador.component';

describe('ReservaTrabajadorComponent', () => {
  let component: ReservaTrabajadorComponent;
  let fixture: ComponentFixture<ReservaTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
