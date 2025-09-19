import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-expert-team",
  imports: [NgOptimizedImage],
  templateUrl: "./expert-team.component.html",
  styleUrl: "./expert-team.component.scss",
})
export class ExpertTeamComponent {
  expertArr = [
    {
      name: "Ahmed Mohamed",
      role: "Senior Manager",
      image: "images/abouts/expertTeam.AVIF",
    },
    {
      name: "Ahmed Mohamed",
      role: "Senior Manager",
      image: "images/abouts/expertTeam2.AVIF",
    },
    {
      name: "Ahmed Mohamed",
      role: "Senior Manager",
      image: "images/abouts/expetTeam3.AVIF",
    },
    {
      name: "Ahmed Mohamed",
      role: "Senior Manager",
      image: "images/abouts/expertTeam4.AVIF",
    },
  ];
}
