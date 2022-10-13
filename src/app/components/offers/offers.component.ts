import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Offer from 'src/app/models/Offer';
import { OfferService } from 'src/app/service/offer.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  dataSource: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();

  private idMayor: number = 0;
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'points',
    'businessId',
    'accionEditar',
    'accionEliminar',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private offerService: OfferService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe((data_offers) => {
      this.dataSource.data = data_offers;
    });

    this.offerService.getListaOffer().subscribe((data_offers) => {
      this.dataSource.data = data_offers;
    });

    this.offerService.getEliminacionConfirmada().subscribe((data) => {
      data == true ? this.eliminar(this.idMayor) : false;
    });
  }

  HandleEliminar(id: number) {
    this.idMayor = id;
    this.dialog.open(DialogComponent);
  }

  eliminar(id: number) {
    this.offerService.eliminar(id).subscribe(() => {
      this.offerService.getAllOffers().subscribe((data) => {
        this.offerService.setListaOffer(data);
        this._snackBar.open('Offer eliminado con éxito', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
    });
  }
}
