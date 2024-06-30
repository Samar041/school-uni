import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../_services/users.service';
@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss'],
})
export class ViewCompanyComponent {
  Company: any;
  id: any;
  activeIndex: any = 0;
  status: any = [
    {
      id: 1,
      name: this.translate.instant('STATUS.ACTIVE'),
      value: 'ACTIVE',
      color: '#17c2c2',
    },
    {
      id: 2,
      name: this.translate.instant('STATUS.PENDING'),
      value: 'PENDING',
      color: '#ffb74c',
    },
    {
      id: 3,
      name: this.translate.instant('STATUS.DISABLED'),
      value: 'INACTIVE',
      color: '#3d5b82',
    },
    {
      id: 4,
      name: this.translate.instant('STATUS.BLOCKED'),
      value: 'BLOCKED',
      color: '#fe5050',
    },
  ];
  types = [
    { value: 'EL', name: 'Entreprise individuelle' },
    { value: 'EIRL', name: 'Entreprise individuelle à responsabilité limitée' },
    {
      value: 'EURL',
      name: 'Entreprise unipersonnelle à responsabilité limitée',
    },
    { value: 'SARL', name: 'Société à responsabilité limitée' },
    { value: 'SAS', name: 'Société par actions simplifiée' },
    { value: 'SA', name: 'Société anonyme' },
    { value: 'Entreprise publique', name: 'Entreprise publique' },
    { value: 'ESS', name: 'Économie sociale et solidaire' },
    { value: 'Micro-entreprise', name: 'Micro-entreprise' },
    { value: 'Auto-entrepreneur', name: 'Auto-entrepreneur' },
  ];
  deleted: any;
  loading = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      const queryParams = this.route.snapshot.queryParams;
      this.deleted = queryParams['deleted'];
      this.getCompanyById(this.id);
    });
  }
  getCompanyById(id: any) {
    if (this.deleted == 'true') {
      this.loading = true;
      // this.userService.getDeletedUserById(id).subscribe(
      //   (res: any) => {
      //     this.Company = res.body;
      //     this.loading = false;
      //   },
      //   (error: any) => {
      //     console.error(error);
      //   }
      // );
    } else {
      this.loading = true;
      // this.userService.getCompanyById(id).subscribe(
      //   (res: any) => {
      //     this.Company = res.body;
      //     this.loading = false;
      //   },
      //   (error: any) => {
      //     console.error(error);
      //   }
      // );
    }
  }
}
