import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  id = "tsparticles";
  fire =10;
  particlesVisible = true;
  // particlesOptions: ISourceOptions = configs.basic;
  particlesOptions= {
    particles: {
      number: {
        value: 100
      },
      color: {
        value: "#b90424"
      },
      links: {
        enable: true,
        distance: 150,
        color:'#b90424'
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.4
      },
      size: {
        value: {
          min: 3,
          max: 5
        }
      },
      move: {
        enable: true,
        speed: 3
      }
    },
  }

 
 
  public particlesLoaded(container: Container): void {
    console.log("loaded", container);
  }
  isSpinning:boolean = false;
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private message: NzMessageService,
    private ngParticlesService: NgParticlesService
  ){}

  ngOnInit(){
    this.loginForm =  this.fb.group({
      email:[null, [Validators.email, Validators.required]],
      password:[null, [Validators.required]]
    })

    void this.ngParticlesService.init(async (engine: Engine) => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole,
          name: res.name,
          phone: res.phone,
          email: this.loginForm.value.email
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/dashboard");
        } else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");
        } else{
          this.message.error("Bad Credentials",{nzDuration:5000});
        }
      }
    })
  }



}
