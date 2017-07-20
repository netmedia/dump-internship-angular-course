import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
}                               from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                               from '@angular/forms';
import { Router }               from '@angular/router';
import { moveIn }               from '../../shared/animations';
import { ValidationService }    from '../../shared/utility';
import { LoginForm }            from '../../shared/models';
import { AuthService }          from '../auth.service';
import { ConfigService }        from '../../app-config.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public submitted:  boolean = false;
  public isLoading:  boolean = false;
  public email:      AbstractControl;
  public password:   AbstractControl;
  public loginForm:  FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService,
    private configService: ConfigService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initLoginForm(): void {
    this.loginForm = this.fb.group({
      email:      ['', [Validators.required, this.validationService.validateEmail]],
      password:   ['', Validators.required]
    });

    this.email     = this.loginForm.controls['email'];
    this.password  = this.loginForm.controls['password'];
  }

  /**
   * Handles form 'submit' event.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login(new LoginForm(form))
      .subscribe(
        res => {
          this.isLoading = false;
          this.authService.createUser(res);

          if (this.authService.user) {
            this.authService.user.save();
            this.router.navigate(['/items']);
          } else {
            this.notificationService.error('Error', 'Error while creating new user', this.configService.get('notifications').options);
          }
        },
        error => {
          this.changeDetector.markForCheck();
          this.isLoading = false;
          this.notificationService.error('Error', 'Error while signing in', this.configService.get('notifications').options);
        });
    }
  }
}