import { Component, ElementRef, OnInit } from '@angular/core';
import { Subject, Observable  } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from '../app/data.service'; // Make sure the path is correct

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admindashboard';
  users: any[] = [];
  filteredUsers: any[] = [];
  private searchTerms = new Subject<string>();
  isLoading: Observable<boolean>;

  constructor(private el: ElementRef, private dataService: DataService) {
    this.isLoading = this.dataService.loading.asObservable();
  }
  
  ngOnInit(): void {

    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    console.log(alldrpdwn,'alldrpdwn#');
    alldrpdwn.forEach((item:any)=>{
      const a = item.parentElement?.querySelector('a:first-child');
      console.log(a,'a#');
      a.addEventListener('click',(e:any)=>{
          e.preventDefault();
          this.el.nativeElement.classList.toggle('active');
          item.classList.toggle('show');
      });
      
    });
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => this.onSearch(term));
  
    ; // Load users initially
  }


  // responsivemenu 
  responsiveMenu:any;
  // responsivemaincontent
  responsiveContent:any;
  defaultStatus=true;
  openNav(status:any)
  {
    if(status===this.defaultStatus)
    {
      this.responsiveMenu = {
        'display':'block'
      }
      this.responsiveContent={
        'margin-left':'150px'
      }
      this.defaultStatus = false;
    }else
    {
      this.responsiveMenu = {
        'display':null
      }
      this.responsiveContent={
        'margin-left':null
      }
      this.defaultStatus=true;
    }
    
 
  }

  getUsers() {
    this.dataService.getUsers().subscribe(
      data => {
        this.users = data.data; // Adjust based on your actual API response
        this.filteredUsers = this.users;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  search(event: any): void {
    this.searchTerms.next(event.target.value);
  }
  
  
onSearch(term: string): void {
  if (!term.trim()) {
    // If no search term, display all users
    this.filteredUsers = this.users;
    return;
  }
  this.filteredUsers = this.users.filter(user =>
    user.id.toString() === term.trim() // Ensure this matches how you're searching
  );
}

  }



