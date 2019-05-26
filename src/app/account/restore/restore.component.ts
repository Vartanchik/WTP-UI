import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  private email: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accSvc: AccountService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.email = queryParams.get('email');
    });
  }

  restore() {
    this.accSvc.restoreAccount(this.email).subscribe(
      res => {
        this.router.navigateByUrl('/home');
      }
    );
  }

}
