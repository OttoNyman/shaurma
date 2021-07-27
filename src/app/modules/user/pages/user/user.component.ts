import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { UserFacadeService } from '../../services/user-facade.service';
import { UserMapperService } from '../../services/user-mapper.service';

export class UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  cash: boolean;
  card: boolean;
  cardNumber: string;
  bankName: string;
  note?: string;
  qr?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userData = new UserData();

  loading = false;

  constructor(
    private router: Router,
    private userFacade: UserFacadeService,
    private userMapper: UserMapperService,
    private notSvc: AppNotificationService,
    private route: ActivatedRoute,
    private translateSvc: TranslateService,
    private titleSvc: Title
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.userFacade
      .getUser(this.route.snapshot.params.id)
      .subscribe((res) => {
        if (res.status == ResponseStatus.OK){
          this.userData = this.userMapper.fromProfileToData(res.data);
          this.titleSvc.setTitle(this.userData.firstName + ' ' + this.userData.lastName);
        }
        else if(res.status == ResponseStatus.NOT_FOUND){
          this.router.navigate(['/notFound']);
        }
        else {
          this.notSvc.showHttpErrors(res.errors);
        }

        this.loading = false;
      });

      this.translateSvc.get('USER').subscribe(res => this.titleSvc.setTitle(res));
  }
}
