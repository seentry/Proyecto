import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGestionProductosComponent } from './card-gestion-productos.component';

describe('CardGestionProductosComponent', () => {
  let component: CardGestionProductosComponent;
  let fixture: ComponentFixture<CardGestionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGestionProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGestionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
