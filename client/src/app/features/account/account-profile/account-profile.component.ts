import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-account-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss',
})
export class AccountProfileComponent {
  private userService = inject(UserService);
  user = toSignal(this.userService.currentUser$, { initialValue: null });

  editing = false;

  accountForm: FormGroup = new FormGroup({
    name: new FormControl(this.user()?.name, Validators.required),
    email: new FormControl(this.user()?.email, [
      Validators.required,
      Validators.email,
    ]),
    address: new FormGroup({
      cep: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(''),
      complement: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
    }),
  });

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.accountForm.enable();
      this.accountForm.get('email')?.disable();
    } else {
      this.accountForm.disable();
    }
  }

  onStateChange() {
    // carregar cidades com base no estado
  }

  save() {
    if (this.accountForm.valid) {
      const formValue = this.accountForm.value;
      console.log('Dados atualizados:', formValue);
      this.toggleEdit();
    }
  }
}
