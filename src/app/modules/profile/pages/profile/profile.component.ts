import { Component, DoCheck, ElementRef, KeyValueDiffer, KeyValueDiffers, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { CanLeave } from 'src/app/core/guards/confirm.guard';
import { AppValidators } from 'src/app/core/validators';
import { AuthMapperService } from 'src/app/modules/auth/services/auth-mapper.service';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { ProfileFacadeService } from '../../services/profile-facade.service';
import { ProfileMapperService } from '../../services/profile-mapper.service';


export class ProfileData {
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends CanLeave implements OnInit, DoCheck, OnDestroy {
  @ViewChild('fileInput')
  private fileInput: ElementRef<HTMLInputElement>;

  profileData = new ProfileData;
  profileValidators = AppValidators.createValidator({
    firstName: [AppValidators.required],
    lastName: [AppValidators.required],
    phone: [AppValidators.required, AppValidators.phone],
    email: [AppValidators.required, AppValidators.email]
  });
  paymentValidators = AppValidators.createValidator({
    cardNumber: [AppValidators.required, AppValidators.cardNumber],
    bankName: [AppValidators.required]
  })

  private differ: KeyValueDiffer<any, any>;
  private wasLoaded = false;
  loading = false;

  constructor(
    differs: KeyValueDiffers,
    private profileFacade: ProfileFacadeService,
    private profileMapper: ProfileMapperService,
    private userService: UserService,
    private notSvc: AppNotificationService,
    private translateSvc: TranslateService,
    private authMapper: AuthMapperService,
    private titleSvc: Title
  ) {
    super();
    this.differ = differs.find(this.profileData).create();
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.profileData);

    if (changes) {
      this.setCanLeave(!this.wasLoaded);
      this.wasLoaded = true;

      this.profileValidators.validate(this.profileData);

      if (this.profileData.card)
        this.paymentValidators.validate(this.profileData);
    }
  }

  ngOnInit(): void {
    this.loading = true;

    this.profileFacade.getProfile(this.userService.getUser().value.id).subscribe(
      res => {
        if (res.status == ResponseStatus.OK)
          this.profileData = this.profileMapper.fromProfileToData(res.data);
        else
          this.notSvc.showHttpErrors(res.errors);

        this.loading = false;
      }
    );

    this.translateSvc.get('MY_PROFILE').subscribe(res => this.titleSvc.setTitle(res));
  }

  ngOnDestroy(){
    super.onDestroy();
  }

  get hasQR() {
    return !!this.profileData.qr;
  }

  get isFormValid() {
    return !this.profileValidators.errors.invalid && (this.profileData.card ? !this.paymentValidators.errors.invalid : true);
  }

  onAddQR() {
    this.fileInput?.nativeElement.click();
  }

  onQRChange(file: File) {
    if (!file)
      return this.onResetQR();

    const fileReader = new FileReader;
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      this.profileData.qr = fileReader.result as string;
    }
  }

  onResetQR() {
    this.profileData.qr = null;
  }

  async onSave(e: Event) {
    e.preventDefault();

    this.loading = true;

    //validate
    await this.profileValidators.validate(this.profileData);
    await this.paymentValidators.validate(this.profileData);

    if (this.isFormValid) {
      //get data
      const userID = this.userService.getUser().value.id;
      const profileDto = this.profileMapper.toUpdateProfile(this.profileData);

      //make api call
      this.profileFacade.updateProfile(userID, profileDto).subscribe(
        res => {
          if (res.status == ResponseStatus.OK) {
            this.onSuccessSave(res.data);
            this.setCanLeave(true);
          }
          else {
            this.notSvc.showHttpErrors(res.errors);
            this.profileValidators.getErrorsFromResponse(res);
            this.paymentValidators.getErrorsFromResponse(res);
          }

          this.loading = false;
        });
    }
    else {
      //stop loading
      this.loading = false;
    }
  }

  onKeyPress(e: KeyboardEvent){
    if(e.key == 'Enter')
      this.onSave(e);
  }

  private onSuccessSave(data: ProfileDto) {
    //stop loading, update data and show notification
    this.profileData = this.profileMapper.fromProfileToData(data);
    this.userService.setUser(this.authMapper.fromCurrentUserDto({ ...data.user, cashier: this.userService.getUser().getValue().isCashier }));
    this.loading = false;

    this.notSvc.showSuccess(this.translateSvc.instant('PROFILE_CHANGED'));
  }

  onFileDropped(files: FileList){
    if(files.length > 1){
      this.notSvc.showError(this.translateSvc.instant('MANY_FILES'));
      return;
    }

    const file = files[0];

    if(!file.type.includes('image')){
      this.notSvc.showError(this.translateSvc.instant('IMAGE_REQUIRED'));
      return;
    }

    this.onQRChange(file);
  }
}
