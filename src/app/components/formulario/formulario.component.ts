import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Puppy } from '../../models/puppydata.model';
import { ShareDataService } from '../../services/share-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ListadoComponent } from '../listado/listado.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ListadoComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  mascotaData = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    raza: new FormControl('', [Validators.required])
  });
  private id = 0;
  public newPuppy: Puppy = new Puppy(0, '', 0);
  editMascota = false;

  constructor (private share: ShareDataService) {}
  
  ngOnInit(): void {
      this.share.editSharePuppy.subscribe(mascota => {
        //console.log(mascota);
        if (mascota.getId() != 0) {
          this.newPuppy = mascota;
          this.editMascota = true;
          this.mascotaData.patchValue({
            nombre: this.newPuppy.getName(),
            raza: this.newPuppy.getRaza().toString()
          });
        } else {
          console.log(mascota.getId());
        }
      });
  }

  ingresarMascota () {
    var name = this.mascotaData.controls['nombre'].value ?? '';
    var raza = this.mascotaData.controls['raza'].value ?? '';
    
    if (!this.editMascota) {
      this.id += 1;
      var createPuppy = new Puppy(this.id, name, parseInt(raza));
      
      this.share.shareNewPuppy(createPuppy);
      this.mascotaData.patchValue({
        nombre: '',
        raza: '0'
      });
      console.log(createPuppy);
    } else {
      this.id = this.newPuppy.getId();
      var createPuppy = new Puppy(this.id, name, parseInt(raza));
      
      this.share.shareNewPuppy(createPuppy);
      this.mascotaData.patchValue({
        nombre: '',
        raza: '0'
      });
    }
  }
}
