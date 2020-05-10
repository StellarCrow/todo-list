import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public username = 'Username';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const username = this.userService.getUser();
    if (username) {
      this.username = username;
    }
  }

  public onSubmit(event: CustomEvent): void {
    event.preventDefault();
    const username = this.username.toLowerCase();
    this.userService.setUser(username);
    this.router.navigate(['/todos']);
  }
}
