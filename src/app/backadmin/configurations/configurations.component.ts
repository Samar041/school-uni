import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../_services/config.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent {
  time_for_acceptation: any
  time_waiting: any
  active: any;
  loading = false;
  submitted = false;
  constructor(private configService: ConfigService) { }
  ngOnInit() {
    this.getConfigDemandeList();
  }
  submit() {
    this.submitted = true;
    if (this.time_for_acceptation && this.time_waiting) {
      this.loading = true;
      const payload = {
        time_for_acceptation: this.time_for_acceptation,
        time_waiting: this.time_waiting,
        active: this.active ? 1 : 0
      }
      this.configService.updateConfig(payload).subscribe((res: any) => {
        this.loading = false;
        this.submitted = false;
        Swal.fire({
          text: 'Configurations modifiés avec succès',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.getConfigDemandeList()
        })
      })
    }
  }
  getConfigDemandeList() {
    this.configService.getConfigDemandes().subscribe((res: any) => {
      this.time_for_acceptation = res.body.time_for_acceptation
      this.time_waiting = res.body.time_waiting
      this.active = res.body.active == 1 ? true : false
    })
  }
  onChangeStatus(event: any) {
    console.log(event);
  }
}
