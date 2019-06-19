import { Component, OnInit } from '@angular/core';
import { PageView } from '../models/page-view.model';
import { Team } from '../models/team.model';
import { GlobalTeamsService } from '../global-teams.service';
import { TeamsPagination } from '../models/team-pagination.model';

@Component({
  selector: 'app-gta',
  templateUrl: './gta.component.html',
  styleUrls: ['./gta.component.scss']
})
export class GtaTeamsComponent implements OnInit {

  teams: Team[];
  pageView: PageView = {
    pageNumber: 1,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  };
  paginationArray: undefined[] = [];

  constructor(private teamService: GlobalTeamsService){
    this.teamService.listen().subscribe((m:any) => {
        console.log(m);
        this.onFilterClick(m);
    })
  }

  onFilterClick(event: any) {
    console.log('Fire onFilterClick: ', event);
    this.loadPlayersList(1);
  }

  ngOnInit() {
    this.loadPlayersList(1);
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
    this.teamService.getPlayers(3, pageId)
    .subscribe(
      (data: TeamsPagination) => {
        this.teams = data.teams;
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
