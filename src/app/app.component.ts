import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InfoService} from './services/info.service';
import {IsUserService} from './services/is-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'wtp-ui';
  isUser: boolean;

  constructor(
    private router: Router,
    private infoService: InfoService,
    private isUserSvc: IsUserService
  ) {
  }

  navigateToPlayers(): void {
    const selectedGame = this.infoService.getSelectedGame();

    switch (selectedGame.id) {
      case 1:
        this.router.navigate(['/players/dota']);
        break;
      case 2:
        this.router.navigate(['/players/cs-go']);
        break;
      case 3:
        this.router.navigate(['/players/gta']);
        break;
    }
  }

  navigateToTeams(): void {
    const selectedGame = this.infoService.getSelectedGame();

    switch (selectedGame.id) {
      case 1:
        this.router.navigate(['/teams/dota']);
        break;
      case 2:
        this.router.navigate(['/teams/cs-go']);
        break;
      case 3:
        this.router.navigate(['/teams/gta']);
        break;
    }
  }

  ngOnInit(): void {
    this.isUserSvc.getValue().subscribe(
      val => {
        this.isUser = val;
      }
    );
  }
}
