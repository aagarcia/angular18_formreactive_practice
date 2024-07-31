import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /* private baseUrl = 'https://restcountries.com/v3.1/all'; */ // Reemplaza con la URL de tu API
  private baseUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  postGetCities(pais: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cities`, { country: pais });
  }

}
