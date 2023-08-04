import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

class output {
  static isout = false;
  static show() {
    return output.isout;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  file : any;
  period = '';
  count = '';

  constructor(private auth: AuthService, private service:AuthService) { }

  ngOnInit(): void {
      this.auth.canAccess();
  }

  getFile(){
    var f = <HTMLInputElement>(document.getElementById("formFile"));
    if(f.files)
    {
      this.file = f.files[0];
    }
  }

  send() {
    var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://127.0.0.1:5000/dashboard');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('Data sent successfully!');
        }
      };
      var formData = new FormData();
      formData.append('period', this.period);
      formData.append('count', this.count);
      formData.append('file', this.file);
      xhr.send(formData);
      xhr.onload=function(){
        output.isout=true;
      }
    }

    visible() {
      return output.show();
    }



}
