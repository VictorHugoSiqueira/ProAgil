import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  baseURL = 'http://localhost:5000/api/values';
  
  constructor(private http: HttpClient) { }
  
  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }
  
  getEventoById(evento:any, id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${evento.eventoId}`);
  }
  
  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }
  
  postEvento(evento: Evento) {
    return this.http.post(this.baseURL, evento);
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURL}/${evento.eventoId}`, evento);
  }

  deleteEvento(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
