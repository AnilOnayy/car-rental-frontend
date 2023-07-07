import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{

  isLoggedIn :Boolean ;

  firstName :string;
  lastName:string;


  constructor(
    private authService : AuthService
  ) {

  }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    let json = this.authService.getAuthInfo();

    if(json!="" && json !=null)
    {
      this.firstName = json["firstName"];
      this.lastName = json["lastName"];
    }

  }

  logout()
  {
    this.authService.logout();
    window.location.reload();
  }

}
