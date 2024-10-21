import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css',
  
})
export class CreationComponent {
eventname : string = "";
eventdate: string = ""; 
eventtime: string = "";
eventlocation: string = "";
eventdescription: string = "";


constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  registerevent() {
    let bodyData = {
      "eventname": this.eventname,
      eventdate: this.eventdate ? new Date(this.eventdate).toISOString() : null,
      "eventtime": this.eventtime,
      "eventlocation": this.eventlocation,
      "eventdescription": this.eventdescription
    };

    this.http.post("http://localhost:4000/people/createEvent", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("EVENT Registered Successfully");
        this.router.navigate(['/list']); // Redirect to login page
      },
      (error) => {
        console.error('Event Registration failed', error);
        alert("Event Registration failed. Please try again.");
      }
    );
  }

  save() {
    this.registerevent();
  }

}
