import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;
  signupForm!: FormGroup;
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

  toggleParticlesClick(): void {
    console.log("particles clicked");

    this.particlesVisible = !this.particlesVisible;
  }

 
  public particlesLoaded(container: Container): void {
    console.log("loaded", container);
  }

  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private message: NzMessageService,
    private router: Router,
    private ngParticlesService: NgParticlesService

  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationVaidate]],

    })
    void this.ngParticlesService.init(async (engine: Engine) => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }

  confirmationVaidate=(control: FormControl):{[s: string]: boolean} => {
    if(!control.value){
      return{required:true};
    } else if(control.value !== this.signupForm.controls['password'].value){
      return {confirm:true , error:true};
    }

    return{};
  };

  register() {
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null){
        this.message.success("Signup Successful", {nzDuration: 5000});
        this.router.navigateByUrl("/login");
      } else {
        this.message.error("Something went wrong !", {nzDuration: 5000});
      }
    })
  }
}
