import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoaderFactory } from './common/utils/translate-browser.loader';
import { jwtInterceptor } from './common/interceptor/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { vi } from 'date-fns/locale';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        // provideExperimentalZonelessChangeDetection(),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            })
        ),
        provideClientHydration(withEventReplay()),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpTranslateLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ), provideAnimationsAsync(),
        provideDateFnsAdapter({
            parse: {
              dateInput: 'yyyy-MM-dd',
            },
            display: {
              dateInput: 'dd/MM/yyyy',
              monthYearLabel: 'MMM yyyy',
              dateA11yLabel: 'LL',
              monthYearA11yLabel: 'yyyy',
            },
          }),
        { provide: MAT_DATE_LOCALE, useValue: vi }
    ],
};
