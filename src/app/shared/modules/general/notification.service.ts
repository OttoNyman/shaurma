import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { IError } from 'src/app/core/interfaces/IError';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationService {
  constructor(private notSvc: NotificationService, private translateSvc: TranslateService) { }

  showSuccess(msg: string){
    this.notSvc.show({
      content: msg,
      position: {
        horizontal: 'center',
        vertical: 'top'
      },
      animation: { type: 'fade', duration: 400 },
      hideAfter: 3000,
      type: { style: 'success', icon: true }
    });
  }

  showError(msg: string){
    this.notSvc.show({
      content: msg,
      position: {
        horizontal: 'center',
        vertical: 'top'
      },
      animation: { type: 'fade', duration: 400 },
      closable: true,
      type: { style: 'error', icon: true }
    });
  }

  showHttpErrors(errors: IError[], withFields = true){
    errors?.forEach((err) => {
      if (!withFields || !err.field)
        this.showError(
          this.translateSvc.instant('NOTIFICATION_ERROR', {
            code: err.code,
            msg: err.message,
          })
        );
    });
  }
}
