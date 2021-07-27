import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export abstract class CanLeave {
  private _canLeave = true;

  public getCanLeave(){
    return this._canLeave;
  }

  public setCanLeave(canLeave: boolean){
    this._canLeave = canLeave;
    window.onbeforeunload = this._canLeave || !environment.production ? null : (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return 'You have unsaved changes';
    }
  }

  public onDestroy(){
    window.onbeforeunload = null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements CanDeactivate<CanLeave> {
  constructor(private dialogSvc: DialogService, private translateSvc: TranslateService) { }

  canDeactivate(component: CanLeave): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.getCanLeave())
      return true;

    const dlgRef = this.dialogSvc.open({
      title: this.translateSvc.instant('SURE'),
      content: this.translateSvc.instant('UNSAVE_CHANGES'),
      actions: [{ text: this.translateSvc.instant('NO') }, { text: this.translateSvc.instant('YES'), primary: true, success: true }],
      minWidth: 250,
      width: 250,
      height: 200
    });

    return dlgRef.result.pipe(map((action: any) => !!action.success));
  }
}
