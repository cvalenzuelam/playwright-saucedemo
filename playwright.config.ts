import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecución en paralelo para ser más rápidos */
  fullyParallel: true,
  /* Reintentar una vez si el test falla (útil para CI) */
  retries: 1,
  /* Generar un reporte HTML profesional */
  reporter: 'html',
  
  use: {
    /* Base URL para no tener que escribirla siempre completa */
    baseURL: 'https://www.saucedemo.com',
    /* Graba trazas (paso a paso con video) si el test falla al primer reintento */
    trace: 'on-first-retry',
    /* Captura pantalla solo si el test falla */
    screenshot: 'only-on-failure',
  },

  /* Configuramos los navegadores donde queremos probar */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
