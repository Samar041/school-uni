import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PromosService } from '../../_services/promos.services';
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss']
})
export class AddPromoComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  showSuccess: boolean = false;
  createPromoForm = this.formBuilder.group({
    date_debut: ['', [Validators.required,this.validateDate()]],
    date_fin: ['', [ Validators.required,this.validateDate()]],
    pourcentage: ['', Validators.required],
    discount_type: ['', Validators.required],
    max_attempts: ['', Validators.required],
    event_type: ['', Validators.required],
    code: ['', Validators.required],
    program: [''],
    manual: [''],
    titre: ['', Validators.required],
    client_id:[]
  });
  submitted = false;
  dateCompare: boolean = false;
  dateMax: boolean = false;
  isLoader:boolean=false;
  hideTitleModal = this.translate.instant("NOTIFICATION.ADD_PUB_TITLE");
  hideForm = false;
  errorMessage = null;
  statusList:any=[{id:1,name:'FENCED'},{id:2,name:'SCHEDULED'},{id:3,name:'IN PROGRESS'}]
  dictionary: any = [];
  newCode = "";
  codeLength = 6;
  apply_on = [
       {id:'ALL_CLIENTS', name: 'Tous les clients' },
       {id:'NEW_CLIENTS_ONLY', name: 'Seulement les nouveaux clients' },
       {id:'SPECIFIC_CLIENTS', name: 'Clients spécifiques' }
     ]
     trigger = [
       {id:'SIGNUP', name: 'Nouveaux clients' },
       {id:'NONE', name: 'Tout les clients' }
     ]
     typeReduction= [
       {id:'percentage', name: 'Pourcentage de réduction' },
       {id:'amount', name: 'Montant fixe'},
       {id:'reduction', name: 'Montant de réduction'}
     ]
     showNbrCommande:boolean = false;
     programmed:boolean = true;
     manual:boolean = false;
     isPercent:boolean = true;
     isAmount:boolean = false;
     isPromoPrice:boolean = false;
     displayNewClients:boolean=false;
     displaySpecified:boolean=false;
     showList:boolean=false;
     listFiltred:any=[];
  dateMessage: string="";
     
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public promosService: PromosService,
    private userService:UserService,
    private cdRef: ChangeDetectorRef
  ) { }
  ngOnInit() {
    this.generateForm()
  }
 
  generateForm() {
    return this.formBuilder.group({
      date_debut: ['', [Validators.required,this.validateDate()]],
      date_fin: ['', [ Validators.required,this.validateDate()]],
      pourcentage: ['', Validators.required],
      event_type: ['', Validators.required],
      max_attempts: ['', Validators.required],
      discount_type: ['percentage', Validators.required],
      code: ['', Validators.required],
      titre: ['', Validators.required],
      program: [''],
      manual: [''],
      client_id:[]
    });
  }
  cancel() {
    this.createPromoForm = this.generateForm();
    this.showSuccess = false;
    this.close.emit(false);
  }
  pubSubmit() {
    this.submitted = true;
    console.log(this.createPromoForm)
    if (this.createPromoForm.valid) {
      this.submitted = false;
      const formData = new FormData();      
      formData.append('date_debut', this.createPromoForm.controls['date_debut'].value + "T00:00");
      formData.append('date_fin', this.createPromoForm.controls['date_fin'].value + "T23:59");
      formData.append('value', this.createPromoForm.controls['pourcentage'].value)+'%';
      formData.append('code', this.createPromoForm.controls['code'].value);
      formData.append('titre', this.createPromoForm.controls['titre'].value);
      formData.append('event_type', this.createPromoForm.controls['event_type'].value);
      formData.append('max_attempts', this.createPromoForm.controls['max_attempts'].value);
      formData.append('type_value', this.createPromoForm.controls['discount_type'].value);

      if (this.dateMax == false) {
        this.isLoader = true;
        this.promosService.storePromos(formData).subscribe((res: any) => {
          if (res.status === 201) {
            this.hideForm = !this.hideForm;
              this.hideTitleModal = "";
              this.submitted = false;
              this.createPromoForm.reset();
              this.generateForm();
              this.isLoader = false;
              this.cancel();
            Swal.fire({
              text: "Promotion ajouté avec succès !",
              icon: 'success',
              showCancelButton: false,
              customClass: {
                confirmButton: 'btn-primary',
              }
            }).then(() => {
              this.cancel();
            })
          }
        },
          (error:any) => {
            this.errorMessage = error.error.message
          })
      }
    }
  }
  get f() {
    return this.createPromoForm.controls
  }
  numberOnly(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 46 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  validateDate(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value) {
        const date_debut = this.createPromoForm?.get('date_debut')?.value
        const date_fin = this.createPromoForm?.get('date_fin')?.value
        const startDate = new Date(date_debut);
    const endDate = new Date(date_fin);
        const maxYear = 2050;
        const currentYearStartDate = new Date(date_debut).getFullYear();
        const currentYearEndDate = new Date(date_fin).getFullYear();
                if ( currentYearStartDate > maxYear || currentYearEndDate > maxYear) {
          this.dateMax = true;
          this.dateMessage="La date de début et la date de fin ne doivent pas dépasser 2050"
          return { 'yearRange': true };
        }
        else if ( startDate.valueOf() > endDate.valueOf()) {
        this.dateMax = true;
          this.dateMessage = "La date de début doit être supérieur à la date de fin";
          return { 'yearRange': true };
        }
        else{
          this.dateMessage = "";
          this.dateMax = false;
        }
      }
      return null;
    };
  }


  generateCode() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    // Create array from chosen checkboxes
    this.dictionary = this.dictionary.concat(possible.split(''));
    // Generate random password from array
    var newCode = '';
    for (var i = 0; i < this.codeLength; i++) {
      newCode += possible[Math.floor(Math.random() * possible.length)];
    }
    this.newCode = newCode;
    if (this.newCode) {
      this.createPromoForm.patchValue({
        code: this.newCode,
      })
    }
  }
  triggerChange(type:any) {
    switch ( type.value) {
      case "percentage":
        this.isPercent = true ;
        this.isAmount = false ;
        this.isPromoPrice = false ;
        break;
        case "amount":
          this.isAmount = true ;
          this.isPercent = false ;
          this.isPromoPrice = false ;
        break;
        case "reduction":
          this.isAmount = false ;
          this.isPercent = false ;
          this.isPromoPrice = true ;
        break;
      default:
        break;
    }
  }
  changeAction(event : any){
    this.createPromoForm.patchValue({
      promo_target: event
    });
    if(event=='AUTOMATIC'){
    this.programmed =true;
     this.manual = false
    }
    else if(event=='MANUAL'){
     this.programmed =false;
     this.manual = true   }
   }
   eventTypeSelected($event:any){
    this.listFiltred = [];
      switch ($event.value) {
        case "NEW_CLIENTS_ONLY":
              this.displayNewClients = true ;
              this.displaySpecified = false ;
              this.showList = false;
              this.userService.userFiltred({event_type:"NEW_CLIENTS_ONLY"}).subscribe((res: any) => {
                this.listFiltred = res.body.data;
              })
          break;
          case "SPECIFIC_CLIENTS":
            this.displayNewClients = false ;
            this.displaySpecified = true ;
            this.showList = true;
            this.userService.userFiltred({event_type:"SPECIFIC_CLIENTS"}).subscribe((res: any) => {
                  this.listFiltred = res.body.data;

            })
          break;
          case "ALL_CLIENTS":
            this.showList = false
          break;
        default:
          break;
      }
      this.cdRef.detectChanges();

   }

   searchClient(event: any) {
    let filtered: any[] = [];
    let query = event.query.toLowerCase();
    filtered = this.listFiltred.filter((client:any) => {
      return (
        client.first_name.toLowerCase().includes(query) ||
        client.last_name.toLowerCase().includes(query)
      );
    });
    this.listFiltred = filtered

  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
