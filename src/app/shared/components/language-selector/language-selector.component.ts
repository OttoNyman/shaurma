import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PopupComponent } from '@progress/kendo-angular-popup';
import { LanguageService } from '../../modules/general/language.service';


export interface ILanguage{
  name: string,
  image: string,
  code: string
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @ViewChild('imgRef')
  imgAnchor: ElementRef<any>;

  @ViewChild('popup')
  popup: PopupComponent;

  selectedLanguage: ILanguage;
  languages: Array<ILanguage> = [];

  show = false;

  constructor(private languageService: LanguageService){
      this.languages = languageService.getAllLanguages();
      
      languageService.getLanguage().subscribe(code => {
        this.selectedLanguage = languageService.getAllLanguages().find(lang => lang.code == code);
      })
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: any){
    if(!this.popup?.anchor.nativeElement.contains(event.target))
      this.show = false;
  }

  toggleLanguagePopup() {
    this.show = !this.show;
  }

  changeLanguage(language: ILanguage) {
    this.languageService.setLanguage(language.code);
    this.show = false;
  }
}
