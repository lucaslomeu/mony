import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-account-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss',
})
export class AccountProfileComponent {
  private authService = inject(AuthService);

  editing = false;
  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
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
      this.accountForm.get('email')?.disable(); // email permanece readonly
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

      // aqui você faria a chamada real pro backend
      // ex: this.userService.update(formValue).subscribe(...)
    }
  }
}
