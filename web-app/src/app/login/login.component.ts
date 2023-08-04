import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit = false;

  constructor(private auth:AuthService,private http: HttpClient){

  }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){  
    //console.log(this.formdata);
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log("Logged user token is "+data.idToken);
        this.auth.canAuthenticate();
      }
    }).add(()=>{console.log("Login Completed");})

  }

}
