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
  public mainId = localStorage.getItem('userId')
  protected readonly Date = Date;

  constructor(private service: RequestService, protected router: Router) {
  }

  // Get user data from Api via LocalStorage
  ngOnInit() {
    if (this.mainId == null) {
      this.router.navigate(['login']);
    }
    this.urlUser = this.urlUser + this.mainId;
    this.service.getUsuario(this.urlUser).subscribe((response) => {
      this.user = response;
    })

    this.getCitas()
  }

  getCitas() {
    let url = this.urlCitas + 'user/' + this.mainId;
    this.service.getCitas(url).subscribe((response) => {
      if (this.citas.length == response.length) {
        this.getCitas()
        return
      }
      response.map((cita: Cita) => {
        console.log(cita.fecha);
        let date = new Date(cita.fecha);
        cita.fecha = date.toLocaleString("es-ES", {timeZone: 'UTC'});
      })
      this.citas = response;
    })
  }

  cancelCita(id: number) {
    let url = this.urlCitas + id;
    this.service.deleteCita(url).subscribe()
    this.getCitas()
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/inicio')
  }
}
