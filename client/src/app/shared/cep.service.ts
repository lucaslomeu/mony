import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  // private baseUrl =
  //   'https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep';

  private baseUrlStates =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  protected http = inject(HttpClient);

  stateSelected = signal<string>('');

  states = resource({
    request: () => null,
    loader: async () => {
      const response = await firstValueFrom(
        this.http.get(this.baseUrlStates, { observe: 'response' })
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.body;
    },
  });

  cities = resource({
    request: () => this.stateSelected(),
    loader: async () => {
      const state = this.stateSelected();

      const response = await firstValueFrom(
        this.http.get(`${this.baseUrlStates}/${state}/municipios`, {
          observe: 'response',
        })
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.body;
    },
  });

  loadedStates = computed(() => {
    const statesValue = this.states.value();

    if (Array.isArray(statesValue)) {
      return statesValue.map(({ id, sigla, nome }) => ({
        id,
        nome,
        sigla,
      }));
    }

    return [];
  });

  loadedCities = computed(() => {
    const citiesValue = this.cities.value();

    if (Array.isArray(citiesValue)) {
      return citiesValue.map(({ id, nome }) => ({ id, nome }));
    }

    return [];
  });

  public setState(state: string) {
    this.stateSelected.set(state);
  }
}
