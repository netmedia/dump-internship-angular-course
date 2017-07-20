export class User {

  public name:    string;
  public email:       string;
  public token:       string;
  public isLoggedIn:  boolean;
  public isAdmin:     boolean;

  constructor(user?: any) {
    this.name       = user ? user.name : '';
    this.email      = user ? user.email : '';
    this.token      = user ? user.token : '';
    this.isLoggedIn = this.email ? true : false;
    this.isAdmin    = user ? user.isAdmin : false;
  }

  /**
   * Saves user into local storage
   *
   * @param user
   */
  public save(): void {
    localStorage.setItem('dump-currentUser', JSON.stringify(this));
  }

  /**
   * Saves user into local storage
   */
  public remove(): void {
    localStorage.setItem('dump-currentUser', null);
  }
}