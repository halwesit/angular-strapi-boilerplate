import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController
  let HttpClient: HttpClientTestingModule
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
  });
  httpMock = TestBed.get(HttpTestingController)
  HttpClient = TestBed.inject(HttpClientTestingModule)

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
