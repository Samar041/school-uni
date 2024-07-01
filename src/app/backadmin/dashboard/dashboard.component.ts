import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../_services/auth.service';

import { ChartDataset } from 'chart.js';
import { UserRole } from '../_services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'DSI' },
    { data: [30, 50, 90, 11, 56, 89, 34], label: 'RSI' },
    { data: [65, 59, 80, 11, 86, 35, 40], label: 'CFM' },
  ];
  public lineChartLabels = [
    '2021-01-29',
    '2022-01-29',
    '2023-01-29',
  ];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            tooltipFormat: ' HH:mm',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
          ticks: {
            maxRotation: 0,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'value',
          },
        },
      ],
    },

    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'xy',
      limits: {
        max: 20,
        min: 20,
      },
    },
  };
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  bestCostumers: any[] = [
    {
      name: 'Ahmed Ben Ahmed',
      score: 1236,
      image: './assets/img/avatars/andrew.jpg',
    },
    {
      name: 'Mcleod  Mueller',
      score: 3565,
      image: './assets/img/avatars/Barrera.jpg',
    },
    {
      name: 'Day  Meyers',
      score: 6547,
      image: './assets/img/avatars/Boyle.jpg',
    },
    {
      name: 'Aguirre  Ellis',
      score: 2541,
      image: './assets/img/avatars/Henderson.jpg',
    },
    {
      name: 'Cook  Tyson',
      score: 3652,
      image: './assets/img/avatars/andrew.jpg',
    },
  ];

  mostSold: any[] = [
    {
      name: 'Pizza Nepture - Large size',
      score: 269,
      image: './assets/img/Pizza-Nepture.jpg',
    },
    {
      name: 'Chicken Tikka Burger',
      score: 240,
      image: './assets/img/Chicken-Tikka-Burger.jpg',
    },
    {
      name: 'Spaghitti fruits de mer',
      score: 229,
      image: './assets/img/Spaghitti-fruits-mer.jpg',
    },
    {
      name: 'Spaghitti',
      score: 654,
      image: './assets/img/Spaghitti.jpg',
    },
  ];
  indexInfo: any;
  listClients: any;

  listClasses: any = [
    {
      name: 'DSI',
      etu_num: 50,
    },
    {
      name: 'RSI',
      etu_num: 20,
    },
    {
      name: 'CFM',
      etu_num: 50,
    },
  ];
  arrayClients: any = [
    {
      name: 'Mili Ahmed',
      moy: 16.92,
      class: 'DSI3',
    },
    {
      name: 'Aouadi Samar',
      moy: 14.89,
      class: 'DSI3',
    },
    {
      name: 'Riahi Mohsen',
      moy: 10.09,
      class: 'DSI3',
    },
  ];
  roles = {
    Student: 'student',
    Prof: 'prof',
    Admin: 'admin',
  };
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    public translate: TranslateService,
    private titleService: Title,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchIndex();
  }

  fetchIndex() {}
}
