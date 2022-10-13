import { OfferService } from 'src/app/service/offer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private offerService: OfferService,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  confirmar(estado: boolean) {
    this.offerService.setConfirmaEliminacion(estado);
    this.dialogRef.close();
  }

}
