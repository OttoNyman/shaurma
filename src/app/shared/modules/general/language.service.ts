import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { map, startWith, tap } from 'rxjs/operators';


export interface ILanguage {
    name: string,
    image: string,
    code: string
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private languages: Array<ILanguage> = [
        { name: 'English', image: 'data:image/png;base64,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', code: 'en' },
        { name: 'Русский', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAElBMVEX////VKx4AOaYAGJ4AOq3fKgABXnTtAAAA9UlEQVR4nO3QsQGAQAwAoejr/ivb50pbGIEZAAAAAAAAAAAAAAAAAAAAAH47bHOzOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJzUP27xsc7E5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aQ+2jLMGymKnQ8AAAAASUVORK5CYII=', code: 'ru' }
    ];

    constructor(private translate: TranslateService, private intl: IntlService){}

    setLanguage(newLanguageCode: string) {
        this.translate.use(newLanguageCode);
        localStorage.setItem('language', newLanguageCode);
    }

    getLanguage() {
        const stream$ = this.translate.onLangChange
            .pipe(
                map(event => event.lang), 
                startWith(localStorage.getItem('language') || 'en')
            );

        stream$.subscribe((code: string) => (<CldrIntlService>this.intl).localeId = code == 'en' ? 'en-US' : 'ru-RU');

        return stream$;
    }

    getAllLanguages(): Array<ILanguage>{
        return this.languages;
    }
}