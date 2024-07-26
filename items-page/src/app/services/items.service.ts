import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  displayPicture: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl: string = "http://localhost:8080/items";

  constructor(private httpClient: HttpClient) { }

  create(formData: FormData): Observable<Item> {
    return this.httpClient.post<Item>(`${this.apiUrl}`, formData); // Retorna o item completo criado no backend
  }
  list(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.apiUrl}`);
  }

  getUnique(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this.apiUrl}/${id}`);
  }

  update(itemId: string, formData: FormData): Observable<Item> {
    return this.httpClient.put<Item>(`${this.apiUrl}/${itemId}`, formData);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getItemImageUrl(itemId: any): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/${itemId}/image`, { responseType: 'blob' });
  }
}
