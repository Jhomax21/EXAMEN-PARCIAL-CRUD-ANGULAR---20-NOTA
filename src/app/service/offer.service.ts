import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, EMPTY, catchError} from 'rxjs';
import Offer from '../models/Offer';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private http: HttpClient) { }

  API_URL : string = 'http://localhost:3000/offers';
  private lista_offers = new Subject<Offer[]>();
  private EliminacionConfirmada = new Subject<Boolean>();

  getAllOffers(){
    return this.http.get<Offer[]>(this.API_URL);
  }


  InsertarOferta(offer: Offer) {
    return this.http.post(this.API_URL, offer);
  }

  setListaOffer(listaNueva: Offer[]) {
    this.lista_offers.next(listaNueva);
  }

  getListaOffer() {
    return this.lista_offers.asObservable();
  }

  ListarPorId(id: number) {
    return this.http.get<Offer>(`${this.API_URL}/${id}`);
  }

  modificarOferta(offer: Offer) {
    return this.http.put(this.API_URL + '/' + offer.id, offer);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  getEliminacionConfirmada() {
    return this.EliminacionConfirmada.asObservable();
  }
  setConfirmaEliminacion(status: Boolean) {
    this.EliminacionConfirmada.next(status);
  }


}
