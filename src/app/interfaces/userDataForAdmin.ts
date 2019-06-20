export class User {
  constructor(
    public id?: number,
    public userName?: string,
    public email?: string,
    public photo?: string,
    public gender?: string,
    public dateOfBirth?: string,
    public country?: string[],
    public steamId?: string,
    public lockoutEnabled?: boolean,
    public lockoutEnd?: Date,
    public deletedStatus?: boolean) {
  }
}
