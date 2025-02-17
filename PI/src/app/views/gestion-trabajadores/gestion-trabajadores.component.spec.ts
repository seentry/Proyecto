import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTrabajadoresComponent } from './gestion-trabajadores.component';

describe('GestionTrabajadoresComponent', () => {
  let component: GestionTrabajadoresComponent;
  let fixture: ComponentFixture<GestionTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTrabajadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
