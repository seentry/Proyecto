import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {Cita, Usuario} from '../../models/response.interface';


@Component({
  selector: 'app-mi-perfil',
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {
  public urlUser: string = 'http://52.205.151.118/api/usuario/';
  public urlCitas: string = 'http://52.205.151.118/api/cita/';
  public user: Usuario | null = null;
  public citas: Cita[] = [];

  constructor(private service: RequestService, private router: Router) {
  }

  // Get user data from Api via LocalStorage
  ngOnInit() {
    let id = localStorage.getItem('userId')
    if (id == null) {
      this.router.navigate(['login']);
    }
    this.urlUser = this.urlUser + id;
    this.service.getUsuario(this.urlUser).subscribe((response) => {
      this.user = response;
      console.log(response);
    })

    this.getCitas()
  }

  getCitas() {
    // GET CITAS FROM THIS USER
  }

  cancelCita(id: number) {
    let url = this.urlCitas + id;
    this.service.deleteCita(url).subscribe()
    this.getCitas()
  }
}
