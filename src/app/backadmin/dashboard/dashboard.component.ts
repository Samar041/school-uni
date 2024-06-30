import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../_services/auth.service';

import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [300, 500, 900, 101, 506, 895, 340], label: 'Series B' },
    { data: [65, 519, 800, 111, 786, 305, 40], label: 'Series C' },
  ];
  public lineChartLabels = [
    '2018-01-29 10:00:00',
    '2018-01-29 10:01:00',
    ' 2018-01-29 10:02:00',
    ' 2018-01-29 10:03:00',
    ' 2018-01-29 10:04:00',
    ' 2018-01-29 10:05:00',
    '2018-01-29 10:06:00',
    '2018-01-29 10:07:00',
    '2018-01-29 10:08:00',
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
  listProducts: any;
  arrayClients: any;
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
