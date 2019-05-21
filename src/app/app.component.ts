import { Component } from '@angular/core';
import { InfoService } from './services/info.service';
import { IdItem } from './interfaces/id-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private service: InfoService) {}

  title = 'wtp-ui';
  games: Array<IdItem>;
  
  ngOnInit() {
    this.service.getAllGames().subscribe(
      res => {
        this.games = res;
      }
    )

  }
}
