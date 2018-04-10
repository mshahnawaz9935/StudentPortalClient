export class User {
    constructor(
      public username: string,
      public password: string,
      public confirm_password: string,
      public role:string,
    ) {  }
  }