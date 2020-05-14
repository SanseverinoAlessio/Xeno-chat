import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { ChatService } from '../chat.service';
@Component({
selector: 'app-logout',
templateUrl: './logout.component.html',
styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
constructor(private user:UserService, private router:Router, private chatservice:ChatService) {
}
ngOnInit() {
this.user.logout().subscribe(e=>{
this.router.navigate(['home']);
});


}
}
