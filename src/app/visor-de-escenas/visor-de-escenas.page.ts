import { Component, OnInit } from '@angular/core';
import{DbServiceService} from 'src/app/db-service.service'
import { Router } from '@angular/router';
import { ImagenToBackend } from '../home/clases/imagenGuardada';
import{imagenEscena}from '../home/clases/imagenEscena';

@Component({
  selector: 'app-visor-de-escenas',
  templateUrl: './visor-de-escenas.page.html',
  styleUrls: ['./visor-de-escenas.page.scss'],
})
export class VisorDeEscenasPage implements OnInit {

  constructor(private router: Router, private dBservice: DbServiceService) { }

  listaEscenasVisor: any[] = [];
  listaEscenasVisor2: any[] = [];
  recursoCargadoPregunta: any = false;
  recursoCargado: any;
  x:number;
  espiando: boolean;


   async ngOnInit() {
    /*console.log("lets go")
    await this.obtengoImagenesEscenas();

    await this.traeImagenesRecursoLibro();

    console.log(this.listaEscenasVisor);
    */
  }

  async ionViewWillEnter()
  {
    if(localStorage.getItem("espiando")=="true") this.espiando=true;
    else this.espiando=false;

    console.log("lets go")
  await this.obtengoImagenesEscenas();

  await this.traeImagenesRecursoLibro();

  console.log(this.listaEscenasVisor);


  }



  async obtengoImagenesEscenas()
{

 /*this.dBservice.obtenerImagenesEscena(localStorage.getItem("contenedor"))
  .subscribe((res) => {
    console.log(res);
    this.listaEscenasVisor=res;
    console.log(this.listaEscenasVisor);
  
  
  }, (err) => {
    console.log("ERROR")

  })*/

  this.listaEscenasVisor = await this.dBservice.obtenerImagenesEscena(localStorage.getItem("contenedor")).toPromise();
  
  console.log("llegado");
  console.log(this.listaEscenasVisor);

  
  


}


traeImagenesRecursoLibro(){
  

  this.listaEscenasVisor2 = [];


  this.recursoCargadoPregunta = true;
  console.log('This');
 // this.recursoCargado = this.listaRecursos.filter (recuro => recuro.id === Number(this.recursoId))[0];
console.log('id: ')
//console.log(this.listaEscenasVisor[1].name);

// this.recursoCargado = this.listaEscenasVisor.filter (recuro => recuro.id === this.listaEscenasVisor[0].id)[0];


 
  //console.log(this.listaEscenasVisor);
  //console.log(this.recursoCargado);

 // this.listaEscenasVisor
  this.listaEscenasVisor.forEach(async element => {
    
   /* this.dBservice.getEscenasDeRecurso(localStorage.getItem("contenedor"), element.name)
    .subscribe((res)=>{
      
      const blob = new Blob([res.blob()], { type: 'image/png' });
      const reader = new FileReader();

      reader.addEventListener('load', () => {

        var foto = null;
        foto = reader.result.toString();
        var fotoProps = new ImagenToBackend();
        fotoProps.url = foto;
        

        fotoProps.nombre = element.name



        this.listaEscenasVisor2.push(fotoProps);

      });

      if (blob) {
        reader.readAsDataURL(blob);
      }


    }, (err)=>{

      console.log(err);
    }) */

    let res = await this.dBservice.getEscenasDeRecurso(localStorage.getItem("contenedor"), element.name).toPromise()

    const blob = new Blob([res.blob()], { type: 'image/png' });
      const reader = new FileReader();

      reader.addEventListener('load',  () => {

        var foto = null;
        foto = reader.result.toString();
        var fotoProps = new ImagenToBackend();
        fotoProps.url = foto;
        

        fotoProps.nombre = element.name



        this.listaEscenasVisor2.push(fotoProps);

      });

      if (blob) {
        reader.readAsDataURL(blob);
      }



  });

  console.log(this.listaEscenasVisor2);
  console.log('end')

}

async eliminarEscena(nombre:string, i:number)
{
  console.log(nombre);

  if(nombre)
  {
    await this.dBservice.BorraImagenEscena(localStorage.getItem("contenedor"),nombre).toPromise();
    this.listaEscenasVisor2.splice(i,1);
    let res = nombre.split(".", 1);
    await this.dBservice.BorrarFramesDeEscena(res).toPromise();
    await this.dBservice.BorrarEscena(res).toPromise();
    
    console.log("hola")
    //this.router.navigate(['/visor-de-escenas']);
    

  }
  else console.log("no hay foto")
  //this.dBservice.BorraImagenEscena(localStorage.getItem("contenedero"),)




}



delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}



  AtrasEspia(){

    this.router.navigate(['/cuentos-a-espiar']);

  }

  Atras()
  {
    this.router.navigate(['/menu-libro']);

  }

}
