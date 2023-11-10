// alumno-role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiauthService } from '../services/apiauth.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnoRoleGuard implements CanActivate {
  constructor(private authService: ApiauthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokensession = next.queryParams['tokensession'];
    if (this.authService.isLoggedIn(tokensession) && this.authService.getUserRole() === 'Alumno') {
      return true; // El usuario es un alumno, permite la navegación.
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a una página de error o a donde desees.
      return false; // El usuario no es un alumno, deniega la navegación.
    }
  }
}
