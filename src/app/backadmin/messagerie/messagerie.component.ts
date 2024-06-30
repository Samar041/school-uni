import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { AppService } from '../_services/app.service';
import { MessagerieService } from '../_services/messagerie.service';
import { UserService } from '../_services/users.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss'],
})
export class MessagerieComponent implements OnInit {
  ////private NewMessageSubscription: Subscription;
  //// private newCommandSubscription: Subscription;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  selectChange = [
    {
      color: 'green',
      value: 1,
      name: 'actif',
    },
    {
      color: 'red',
      value: 2,
      name: 'inactif',
    },
  ];
  message: string = '';
  messagesList!: any[];
  clientAdminMessage!: any[];
  messageId: number = 1;
  idMessageToDelete: number = 0;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  items!: MenuItem[];
  adminInfo: any;
  query: string = '';
  selected: boolean = false;
  clientSelectedInfo: any;
  activeButtonIndex: number = 0;
  activeClientList: any;
  isSelected: boolean = false;
  @ViewChild('element') element!: ElementRef;
  checkboxItems = [
    { id: 'Tous', name: 'Tous', value: 'lue', label: 'Tous', checked: true },
    {
      id: 'non-lue',
      name: 'non-lue',
      value: 'non-lue',
      label: 'Non lus',
      checked: false,
    },
    { id: 'lue', name: 'lue', value: 'lue', label: 'Lus', checked: false },
  ];
  selectedOption: any;
  filter: boolean = false;
  filterList: any;
  constructor(
    public translate: TranslateService,
    private messageService: MessagerieService,
    //private adminLaravelEchoService: AdminLaravelEchoServiceService,
    private _el: ElementRef,
    public appService: AppService,
    //public manageNotificationsService: ManageNotificationsService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getMessage();
    this.adminInfo = JSON.parse(localStorage.getItem('admin')!);
    this.openMessageById(this.messageId);
    this.items = [
      {
        items: [
          {
            label: 'Archiver',
            command: ($event: any) => {
              if ($event.item.label === 'Archiver') {
                this.deleteMessage(this.idMessageToDelete);
              }
            },
          },
        ],
      },
    ];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(id: number) {
    this.messageService.sendMessage({ response: this.message }, id).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.message = '';
          this.openMessageById(this.messageId);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMessage() {
    this.messageService.getMessages().subscribe(
      (data: any) => {
        this.messagesList = data?.body;
        this.scrollToBottom();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openMessageById(messageId: any) {
    this.messageService.getMessageById(messageId).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.clientAdminMessage = data?.body?.client_messages;
          this.scrollToBottom();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectUser(message_id: any, message: any) {
    this.isSelected = true;
    this.messageId = message.message_id;
    this.clientSelectedInfo = message;
    this.openMessageById(message.message_id);
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.isSelected === true)
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
  }

  deleteMessage(id: any) {
    this.messageService.deleteMessage(id).subscribe((data: any) => {
      if (data.status === 200) {
        this.getMessage();
      }
    });
  }

  handleMenuClick(event: any) {
    this.idMessageToDelete = event.message_id;
  }

  onSearch() {
    const filteredMessages: any[] = this.clientAdminMessage.filter(
      (message: any) =>
        message.message.toLowerCase().includes(this.query.toLowerCase())
    );
    this.clientAdminMessage = filteredMessages;
    if (Object.keys(filteredMessages).length === 0 && this.query === '') {
      this.openMessageById(1);
    }
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
    let payload = {
      statut_pro: '',
      phone: '',
      last_name: '',
      first_name: '',
      paginated: 1,
      page: '',
      page_size: '',
      filter: '',
      'roles[]': ['client'],
      orderBy: '',
      orderDirection: '',
      auth: index,
    };
    // this.userService.getUsersList(payload).subscribe((res: any) => {
    //   this.activeClientList = res?.body?.data;
    // });
  }
  checkHeight(): boolean {
    return this.element?.nativeElement?.offsetHeight > 200;
  }

  handleCheckboxChange(checkedItemId: any) {
    this.filter = true;
    let filteredList: any[] = this.messagesList;
    switch (checkedItemId) {
      case 'non-lue':
        filteredList = this.messagesList.filter(
          (message: any) => message.is_read === 0
        );
        break;
      case 'lue':
        filteredList = this.messagesList.filter(
          (message: any) => message.is_read === 1
        );
        break;
      default:
        break;
    }
    this.filterList = filteredList;
    this.checkboxItems.forEach((item: any) => {
      if (item.id !== checkedItemId) {
        item.checked = false;
      }
    });
  }
}
