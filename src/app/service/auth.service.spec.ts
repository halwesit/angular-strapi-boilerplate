import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController
  let HttpClient: HttpClientTestingModule
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
  });
  httpMock = TestBed.get(HttpTestingController)
  HttpClient = TestBed.inject(HttpClientTestingModule)
  it('should be created', () => {
    expect(AuthService).toBeTruthy();
  });

});
