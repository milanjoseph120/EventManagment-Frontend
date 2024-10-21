
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editsevent',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './editsevent.component.html',
  styleUrls: ['./editsevent.component.css'] 
})
export class EditseventComponent implements OnInit {
  eventId: string = ""; 
  eventname: string = "";
  eventdate: string = "";
  eventtime: string = "";
  eventlocation: string = "";
  eventdescription: string = "";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => { 
      this.eventId = params.get('id')!; 
      this.getEventData(this.eventId); 
    });
  }

  getEventData(eventId: string): void {
    this.http.get<any>(`http://localhost:4000/api/events/${eventId}`).subscribe(
      (eventData) => {
        this.eventname = eventData.eventname;
        const eventDate = new Date(eventData.eventdate);
        
        if (!isNaN(eventDate.getTime())) {
          this.eventdate = eventDate.toISOString().split('T')[0]; // Format to 'yyyy-MM-dd'
        } else {
          console.warn('Invalid date received, setting to empty string');
          this.eventdate = ''; 
        }

        this.eventtime = eventData.eventtime;
        this.eventlocation = eventData.eventlocation;
        this.eventdescription = eventData.eventdescription;
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching event data:', error);
        alert("Failed to load event data. Please try again.");
      }
    );
  }

  
 

    onSubmit(): void {
      const updatedEvent = {
        eventname: this.eventname,
        eventdate: this.eventdate,
        eventtime: this.eventtime,
        eventlocation: this.eventlocation,
        eventdescription: this.eventdescription,
      };
    
      this.http.put(`http://localhost:4000/api/events/${this.eventId}`, updatedEvent)
        .subscribe(
          () => {
            console.log("Event updated successfully!");
            alert("Event updated successfully!"); 
            this.router.navigate(['/events']); 
          },
          (error) => {
            console.error('Error updating event:', error);
            alert("Failed to update event. Please try again."); 
          }
        );
    }
    
}




//updateEvent(): void {
  //     const updatedData = {
  //       eventname: this.eventname,
  //       eventdate: this.eventdate,
  //       eventtime: this.eventtime,
  //       eventlocation: this.eventlocation,
  //       eventdescription: this.eventdescription,
  //     };
  //   // Method to update an event
  //   updateEvent(eventId: string, updatedData: any): void {
  //     this.http.put(`http://localhost:4000/api/events/${eventId}`, updatedData).subscribe( // Use eventId here
  //       (response) => {
  //         console.log('Event updated successfully:', response);
  //         this.getEvents(); // Refresh the event list after update
  //       },
  //       (error) => {
  //         console.error('Error updating event:', error);
  //         alert("Failed to update event. Please try again.");
  //       }
  //     );
  //   }
  
   
  //   onEdit(event: any): void {
     
  //     this.eventId = event.id; 
  //     this.eventname = event.eventname;
  //     this.eventdate = event.eventdate;
  //     this.eventtime = event.eventtime;
  //     this.eventlocation = event.eventlocation;
  //     this.eventdescription = event.eventdescription;
  
      
  //     const updatedData = {
  //       eventname: this.eventname,
  //       eventdate: this.eventdate,
  //       eventtime: this.eventtime,
  //       eventlocation: this.eventlocation,
  //       eventdescription: this.eventdescription,
  //     };
  
  //     this.updateEvent(this.eventId, updatedData);
   