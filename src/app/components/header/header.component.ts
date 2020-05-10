import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { UserService } from '../../services/user.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string;
  constructor(public dialog: MatDialog, private sidenavService: SidenavService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.userService.getUser();
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
