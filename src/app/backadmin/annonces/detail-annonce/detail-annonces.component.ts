import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../_services/users.service';
@Component({
  selector: 'app-detail-annonces',
  templateUrl: './detail-annonces.component.html',
  styleUrls: ['./detail-annonces.component.scss'],
})
export class DetailAnnoncesComponent {
  admin: any;
  id: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getAdminById(this.id);
    });
  }
  getAdminById(id: any) {
    // this.userService.getUserById(id).subscribe((res: any) => {
    //   this.admin = res.body.data;
    // }, (error: any) => { console.error(error); });
  }
  parseDate(elm: any) {
    return new Date(elm);
  }
  showStatusName(statusValue: string) {
    const allStatus = [
      { id: 1, name: this.translate.instant('STATUS.ACTIVE'), value: 'ACTIVE' },
      {
        id: 2,
        name: this.translate.instant('STATUS.PENDING'),
        value: 'PENDING',
      },
      {
        id: 3,
        name: this.translate.instant('STATUS.DISABLED'),
        value: 'DISABLED',
      },
    ];
    const status = allStatus.find((s) => s.value === statusValue);
    if (status) {
      return status.name;
    } else {
      return 'Statut inconnu';
    }
  }
}
