import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup, PatternValidator, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserprofileService} from '../services/userprofile.service';
import {IMyDpOptions} from 'mydatepicker';
import {
  dropdownListLanguagesConfig,
  dropdownSettingsLanguagesConfig,
  dropdownListGendersConfig,
  dropdownSettingsGendersConfig,
  dropdownListCountriesConfig,
  dropdownSettingsCountriesConfig,
  dateFormatConfig
} from '../services/dataconfig';
import {User} from '../interfaces/user';
import {IdItem} from '../interfaces/id-item';
import {CommunicationService} from '../services/communication.service';
import {flatMap} from 'rxjs/operators';
import {AccountService} from '../services/account.service';
import {NgbModal, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDeleteComponent} from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  providers: [NgbTabsetConfig],
})
export class UserProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: UserprofileService,
    private router: Router,
    private toastr: ToastrService,
    private svc: CommunicationService,
    private accsvc: AccountService,
    config: NgbTabsetConfig,
    private _modalService: NgbModal) {
    config.justify = 'center';
  }

  private isValid: boolean = true;

  private userProfile: User = {
    id: 0,
    userName: '',
    email: '',
    photo: '',
    gender: {id: 0, name: ''},
    dateOfBirth: '',
    country: {id: 0, name: ''},
    steam: '',
    languages: [{id: 0, name: ''}],
    players: [],
    teams: []
  };
  public model: any = 'Choose date of birth';

  //Initialized to specific date.
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: dateFormatConfig
  };

  //Multiselect-dropdown - Country
  dropdownListLanguages = [];
  selectedItemsLanguages: IdItem[] = null;
  dropdownSettingsLanguages = {};

  //Multiselect-dropdown - Gender
  dropdownListGenders = [];
  selectedItemGender: IdItem[] = null;
  dropdownSettingsGenders = {};

  //Multiselect-dropdown - Language 
  dropdownListCountries = [];
  selectedItemCountry: IdItem[] = null;
  dropdownSettingsCountries = {};

  ngOnInit() {
    if (!this.service.checkExistenceToken()) {
      this.router.navigate(['/home']);
    } else {
      this.isValid = false;

      this.service.getUserProfile().subscribe(
        (res: User) => {
          this.userProfile = res;
          this.setCurrentUserInfo();
        },
        err => {
          this.toastr.error(err.error.message);
        },
      );
    }

    this.initializeDefaultConfig();
  }

  //Validation rules - userProfile form
  formModelUser = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    languages: ['', Validators.required],
    country: ['', Validators.required],
    steam: ['']
  });

  //Send data from userProfile-form to API and process response
  onSubmit() {
    this.service.updateUserProfile(this.userProfile.id, this.formModelUser.value)
      .pipe(
        flatMap(res => {
          this.toastr.success(res.info, res.message);
          return this.service.getUserProfile();
        })
      )
      .subscribe(
        res => {
          if (res.hasOwnProperty('photo')) {
            this.userProfile = res as User;
            this.setCurrentUserInfo();
          }
        },
        err => {
          this.toastr.error(err.error.info, err.error.message);
        }
      );
  }

  // Update user photo
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.service.sendFile(formData).subscribe(
        res => {
          this.userProfile.photo = res.info;
          localStorage.setItem('photo', res.info);
        },
        err => {
          this.toastr.error(err.error.message);
        }
      );
    }
  }

  private initializeDefaultConfig() {
    this.dropdownListLanguages = dropdownListLanguagesConfig;
    this.dropdownSettingsLanguages = dropdownSettingsLanguagesConfig;

    this.dropdownListGenders = dropdownListGendersConfig;
    this.dropdownSettingsGenders = dropdownSettingsGendersConfig;

    this.dropdownListCountries = dropdownListCountriesConfig;
    this.dropdownSettingsCountries = dropdownSettingsCountriesConfig;
  }

  performDelete() {
    this._modalService.open(ConfirmDeleteComponent);
  }

  private setCurrentUserInfo() {
    this.accsvc.setItem('userName', this.userProfile.userName);
    this.accsvc.setItem('photo', this.userProfile.photo);

    this.selectedItemGender = [(this.userProfile.gender)];
    this.selectedItemCountry = [(this.userProfile.country)];

    if (this.userProfile.dateOfBirth != null) {
      this.model = this.userProfile.dateOfBirth.substr(0, 10);
    }

    this.selectedItemsLanguages = this.userProfile.languages;
  }

}
