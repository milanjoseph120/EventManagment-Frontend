import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login() {
    let bodyData = {
      
      "email": this.email,
      "password": this.password,
    };

    // this.http.post("http://localhost:4000/people/login", bodyData).subscribe(
    //   (resultData: any) => {
    //     console.log(resultData);
    //     alert("User login Successfully");
    //     this.router.navigate(['/creation']); // Redirect to creation page
    //   },
    //   (error) => {
    //     console.error('login failed', error);
    //     alert("login failed. Please try again.");
    //   }
    // );
    this.http.post("http://localhost:4000/people/login", bodyData).subscribe(
      (resultData: any) => {
          
          console.log(resultData);
          alert("User logged in successfully");
          this.router.navigate(['/creation']); // Redirect to creation page
      },
      (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
              alert("Invalid email or password. Please try again.");
          } else {
              alert("Login failed. Please try again.");
          }
      }
  );
  
  }

  save() {
    this.login();
  }
}

