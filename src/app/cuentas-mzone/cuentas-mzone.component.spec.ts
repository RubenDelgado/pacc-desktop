import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasMzoneComponent } from './cuentas-mzone.component';

describe('CuentasMzoneComponent', () => {
  let component: CuentasMzoneComponent;
  let fixture: ComponentFixture<CuentasMzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasMzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasMzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
