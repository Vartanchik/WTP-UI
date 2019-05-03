
//Base WebApi URI address
export const baseURIConfig = 'https://localhost:44367/api';

export const providedInConfig = 'root';

//Languages for user-update form
export const dropdownListLanguagesConfig = [
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
export const dropdownSettingsLanguagesConfig = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true
};


//Genders for user-update form
export const dropdownListGendersConfig = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female'},
];
export const dropdownSettingsGendersConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};


//Countries for user-update form
export const dropdownListCountriesConfig = [
    { id: 1, name: 'Ukraine' },
    { id: 2, name: 'Spanish' },
    { id: 3, name: 'USA' },
    { id: 4, name: 'Brazil' },
    { id: 5, name: 'German' }
];
export const dropdownSettingsCountriesConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};


//DataPicker - format date
export const dateFormatConfig = 'yyyy-mm-dd';