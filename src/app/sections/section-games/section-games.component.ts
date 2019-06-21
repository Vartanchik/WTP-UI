import {Component, OnInit} from '@angular/core';


class Game {
  constructor(
    public id: number = 0,
    public name: string = '',
    public playersCount: number = 0,
    public description: string = ''
  ) {
  }
}

@Component({
  selector: 'app-section-games',
  templateUrl: './section-games.component.html',
  styleUrls: ['./section-games.component.scss']
})
export class SectionGamesComponent implements OnInit {

  // It maintains list of Games
  Games: Game[] = [];
  // It maintains Game Model
  gameModel: Game;
  // It maintains Game form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;

  constructor() {
    // Add default Game data.
    this.Games.push(new Game(1, 'Cs Go', 500000, 'Shooter'));
    this.Games.push(new Game(2, 'Dota', 1500000, 'MMO'));
    this.Games.push(new Game(3, 'PUBG', 1000000, 'Battle Royale'));
  }

  ngOnInit() {
  }

  // This method associate to New Button.
  onNew() {
    // Initiate new Game.
    this.gameModel = new Game(this.Games.length + 1);
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display Game entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push Game model object into Game list.
      this.Games.push(this.gameModel);
    } else {
      // Update the existing properties values based on model.
      this.Games[this.selectedRow].id = this.gameModel.id;
      this.Games[this.selectedRow].name = this.gameModel.name;
      this.Games[this.selectedRow].playersCount = this.gameModel.playersCount;
      this.Games[this.selectedRow].description = this.gameModel.description;
    }
    // Hide Game entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new Game.
    this.gameModel = new Game();
    // Retrieve selected Game from list and assign to model.
    this.gameModel = Object.assign({}, this.Games[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display Game entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding Game entry from the list.
    this.Games.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide Game entry section.
    this.showNew = false;
  }
}
