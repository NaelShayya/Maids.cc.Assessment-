import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userId!: number;

  

  // Inside the class:
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router // Inject the Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      this.getUserDetails(this.userId);
    });
  }

  getUserDetails(id: number) {
    this.dataService.getUserById(id).subscribe(
      data => {
        this.user = data.data; 
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/users']); 
  }
}
