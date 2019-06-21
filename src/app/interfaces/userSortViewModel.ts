export enum SortState {
  NameAsc,
  NameDesc,
  EmailAsc,
  EmailDesc,
  IdAsc,
  IdDesc
  // UserAsc,
  // UserDesc
}

//Sort order by field
export class UserSortViewModel {
  public nameSort: SortState;
  public emailSort: SortState;
  public idSort: SortState;
  //public userSort:SortState;
  public current: SortState;
}
