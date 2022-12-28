import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService) { }


  ngOnInit() {

  }

  login(): void {
    console.log(this.user)
    this.authService.login(this.user.username, this.user.password).subscribe((res:any) =>{
      console.log(res);
      localStorage.setItem('token', res.token);
    });
  }
}
