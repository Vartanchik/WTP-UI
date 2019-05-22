export enum HistorySortState
    {
        NameAsc,    // by Name Ascending
        NameDesc,   // by Name Descending
        EmailAsc,   // by Email Ascending
        EmailDesc,  // by Email Descending
        IdAsc,      // by Id Ascending
        IdDesc,     // by Id Descending
        UserIdAsc,
        UserIdDesc,
        AdminIdAsc,
        AdminIdDesc,
        DateAsc,
        DateDesc
    }

export class HistorySortViewModel
{
    public nameSort: HistorySortState;
    public emailSort: HistorySortState;
    public idSort: HistorySortState;
    public userIdSort: HistorySortState;
    public adminIdSort: HistorySortState;
    public dateSor: HistorySortState;
    public current: HistorySortState;
}