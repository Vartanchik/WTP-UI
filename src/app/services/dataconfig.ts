
//Base WebApi URI address
export const baseURIConfig = 'http://localhost:44390/api';

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
    { id: 2, name: 'Female'}
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
    { id: 2, name: 'Spain' },
    { id: 3, name: 'USA' },
    { id: 4, name: 'Brazil' },
    { id: 5, name: 'German' },
    { id: 6, name: 'China' },
    { id: 7, name: 'Poland' }
];
export const dropdownSettingsCountriesConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};

//Games for user-update form
export const dropdownListGamesConfig = [
    { id: 1, name: 'Dota 2' },
    { id: 2, name: 'CS:GO'},
    { id: 3, name: 'GTA V'}
];
export const dropdownSettingsGamesConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};

//Servers for user-update form
export const dropdownListServersConfig = [
    { id: 1, name: 'EU East' },
    { id: 2, name: 'EU West'},
    { id: 3, name: 'South America'},
    { id: 4, name: 'Norht America'},
    { id: 5, name: 'Middle East'},
    { id: 6, name: 'Asia'}
];
export const dropdownSettingsServersConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};

//Goals for user-update form
export const dropdownListGoalsConfig = [
    { id: 1, name: 'To have fun' },
    { id: 2, name: 'To become a pro'},
    { id: 3, name: 'To play competitlvely'}
];
export const dropdownSettingsGoalsConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};

//Ranks for user-update form
export const dropdownListRanksConfig = [
    { id: 1, name: 'Uncalibrated' },
    { id: 2, name: 'Guardian'},
    { id: 3, name: 'Crusader'},
    { id: 4, name: 'Archon'},
    { id: 5, name: 'Legend'},
    { id: 6, name: 'Ancient'},
    { id: 7, name: 'Divine'},
    { id: 8, name: 'Immortal'}
];
export const dropdownSettingsRanksConfig = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: false
};
//DataPicker - format date
export const dateFormatConfig = 'dd.mm.yyyy';