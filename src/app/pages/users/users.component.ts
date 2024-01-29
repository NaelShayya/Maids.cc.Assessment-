import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  currentPage: number = 1;

  constructor(private dataService: DataService, private router: Router) { }


  ngOnInit() {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number) {
    this.dataService.getUsers(page).subscribe(
      data => {
        this.users = data.data;
        this.currentPage = data.page; // Update current page
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers(this.currentPage);
    }
  }

  onNext() {
    this.currentPage++;
    this.getUsers(this.currentPage);
  }
  viewDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
  
}
