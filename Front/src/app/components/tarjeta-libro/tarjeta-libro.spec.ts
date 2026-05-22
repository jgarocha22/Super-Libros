import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaLibro } from './tarjeta-libro';

describe('TarjetaLibro', () => {
  let component: TarjetaLibro;
  let fixture: ComponentFixture<TarjetaLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaLibro],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
