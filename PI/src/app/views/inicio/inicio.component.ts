import {Component} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {RequestService} from '../../services/request.service';
import {CarouselComponent} from '../../components/carousel/carousel.component';
import {Opinion, Servicio, Usuario} from '../../models/response.interface';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-inicio',
  imports: [CardComponent, CarouselComponent, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  public servicios: Servicio[] = [];
  public opiniones: Opinion[] = [];
  public servicio: string = "";
  public stock: number = 0;
  public precio: string = "";
  public show: boolean = false;
  public servicios_productos: string = "servicios";
  public array_servicos: Servicio[] = [];
  public array_productos: Servicio[] = [];

  public user = localStorage.getItem('userId');

  reactiveForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    valoracion: new FormControl(''),
  });
  private apiUrlServicio: string = 'http://52.205.151.118/api/servicio';
  private apiUrlOpinion: string = 'http://52.205.151.118/api/opinion';

  constructor(private service: RequestService) {
  }

  public click_servicios() {
    this.servicios_productos = "servicios"
    console.log("servicios");
  }

  public click_productos() {
    this.servicios_productos = "productos"
    console.log("productos");
  }

  public onSubmit(): void {
    console.log(this.reactiveForm.value);
    this.createOpinion();
  }


  /*public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Respuesta de la API:", response); // Verifica lo que llega de la API
        this.servicios = response;

        for (let index = 0; index < this.servicios.length; index++) {
          if (this.servicios[index].stock == null) {
            this.array_servicos.push(this.servicios[index]);
          } else {
            this.array_productos.push(this.servicios[index]);
          }
        }
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }*/

  ngOnInit(): void {
    this.getServicios();
    this.getOpiniones();
    console.log(this.array_servicos)
    console.log("------------------------------------")
    console.log(this.array_productos)
  }

  public getOpiniones(): void {
    this.service.getOpiniones(this.apiUrlOpinion).subscribe(
      (response) => {
        this.opiniones = response;
        console.log("Opiniones:", response);
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }

  public showForm(): void {
    if (this.show === true) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  public createOpinion(): void {
    const usuarioString: string | null = localStorage.getItem('userId');

    const usuario: number = Number(usuarioString);
    let assessment: number = 0;

    switch (this.reactiveForm.value.valoracion) {
      case '⭐️':
        assessment = 1;
        break;
      case '⭐️⭐️':
        assessment = 2;
        break;
      case '⭐️⭐️⭐️':
        assessment = 3;
        break;
      case '⭐️⭐️⭐️⭐️':
        assessment = 4;
        break;
      case '⭐️⭐️⭐️⭐️⭐️':
        assessment = 5;
        break;
      default:
        assessment = 0;
    }

    const newOpinion: Opinion = {
      titulo: this.reactiveForm.value.titulo ?? '',
      descripcion: this.reactiveForm.value.descripcion ?? '',
      valoracion: assessment,
      usuario: usuario
    };

    this.service.createOpinion(this.apiUrlOpinion, newOpinion).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    )
  }

  private getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Servicios recibidos:", response);
        this.servicios = response;

        for (let index = 0; index < this.servicios.length; index++) {
          if (this.servicios[index].stock == null) {
            this.array_servicos.push(this.servicios[index]);
          } else {
            this.array_productos.push(this.servicios[index]);
          }
        }
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }

}
