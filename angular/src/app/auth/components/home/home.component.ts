import { Component } from '@angular/core';
// import { MoveDirection, ClickMode, HoverMode, OutMode } from "@tsparticles/engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";
import { NgParticlesService } from "@tsparticles/angular";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  // title = "angular";
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

  constructor(private ngParticlesService: NgParticlesService) {
  }

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }

  public particlesLoaded(container: Container): void {
    console.log("loaded", container);
  }
}
