import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SidenavService } from '../../../services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit{
  private username: string;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private userService: UserService, private router: Router, private sidenavService: SidenavService) {}


  ngOnInit(): void {
    const username = this.userService.getUser();
    if (username) {
      this.username = username;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
