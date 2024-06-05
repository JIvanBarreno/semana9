import { Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    { path: 'formulario', component: FormularioComponent },
    { path: 'listado', component: ListadoComponent }
];
