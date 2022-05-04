import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { EmailValidators } from "ngx-validators";
import { LoginService } from "./login.service";
import jwt_decode from "jwt-decode";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public authForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });
  token: string;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  ngOnInit(): void {}

  OnSubmit() {
    let values = this.authForm.value;
    console.log("infor", values);

    if (this.authForm.valid) {
      this.loginService.login(values).subscribe(
        (data) => {
          /*Cas de succes*/
          this.token = data.body;
          localStorage.setItem("token", "Bearer " + this.token);
          /*A chaque fois on besoin du token */
          localStorage.getItem("token");
          const tokenInfo = this.getDecodedAccessToken(this.token);
          console.log("tokenInfo", tokenInfo);
          localStorage.setItem("role", tokenInfo.roles[0].authority);
          localStorage.setItem("mail", tokenInfo.sub);
          console.log(tokenInfo);

          if (tokenInfo.roles[0].authority === "Employee")
            this.router.navigate(["customers"]);
          else if (tokenInfo.roles[0].authority === "Customer") {
            this.router.navigate(["profile/projects"]);
          }
          console.log(this.token);
          console.log(data);
        },
        (error) => {
          console.log(error); /*Notication d'errur*/
        }
      );
    }
  }
}
