import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit{
    public registrationForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        governorate: ['', Validators.required],
        cin: ['', Validators.required],
        job: ['', Validators.required],
        monthlyIncome: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private loginService: LoginService,private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {}

    RegisterCustomer() {
        let values = this.registrationForm.value
        console.log("infor", values)

        if (this.registrationForm.valid) {
            this.loginService.registrationCustomer(values).subscribe(data => {
                this.router.navigate(['login' ]);
            });
        }
    }


    /* public onSubmit(values:Object):void {
        if (this.form.valid) {
            console.log(values);
            this.router.navigate(['/login']);
        }
    }*/

    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }
}



export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
