import { Component, OnInit } from '@angular/core';
import { GlobalPlayersService } from '../global-players.service';
import { Player } from '../models/player.model';
import { PageView } from '../models/page-view.model';
import { PlayersPagination } from '../models/players-pagination.model';

@Component({
  selector: 'app-dota',
  templateUrl: './dota.component.html',
  styleUrls: ['./dota.component.scss']
})

export class DotaComponent implements OnInit {

  players: Player[];
  pageView: PageView = {
    pageNumber: 1,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  };
  paginationArray: undefined[] = [];

  constructor(
    private globalPlayersService: GlobalPlayersService
  ) { }

  ngOnInit() {
    this.loadPlayersList(1);
    this.globalPlayersService.pushCurrentGame(1);
  }

  switchPage(pageId: number): void {
    this.loadPlayersList(pageId);
  }

  loadPreviousPage(): void {
    this.loadPlayersList(this.pageView.pageNumber - 1);
  }

  loadNextPage(): void {
    this.loadPlayersList(this.pageView.pageNumber + 1);
  }

  private loadPlayersList(pageId: number): void{
    this.globalPlayersService.getPlayers(1, pageId)
    .subscribe(
      (data: PlayersPagination) => {
        this.players = data.players;
        this.pageView = data.pageViewModel;
        this.paginationArray.length = data.pageViewModel.totalPages;
        window.scroll(0,0);
      }
    )
  }

  loadList(): void {
    this.loadPlayersList(this.pageView.pageNumber);
  }

}
