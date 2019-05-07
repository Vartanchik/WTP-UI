import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserprofileService } from '../services/userprofile.service';
import { IMyDpOptions } from 'mydatepicker';
import { dropdownListLanguagesConfig, dropdownSettingsLanguagesConfig, dropdownListGendersConfig, dropdownSettingsGendersConfig, dropdownListCountriesConfig, dropdownSettingsCountriesConfig, dateFormatConfig } from '../services/dataconfig';
import { User } from '../interfaces/user';
import { IdItem } from '../interfaces/id-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserprofileService, private router: Router, private toastr: ToastrService) { }

  private isValid: boolean = true;

  private userProfile: User = {
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
  public model: any;

  //Initialized to specific date.
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: dateFormatConfig
  };
  public dateField: any;

  //Multiselect-dropdown - Country
  dropdownListLanguages = [];
  selectedItemsLanguages: IdItem[] = [{id: 0, name: ''}];
  dropdownSettingsLanguages = {};

  //Multiselect-dropdown - Gender
  dropdownListGenders = [];
  selectedItemGender: IdItem[] = [{id: 0, name: ''}];
  dropdownSettingsGenders = {};

  //Multiselect-dropdown - Language 
  dropdownListCountries = [];
  selectedItemCountry: IdItem[] = [{id: 0, name: ''}];
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
    photo: [''],
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    gender:  ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    languages: ['', Validators.required],
    country: ['', Validators.required],
    steam: ['']
  });

  //Send data from userProfile-form to API and process response
  onSubmit() { 
    this.service.updateUserProfile(this.formModelUser.value).subscribe(
      res => {
        this.toastr.success(res.message, 'Completed!');
        location.reload();
      },
      err => {
        this.toastr.error(err.error.message, err.error.info);
      }
    );
  }

  private initializeDefaultConfig() {
    this.dropdownListLanguages = dropdownListLanguagesConfig;
    this.dropdownSettingsLanguages = dropdownSettingsLanguagesConfig;

    this.dropdownListGenders = dropdownListGendersConfig;
    this.dropdownSettingsGenders = dropdownSettingsGendersConfig;

    this.dropdownListCountries = dropdownListCountriesConfig;
    this.dropdownSettingsCountries = dropdownSettingsCountriesConfig;
  }

  private setCurrentUserInfo() {
    this.selectedItemGender = [(this.userProfile.gender)];
    this.selectedItemCountry = [(this.userProfile.country)];

    this.model = this.userProfile.dateOfBirth == null
      ? "Choose date of birth"
      : this.userProfile.dateOfBirth.substr(0, 10);

    this.selectedItemsLanguages = [];
    for(let item of this.userProfile.languages) {
      this.selectedItemsLanguages.push(item);
    }
  }

}
