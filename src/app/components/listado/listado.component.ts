import { Component, OnInit, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Puppy } from '../../models/puppydata.model';
import { MatButtonModule } from '@angular/material/button';
import { ShareDataService } from '../../services/share-data.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule 
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent implements OnInit {
  listadoMascotas: Array<Puppy> = [];
  displayedColumns: string[] = ['raza', 'nombre', 'borrar', 'editar'];
  dataSource = new MatTableDataSource(this.listadoMascotas);
  obtData = inject(ShareDataService)

  constructor(
    private shareMascota: ShareDataService
  ){}

  ngOnInit(): void {
    let editPuppy: Array<Puppy> = [];
      this.obtData.currentSharePuppy.subscribe(data => {
        editPuppy = this.listadoMascotas.filter(item => item.getId() == data.getId());
        //console.log('Edicion ');
        //console.log(editPuppy);
        if (data.getId() != 0 && editPuppy.length == 0){
          this.listadoMascotas.push(data);
          this.dataSource = new MatTableDataSource(this.listadoMascotas);
        } else {
          this.listadoMascotas.forEach(x => {
            if (x.getId() == data.getId()) {
              console.log('Estes Coincide ');
              console.log(x);
              x.newName(data.getName());
              x.newRaza(data.getRaza());
            }
        });
        }
      });
  }

  deleteMascota(mascota: Puppy){
    this.listadoMascotas = this.listadoMascotas.filter(item => item.getId() != mascota.getId());
    this.dataSource = new MatTableDataSource(this.listadoMascotas);
  }

  editMascota(mascota: Puppy) {
    this.shareMascota.editMascota(mascota);
    console.log(this.listadoMascotas);
  }
}
