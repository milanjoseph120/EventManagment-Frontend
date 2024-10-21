import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  events: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEvents(); 
  }

 
  getEvents(): void {
    this.http.get<any[]>("http://localhost:4000/api/events").subscribe(
      (resultData) => {
        this.events = resultData; 
        console.log('Fetched events:', this.events);
      },
      (error) => {
        console.error('Error fetching events:', error);
        alert("Failed to load events. Please try again.");
      }
    );
  }

  // Method to delete events 
  deleteEvent(eventId: string): void {
    
    this.http.delete(`http://localhost:4000/api/events/${eventId}`).subscribe(
        () => {
           
            this.events = this.events.filter(event => event._id !== eventId);
            console.log('Event deleted successfully');
            alert('Event deleted successfully'); 
        },
        (error) => {
            console.error('Error deleting event:', error);
            alert('Failed to delete event. Please try again.');
        }
    );
}


}
