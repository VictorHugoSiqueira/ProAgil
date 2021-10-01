import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getBsVer } from 'ngx-bootstrap/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(public fb: FormBuilder,
              private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
  
      });
    }

  cadastrarUsuario(){
    console.log('cadastrar usuario');
  }
}
