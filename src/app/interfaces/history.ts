export class History {
  constructor(
    public id?: number,
    public dateOfOperation?: Date,
    public description?: string,
    public previousUserEmail?: string,
    public previousUserName?: string,
    public newUserEmail?: string,
    public newUserName?: string,
    public appUserId?: number,
    public adminId?: number,
    public operationId?: number
  ) {
  }
}
