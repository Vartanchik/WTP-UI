import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEventArgs, Grid } from '@syncfusion/ej2-grids';
import { data } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { PageSettings } from '@syncfusion/ej2-grids/src/grid/models/page-settings';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-admin-test-list',
  template: `<ejs-grid #grid id='PagingGrid' [dataSource]='data' (actionComplete)='actionHandler($event)' (actionBegin)='actionHandler($event)' (change)='change($event)'
               [allowSorting]='true' [allowPaging]='true'>
                <e-columns>
                    <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=120></e-column>
                    <e-column field='CustomerID' headerText='Customer ID' width=150></e-column>
                    <e-column field='ShipCity' headerText='Ship City' width=150></e-column>
                    <e-column field='ShipName' headerText='Ship Name' width=150></e-column>
                </e-columns>
                </ejs-grid>`
})
export class AdminTestListComponent implements OnInit {

    public data: object[];
    @ViewChild('grid') public Grid: GridComponent;
    
    ngOnInit(): void {
        this.data = data;
    }

    actionHandler(args: SortEventArgs) {
        alert(args.requestType + ' ' + args.type + '//'+
        args.columnName + ' ' +args.direction ); // custom Action
    }

//     load() {
//       console.log("page was changed");
//   const rowHeight: number = this.Grid.getRowHeight();  // height of the each row
//         const gridHeight: any = this.Grid.height;  // grid height
//         const pageSize: number = this.Grid.pageSettings.pageSize;   // initial page size
//         const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
//         this.Grid.pageSettings.pageSize = 1;//pageSize + Math.round(pageResize);
// }
    change(args: ChangeEventArgs) {
      console.log(args);
  }
}