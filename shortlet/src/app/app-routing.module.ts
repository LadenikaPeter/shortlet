import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShortletComponent } from './components/shortlet/shortlet.component';


const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {
    path: 'shortlet', component: ShortletComponent
  },
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
