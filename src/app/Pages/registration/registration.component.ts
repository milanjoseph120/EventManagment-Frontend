import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] 
})
export class RegistrationComponent {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  register() {
    let bodyData = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "email": this.email,
      "password": this.password,
    };

    this.http.post("http://localhost:4000/people/create", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("User Registered Successfully");
        this.router.navigate(['']); 
      },
      (error) => {
        console.error('Registartion failed', error);
        if (error.status === 401) {
            alert("Invalid details. Please try again.");
        } else {
            alert("Registartion failed. Please try again.");
        }
    }
    );
  }

  save() {
    this.register();
  }
}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css'
// })
// export class RegistrationComponent {
//   firstname: string = "";
//   lastname: string = "";
//   email: string = "";
//   password: string = "";


//   constructor(private http: HttpClient) 
//   {
//   }
//   ngOnInit(): void
//   {
//   }
//   register()
//   {
//     let bodyData = 
//     {
//       "firstname" : this.firstname,
//       "lastname" : this.lastname,
//       "email" : this.email,
//       "password" : this.password,
//     };
//     this.http.post("http://localhost:4000/people/create",bodyData).subscribe((resultData: any)=>
//     {
//         console.log(resultData);
//         alert("User Registered Successfully")
//         this.router.navigate(['/login']);
//     });
//   }
//   save()
//   {
//     this.register();
//   }
// }

