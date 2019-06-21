import {Component, OnInit} from '@angular/core';
import {GlobalPlayersService} from '../global-players.service';
import {Player} from '../models/player.model';
import {PageView} from '../models/page-view.model';
import {PlayersPagination} from '../models/players-pagination.model';

@Component({
  selector: 'app-cs-go',
  templateUrl: './cs-go.component.html',
  styleUrls: ['./cs-go.component.scss']
})
export class CsGoComponent implements OnInit {

  players: Player[];
  pageView: PageView = {
    pageNumber: 1,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  };
  paginationArray: undefined[] = [];

  constructor(private globalPlayersService: GlobalPlayersService) {
    this.globalPlayersService.listen().subscribe((m: any) => {
      console.log(m);
      this.onFilterClick(m);
    });
  }

  onFilterClick(event: any) {
    console.log('Fire onFilterClick: ', event);
    this.loadPlayersList(1);
  }

  ngOnInit() {
    this.loadPlayersList(1);
    this.globalPlayersService.pushCurrentGame(2);
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

  loadList(): void {
    this.loadPlayersList(this.pageView.pageNumber);
  }

  private loadPlayersList(pageId: number): void {
    this.globalPlayersService.getPlayers(2, pageId)
      .subscribe(
        (data: PlayersPagination) => {
          this.players = data.players;
          this.pageView = data.pageViewModel;
          this.paginationArray.length = data.pageViewModel.totalPages;
          window.scroll(0, 0);
        }
      );
  }

}
