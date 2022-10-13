import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfferService } from 'src/app/service/offer.service';
import { Component, OnInit } from '@angular/core';
import Offer from 'src/app/models/Offer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css'],
})
export class CrearEditarComponent implements OnInit {
  offer: Offer = new Offer();
  edicion: boolean = false;
  id: number = 0;
  CurrentRoute: string = this.router.url.split('/')[1];

  constructor(
    private offerService: OfferService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  alertar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initialize();
    });
  }

  initialize() {
    //this.esRecolector = this.current_route === 'Recolectores' && true;
    if (this.edicion) {
      this.offerService.ListarPorId(this.id).subscribe((data) => {
        this.offer = data;
      });
    }
  }

  HandleSave() {
    if (this.offer.title != '' && this.offer.points != null) {
      if (this.offer.title.length < 60) {
        if (this.offer.points <= 100) {
          if (this.edicion) {
            this.offerService.modificarOferta(this.offer).subscribe((data) => {
              this.offerService.getAllOffers().subscribe((data) => {
                this.offerService.setListaOffer(data);
                this.router.navigate(['bussines/offers']);
              });
            });
          } else {
            this.offerService.InsertarOferta(this.offer).subscribe((data) => {
              this.offerService.getAllOffers().subscribe((data) => {
                this.offerService.setListaOffer(data);
                this.router.navigate(['bussines/offers']);
              });
            })
          }
        } else {
          this.alertar('Los puntos no pueden ser mayor a 100');
        }
      } else {
        this.alertar('El titulo debe tener menos de 60 caracteres');
      }
    } else {
      this.alertar('Debe completar el titulo y los puntos');
    }
  }
}
