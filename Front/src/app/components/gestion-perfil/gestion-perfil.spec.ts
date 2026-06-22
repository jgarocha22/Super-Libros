import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPerfil } from './gestion-perfil';

describe('GestionPerfil', () => {
  let component: GestionPerfil;
  let fixture: ComponentFixture<GestionPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
