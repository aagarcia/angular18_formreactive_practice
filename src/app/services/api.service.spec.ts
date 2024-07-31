import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch countries', () => {
    const dummyCountries = [{ name: 'Ecuador' }, { name: 'Peru' }];

    service.getCountries().subscribe(countries => {
      console.info('Countries: ', countries);
      expect(countries.length).toBe(2);
      expect(countries).toEqual(dummyCountries);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });

  it('should fetch cities for a given country', () => {
    const dummyCities = { data: ['Quito', 'Guayaquil'] };
    const country = 'Ecuador';

    service.postGetCities(country).subscribe(cities => {
      expect(cities.data.length).toBe(2);
      expect(cities.data).toEqual(dummyCities.data);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/cities`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ country });
    req.flush(dummyCities);
  });
});
