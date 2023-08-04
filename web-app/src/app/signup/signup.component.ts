import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  formdata = {name:"",email:"",password:""};
  submit = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    //console.log(this.formdata);
    this.auth.signup(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log("Registered idToken is "+data.idToken);
        this.auth.canAuthenticate();
      }
    }).add(()=>{console.log("Register Completed")});
  }

}
