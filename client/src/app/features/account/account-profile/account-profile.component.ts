import { Component, effect, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CepService } from '../../../shared/services/cep.service';

@Component({
  selector: 'app-account-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss',
})
export class AccountProfileComponent {
  private userService = inject(UserService);
  private cepService = inject(CepService);
  user = toSignal(this.userService.currentUser$, { initialValue: null });

  states = this.cepService.loadedStates;
  cities = this.cepService.loadedCities;

  constructor() {
    effect(() => {
      const user = this.user();
      const states = this.states();

      if (user && user.address?.state && states.length) {
        this.cepService.setState(user.address.state);

        const stateControl = this.accountForm.get('address.state');
        const cityControl = this.accountForm.get('address.city');

        if (!stateControl?.value) {
          stateControl?.setValue(user.address.state);
        }

        if (!cityControl?.value) {
          cityControl?.setValue(user.address.city);
        }
      }
    });
  }

  stateSelected = input<string>('');
  citySelected = input<string>('');

  editing = false;

  accountForm: FormGroup = new FormGroup({
    name: new FormControl(this.user()?.name, Validators.required),
    email: new FormControl(this.user()?.email, [
      Validators.required,
      Validators.email,
    ]),
    address: new FormGroup({
      cep: new FormControl(this.user()?.address.cep, [
        Validators.required,
        Validators.pattern(/^\d{5}-\d{3}$/),
      ]),
      street: new FormControl(this.user()?.address.street, Validators.required),
      number: new FormControl(this.user()?.address.number, Validators.required),
      complement: new FormControl(this.user()?.address.complement),
      neighborhood: new FormControl(
        this.user()?.address.neighborhood,
        Validators.required
      ),
      city: new FormControl(this.user()?.address.city, Validators.required),
      state: new FormControl(this.user()?.address.state, Validators.required),
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
    const selectedState = this.accountForm.get('address.state')?.value;
    this.cepService.setState(selectedState);
  }

  save() {
    if (this.accountForm.valid) {
      const formValue = this.accountForm.value;
      console.log('Dados atualizados:', formValue);
      this.toggleEdit();
    }
  }
}
