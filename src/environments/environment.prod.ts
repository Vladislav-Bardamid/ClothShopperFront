import { environment as env } from '../environments/environment';

export const environment = Object.assign(
  {
    production: true,
    baseUrl: 'https://white-river-037033e03.1.azurestaticapps.net',
    apiUrl: 'https://localhost:7156/api',
  },
  env
);
