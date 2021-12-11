import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Sawo from "sawo";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sawo-auth';
  userPayload: any = {};
  Sawo: any;
  userData: Object | boolean = false;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.sawoLogin()

  }

  sawoLogin(): void {
    const sawoConfig = {
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      apiKey: environment.sawoApiKey,
      onSuccess: (payload: any) => {
        this.userPayload = payload;
        const userData = {
          provider_id: this.userPayload.user_id,
          provider_type: "SAWO",
          email: this.userPayload.identifier,
        }
        this.http.post<any>(`${environment.api_url}/login`, userData).subscribe(res => {
          localStorage.setItem("JwtToken", res.data.token);
          this.userData = res.data;
        })

      }
    };
    this.Sawo = new Sawo(sawoConfig);
    this.Sawo.showForm();

  }
}
