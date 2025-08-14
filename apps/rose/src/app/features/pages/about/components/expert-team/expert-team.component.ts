import { Component } from '@angular/core';

@Component({
  selector: 'app-expert-team',
  imports: [],
  templateUrl: './expert-team.component.html',
  styleUrl: './expert-team.component.scss'
})
export class ExpertTeamComponent {
 expertArr=[
  {
    name:"Ahmed Mohamed",
    role:"Senior Manager",
    image:"images/abouts/expertTeam.jpg",

  },
  {
    name:"Ahmed Mohamed",
    role:"Senior Manager",
    image:"images/abouts/expertTeam2.jpg",

  },
  {
    name:"Ahmed Mohamed",
    role:"Senior Manager",
    image:"images/abouts/expetTeam3.jpg",

  },
  {
    name:"Ahmed Mohamed",
    role:"Senior Manager",
    image:"images/abouts/expertTeam4.jpg",

  },
 ];
}
