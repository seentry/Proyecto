import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTrabajadorComponent } from './producto-trabajador.component';

describe('ProductoTrabajadorComponent', () => {
  let component: ProductoTrabajadorComponent;
  let fixture: ComponentFixture<ProductoTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
