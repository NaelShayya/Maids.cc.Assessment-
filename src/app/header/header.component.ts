import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  isLoading: boolean = false;
  users: User[] = [
    // Example data
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: 'path/to/avatar.jpg' }
  ];
  filteredUsers: User[] = [];
  username: string = 'User Name';

  constructor(private http: HttpClient, private router: Router) {}

  openNav(open: boolean) {
    this.toggleSidenav.emit(open);
  }

  search(event: any) {
    const query = event.target.value;
    if (query) {
      this.isLoading = true;
      this.http.get<any>(`https://reqres.in/api/users/${query}`).subscribe(response => {
        this.isLoading = false;
        if (response && response.data) {
          this.filteredUsers = [response.data];
        } else {
          this.filteredUsers = [];
        }
      }, error => {
        this.isLoading = false;
        console.error('Error fetching user', error);
        this.filteredUsers = [];
      });
    } else {
      this.filteredUsers = [];
    }
  }

  viewDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
