import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

  private apiUrl = 'http://172.26.203.78:8080/api'; // Reemplaza con la URL de tu API.

  private userRole: string;
  private nombre: string;
  private apellido: string
  private tokensesion: string;
  

  constructor(private http: HttpClient) {
    this.userRole = '';
    this.nombre = '';
    this.apellido = '';
    this.tokensesion = '';
  }

  // Método para enviar una solicitud POST de autenticación a la API.
  login(usuario: string, passwd: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', usuario)
      .set('password', passwd);

    console.log(body.toString);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers: headers }).pipe(
      map((response: any) => {
        this.userRole = response[0].rol;
        this.nombre = response[0].nombre;
        this.apellido = response[0].apellido;
        this.tokensesion = response[0].token;
        return response;
      })
    );
  }

  logout(tokensession: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('token', tokensession);

    console.log(body.toString);

    return this.http.post(`${this.apiUrl}/logout`, body.toString(), { headers: headers });
  }

  getUserRole(): string {
    return this.userRole;
  }

  getNombre(): string {
    return this.nombre;
  }

  getApellido(): string {
    return this.apellido;
  }

  getToken(): string {
    return this.tokensesion;
  }


  // Método para verificar si el usuario está autenticado.
  isLoggedIn(tokensession: string): Observable<boolean> {
  const checkdata = {
    token: tokensession
  };

  return this.http.post(`${this.apiUrl}/checksesion`, checkdata).pipe(
    map((response: any) => {
      if (response && response[0].estado === 'ACTIVO') {
        return true; // El estado es ACTIVO, retorna true.
      } else {
        return false; // El estado no es ACTIVO o la respuesta está vacía, retorna false.
      }
    })
  );
}

  // Puedes agregar métodos adicionales aquí, como cerrar sesión o verificar el estado de la autenticación.
}