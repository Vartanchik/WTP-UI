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

  private userProfile: User;
  private photo: string;
  private userName: string;

  //Initialized to specific date.
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: dateFormatConfig
  };
  public model: any;

  //Multiselect-dropdown - Country
  dropdownListLanguages = [];
  selectedItemsLanguages: IdItem[];
  dropdownSettingsLanguages = {};

  //Multiselect-dropdown - Gender
  dropdownListGenders = [];
  selectedItemGender: IdItem;
  dropdownSettingsGenders = {};

  //Multiselect-dropdown - Language 
  dropdownListCountries = [];
  selectedItemCountry: IdItem;
  dropdownSettingsCountries = {};

  ngOnInit() {
    if (!this.service.checkExistenceToken()) {
      this.router.navigate(['/home']);
    } else {
      this.isValid = false; 

      this.service.getUserProfile().subscribe(
        (res: User) => {
          console.log(res);
          this.userProfile = res;
          this.setCurrentUserInfo();
        },
        err => {
          console.log(err);
        },
      );
    }

    this.initializeDefaultConfig();

    // console.log(this.userProfile.gender);
    // console.log(this.userProfile.languages);
    // console.log(this.userProfile.country);
  }

  //Validation rules - userProfile form
  formModelUser = this.fb.group({
    photo: [''],
    userName: ['' , [Validators.minLength(4), Validators.maxLength(30)]],
    gender:  ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    languages: ['', Validators.required],
    country: ['', Validators.required],
    steam: ['']
  });

  //Send data from userProfile-form to API and process response
  onSubmit() { 
    if(!this.formModelUser.get('userName').value) {
      this.formModelUser.get('userName').setValue(this.userName);
    }

    console.log(this.formModelUser);
    this.service.updateUserProfile(this.formModelUser.value).subscribe(
      res => {
        console.log(res);
        this.toastr.success('', res.message);

        // this.service.getUserProfile().subscribe(
        //   (res: User) => {
        //     this.userProfile = res;
        //     console.log(this.userProfile.gender);
        //     console.log(this.userProfile.languages);
        //     console.log(this.userProfile.country);
        //     this.setCurrentUserInfo();
        //   },
        //   err => {
        //     console.log(err);
        //   },
        // );

        // if(res.userName != null) {
        //   this.toastr.success('Your profile updated!', 'Successful');
        //   this.service.updatePhotoAndUserNameInStorage(res.photo, res.userName);
        //   location.reload();
        // } else {
        //   (res.message).forEach(element => {
        //     if(element == "DuplicateUserName") {
        //       this.toastr.error('Username is already taken','Registration failed.');
        //     } else if(element == "DuplicateEmail") {
        //       this.toastr.error('Email is already taken','Registration failed.');
        //     } else {
        //       this.toastr.error("",'Registration failed.');
        //     }
        //   });
        // }
      },
      err => {
        console.log(err);
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
    this.photo = this.userProfile.photo;
    this.userName = this.userProfile.userName;
    this.selectedItemGender = this.userProfile.gender;
    this.selectedItemCountry = this.userProfile.country;

    if(this.userProfile.dateOfBirth == null) {
      this.model = "Choose date of birth";
    } else {
      this.model = this.userProfile.dateOfBirth.substr(0, 10);
    };

    for(let item of this.userProfile.languages) {
      this.selectedItemsLanguages.push(item);
    }
  }

  private resetSelectedData() {
    this.photo = null;
    this.userName = null;
    this.selectedItemGender = null;
    this.selectedItemCountry = null;
    this.selectedItemsLanguages = null;
    this.userProfile.dateOfBirth = null;
  }

}
