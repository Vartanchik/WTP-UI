import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {IMyDpOptions, IMyDateModel } from 'mydatepicker';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }
 
  private isValid: boolean = true;

  @Input() userDetails: any;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  // Initialized to specific date.
  public model: any;

  // ng-multiselect-dropdown
  dropdownListLanguages = [];
  selectedItemsLanguages = [];
  dropdownSettingsLanguages = {};

  dropdownListGenders = [];
  selectedItemsGenders = [];
  dropdownSettingsGenders = {};

  dropdownListCountries = [];
  selectedItemsCountries = [];
  dropdownSettingsCountries = {};
  
  ngOnInit() {
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/home']);
    }

    if(localStorage.getItem('token')){
      this.isValid = false; 

      this.service.getUserProfile().subscribe(
        res => {
          this.userDetails = res;

          if(this.userDetails.dateOfBirth == null){
            this.model = "Choose date of birth";
          }; 
          if(this.userDetails.dateOfBirth != null){
            let time = new Date(this.userDetails.dateOfBirth).toLocaleString().substr(0, 10);
            this.model = time[6]+time[7]+time[8]+time[9]+"-"+time[3]+time[4]+"-"+time[0]+time[1];
          };  

          for(let item in this.userDetails.languages){
            this.selectedItemsLanguages.push(this.userDetails.languages[item]);
          } 
              
          this.selectedItemsGenders.push(this.userDetails.gender);       

          this.selectedItemsCountries.push(this.userDetails.country);
        },
        err => {
          console.log(err);
        },
      );
    }

    //Languages
    this.dropdownListLanguages = [
      { id: 1, name: 'English' },
      { id: 2, name: 'German' },
      { id: 3, name: 'Russian' },
      { id: 4, name: 'Spanish' },
      { id: 5, name: 'Ukrainian' },
      { id: 6, name: 'Japanese' },
      { id: 7, name: 'Korean' },
      { id: 8, name: 'French' },
      { id: 9, name: 'Italian' },
      { id: 10, name: 'Czech'},
      { id: 11, name: 'Swedish'},
      { id: 12, name: 'Greek'}
    ];
    this.dropdownSettingsLanguages = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      limitSelection: 3,
      allowSearchFilter: true
    };

    //Gender
    this.dropdownListGenders = [
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female'},
    ];
    this.dropdownSettingsGenders = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

    //Country
    this.dropdownListCountries = [
      { id: 1, name: 'Ukraine' },
      { id: 2, name: 'Spanish' },
      { id: 3, name: 'USA' },
      { id: 4, name: 'Brazil' },
      { id: 5, name: 'German' }
    ];
    this.dropdownSettingsCountries = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }

  onSubmit() {
    this.service.updateUserProfile().subscribe(
      (res: any) => {
        if (res.value == "Updated") {
          //this.router.navigateByUrl('/account/userprofile');
          this.toastr.success('Your profile updated!', 'Successful.');
        }
      },
      err => {
        if (err.value == "Not updated")
          this.toastr.error('Something wrong.', 'Update failed.');
        else
          console.log(err);
      }
    )};
}