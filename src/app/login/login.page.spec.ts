import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ApiService } from '../service/api.service';
import { async } from '@angular/core/testing'
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

});
