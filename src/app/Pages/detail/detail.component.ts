
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface EventData {
  eventname: string;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule , ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  eventId: string = ""; 
  event: string = "";
  eventForm: FormGroup; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
   
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => { 
      const id = params.get('id');
      if (id) {
        this.eventId = id; 
        this.getEventName(this.eventId); 
      } else {
        console.error('No event ID found in parameters');
      }
    });
  }

  getEventName(eventId: string): void {
    this.http.get<EventData>(`http://localhost:4000/api/events/name/${eventId}`).subscribe(
      (eventData) => {
        this.event = eventData.eventname; 
      },
      (error) => {
        console.error('Error fetching event data:', error);
        alert("Failed to load event data. Please try again.");
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = {
        ...this.eventForm.value,
        event: this.event 
      };

      this.http.post('http://localhost:4000/people/eventReg', formData).subscribe(
        response => {
          console.log('Registration successful', response);
          alert("Registration successful!");
          // Optionally, navigate to another page or show a success message
        },
        error => {
          console.error('Registration error', error);
          alert("Registration failed. Please try again.");
        }
      );
      console.log('Form Submitted!', formData);
     
    } else {
      console.log('Form is invalid');
    }
  }
}

























// import { Component ,OnInit, ChangeDetectorRef } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Router, ParamMap, ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-detail',
//   standalone: true,
//   imports: [RouterModule, FormsModule, CommonModule],
//   templateUrl: './detail.component.html',
//   styleUrl: './detail.component.css'
// })
// export class DetailComponent  implements OnInit  {
//   eventId: string = ""; 
//   eventname: string = "";

//   constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params: ParamMap) => { 
//       this.eventId = params.get('id')!; 
//       this.getEventName(this.eventId); 
//     });
//   }

//   getEventName(eventId: string): void {
//     this.http.get<any>(`http://localhost:4000/api/events/name/${eventId}`).subscribe(
//       (eventData) => {
//         this.eventname = eventData.eventname; 
//         this.cdr.detectChanges(); 
//       },
//       (error) => {
//         console.error('Error fetching event data:', error);
//         alert("Failed to load event data. Please try again.");
//       }
//     );
//   }
// }