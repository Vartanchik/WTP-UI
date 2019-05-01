import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserprofileService } from '../services/userprofile.service';
import { IMyDpOptions } from 'mydatepicker';
import { dropdownListLanguagesConfig, dropdownSettingsLanguagesConfig, dropdownListGendersConfig, dropdownSettingsGendersConfig, dropdownListCountriesConfig, dropdownSettingsCountriesConfig, dateFormatConfig } from '../services/dataconfig';
import { User } from '../services/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserprofileService, private router: Router, private toastr: ToastrService) { }

  private isValid: boolean = true;

  private userProfile: User;

  //Initialized to specific date.
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: dateFormatConfig
  };
  public model: any;

  //Multiselect-dropdown - Country
  dropdownListLanguages = [];
  selectedItemsLanguages = [];
  dropdownSettingsLanguages = {};

  //Multiselect-dropdown - Gender
  dropdownListGenders = [];
  selectedItemsGenders = [];
  dropdownSettingsGenders = {};

  //Multiselect-dropdown - Language 
  dropdownListCountries = [];
  selectedItemsCountries = [];
  dropdownSettingsCountries = {};

  ngOnInit() {
    if (!this.service.checkExistenceToken()){
      this.router.navigate(['/home']);
    }else{
      this.isValid = false; 

      //Get all user's data
      this.service.getUserProfile().subscribe(
        (res: User) => {
          this.userProfile = res;

          //Set current user's dateOfBirth
          if(this.userProfile.dateOfBirth == null){
            this.model = "Choose date of birth";
          }; 
          if(this.userProfile.dateOfBirth != null){
            this.model = this.userProfile.dateOfBirth.substr(0, 10);
          };  

          //Set current user's languages
          for(let item in this.userProfile.languages){
            this.selectedItemsLanguages.push(this.userProfile.languages[item]);
          } 
          
          //Set current user's gender
          this.selectedItemsGenders.push(this.userProfile.gender);        

          //Set current user's country
          this.selectedItemsCountries.push(this.userProfile.country);
        },
        err => {
          //console.log(err);
        },
      );
    }

    //Initialize languages from defaultConfig file
    this.dropdownListLanguages = dropdownListLanguagesConfig;
    this.dropdownSettingsLanguages = dropdownSettingsLanguagesConfig;

    //Initialize genders from defaultConfig file
    this.dropdownListGenders = dropdownListGendersConfig;
    this.dropdownSettingsGenders = dropdownSettingsGendersConfig;

    //Initialize countries from defaultConfig file
    this.dropdownListCountries = dropdownListCountriesConfig;
    this.dropdownSettingsCountries = dropdownSettingsCountriesConfig;
  }
  

  //Validation rules - userProfile form
  formModelUser = this.fb.group({
    Photo: [],
    UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    Gender:  ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    Languages: ['', Validators.required],
    Country: ['', Validators.required],
    Steam: []
  });

  //Send data from userProfile-form to API and process response
  onSubmit() {
    this.service.updateUserProfile(this.formModelUser.value).subscribe(
      (res: any) => {
        if (res.value == "Updated") {
          //this.router.navigateByUrl('/account/userprofile');
          this.toastr.success('Your profile updated!', 'Successful');
          location.reload();
        }
      },
      err => {
        (err.error.value).forEach(element => {
          if(element == "DuplicateUserName"){
            this.toastr.error('Username is already taken','Update failed.');
          }
          else if(element == "DuplicateEmail"){
            this.toastr.error('Email is already taken','Update failed.');
          }
          else{
            this.toastr.error("Invalid data",'Update failed');
          }
      });
    });
  }


}
