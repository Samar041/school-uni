import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {  UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { DemandeService } from '../../_services/demandes.services';
import { DomainService } from '../../_services/domains.service';
import { SpecialityService } from '../../_services/speciality.service';
import { UserService } from '../../_services/users.service';


@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = true;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addDemandeForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;
  domainList:any=[];
  specialityList:any=[];
  submitted:boolean=false;
  allStatus: any = [
    { id: 2, name: this.translate.instant('STATUS.PENDING'), value: 'PENDING', color: "#ffb74c" },
    { id: 3, name: this.translate.instant('STATUS.ACCEPTED'), value: 'ACCEPTED', color: "#3d5b82" },
    { id: 4, name: this.translate.instant('STATUS.VALIDATION'), value: 'VALIDATION', color: "#fe5050" },
    { id: 4, name: this.translate.instant('STATUS.ONROAD'), value: 'ONROAD', color: "#db1345" },
    { id: 5, name: this.translate.instant('STATUS.INPROGRESS'), value: 'INPROGRESS', color: "#db1345" },
    { id: 5, name: this.translate.instant('STATUS.FINISHED'), value: 'FINISHED', color: "#db1345" },
  ];
  Clients:any=[];
  Providers:any=[];
  dateCompare: boolean = false;
  selectedValidation:any;
  @Output() closeNoRefresh: EventEmitter<any> = new EventEmitter();
   constructor(
    private formBuilder: UntypedFormBuilder,
    private demandeService: DemandeService,
    public translate: TranslateService,
    private domainService: DomainService,
    private specialityService: SpecialityService,
    private userService:UserService
  ) { }

  ngOnInit(){
    this.getDomain();
    this.getSpeciality();
    this.getClientList();
    this.getProvider();
  }
  generateForm() {
    return this.formBuilder.group({
      statut: ['PENDING', Validators.required],
      description: [''],
      dateModification: [this.getCurrentDate(), Validators.required],
      user_id: ['', Validators.required],
      suivi: [null],
      specialitie: ['', Validators.required],
      valide: [1],
    });
  }
  cancel() {
    this.addDemandeForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.close.emit();
  }
  get f() {
    return this.addDemandeForm.controls
  }
  attemptAddDemande() {
    this.attemptSubmission = true;
    if (this.addDemandeForm.valid) {
      const formData = this.addDemandeForm.value;
      this.loading = true
      this.demandeService.storeDemande(formData).subscribe((res: any) => {
        this.addDemandeForm = this.generateForm();
        this.showSuccess = false;
        this.loading = false
        this.success.emit();
        this.attemptSubmission = false;
        this.show = false;
        Swal.fire({
          text: this.translate.instant('DEMANDE.ADD_DEMANDE'),
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {})
      },
        (res: any) => {
          this.loading = false
        }
      )
    }
  }
  getDomain(){
    this.domainService.getList().subscribe((res:any)=>{
      this.domainList = res.body.data
    })
  }
  getSpeciality(){
    this.specialityService.getList().subscribe((res:any)=>{
      this.specialityList = res.body.data;
    })
  }
  getClientList() {
    let payload = {
      'roles[]': ['client'],
    };
    this.userService.getUsersList(payload).subscribe(
      (res: any) => {
        this.Clients = res.body.data;
      }
    );
  }
  getProvider(){
    this.userService.getProviderList().subscribe(
      (res: any) => {
        this.Providers = res.body;
      }
    );
  }

  updateValidation($event:any) {
    this.selectedValidation = $event;
    const fieldName = $event === 1 ? "nonvalide" :"valide";
      this.addDemandeForm.patchValue({
        fieldName: $event,
      })
  }
  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
