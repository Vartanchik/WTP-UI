import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParam  => {
      if (queryParam.get('confirmed') === 'true') {
        this.toastr.success('Your e-mail was confirmed!', 'Success!');
      }
      else if (queryParam.get('confirmed') === 'false'){
        this.toastr.success('Something went wrong!', 'Error!');
      }
    });
  }
}
