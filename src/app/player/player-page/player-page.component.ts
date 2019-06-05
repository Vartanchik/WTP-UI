import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  constructor() { }

  isAvailable: true;

  player: Player = {
    id: 0,
    name: 'playerName',
    game: '',
    server: 'playerServer',
    goal: 'playerGoal',
    about: 'PlayerAbout',
    rank: 'playerRank',
    decency: 1
  };

  // id
  // name
  // server
  // goal
  // rank
  // decency
  // about
  playerPhoto: 'https://pbs.twimg.com/profile_images/900338165113815045/aA0Wx0uR_400x400.jpg';
  age: 18;
  languages: ['playerlanguage1', 'playerlanguage2'];
  country: 'playerCountry';
  teamId: 1;
  teamName: 'teamName';
  teamPhoto: 'http://localhost:5000/api/Team/Logo/12e4ead2-d52f-4d7f-b796-4b524026fc64';


  ngOnInit() {
    this.playerPhoto = 'https://pbs.twimg.com/profile_images/900338165113815045/aA0Wx0uR_400x400.jpg';
    this.age = 18;
    this.languages = ['playerlanguage1', 'playerlanguage2'];
    this.country = 'playerCountry';
    this.teamId = 1;
    this.teamName = 'teamName';
    this.teamPhoto = 'http://localhost:5000/api/Team/Logo/12e4ead2-d52f-4d7f-b796-4b524026fc64';

  }

}
