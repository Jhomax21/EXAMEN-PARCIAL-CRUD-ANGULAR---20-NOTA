import { CrearEditarComponent } from './components/offers/crear-editar/crear-editar.component';
import { OffersComponent } from './components/offers/offers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'home', component: HomeComponent },
  { path: 'bussines/offers', component: OffersComponent },
  { path: 'admin/offers/edit/:id', component: CrearEditarComponent },
  { path: 'admin/offers/new', component: CrearEditarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
