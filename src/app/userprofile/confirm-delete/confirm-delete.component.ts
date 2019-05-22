import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../../services/account.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CommunicationService} from '../../services/communication.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public modal: NgbActiveModal,
              private svc: AccountService,
              private toastr: ToastrService,
              private router: Router,
              private comm: CommunicationService) { }

  ngOnInit() {
  }

  purge() {
    this.svc.deleteAccount().subscribe(
      res => {
        this.modal.close(res.info);
        this.svc.removeAuthInfo();
        this.comm.setLoginValue(false);
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error("Something went wrong, try again!");
      }
    );
  }

}
