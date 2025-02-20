import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductoClienteComponent} from './producto-cliente.component';

describe('ProductoClienteComponent', () => {
  let component: ProductoClienteComponent;
  let fixture: ComponentFixture<ProductoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoClienteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
