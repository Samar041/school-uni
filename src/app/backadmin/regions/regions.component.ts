import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsService } from 'src/app/_services/maps.service';
import { RegionService } from '../_services/regions.service';
import Swal from 'sweetalert2';
import *  as Polygon from 'greiner-hormann';
import { Store, select } from '@ngrx/store';
import { Area } from 'src/app/models/area.model';
import { Observable } from 'rxjs';
import * as areaActions from 'src/app/store/actions/area.actions';
import { selectAreas, selectAreasLoading } from 'src/app/store/reducers/area.reducer';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;
  MapInfoWindow: any;
  drawingManager: any;
  shapes: any = [];
  filtredShapes: any = [];
  regionList: any = [];
  filtredRegionList: any = [];
  selectedZone: any;
  addRegion: boolean = false;
  zoom = 15;
  center = { lat: 35.8245, lng: 10.6346 };
  drawnShape: any;
  loading = false;
  selectedRegion: any;
  EditRegion = false;
  Polygons: any;
  markerLabel: any;
  filter = "";
  googleLoadded = false;
  areas$!: Observable<Area[]>;
  loading$!: Observable<any>;
  constructor(private store: Store, private googleMapsService: GoogleMapsService, private regionService: RegionService) {
    this.areas$ = this.store.pipe(select(selectAreas));
    this.loading$ = this.store.pipe(select(selectAreasLoading));
  }
  ngOnInit(): void {
    this.loadGoogleMaps();
    this.areas$.subscribe((areas: any) => {
      if (this.googleLoadded) {
        this.regionList = areas.data
        this.filtredRegionList = areas.data
        this.shapes = [];
        this.filtredShapes = [];
        this.regionList.map((item: any) => {
          const point = JSON.parse(item.point)
          if (point && Array.isArray(point)) {
            let shape = point.map((pt: any) => {
              pt["lng"] = parseFloat(pt["lng"])
              pt["lat"] = parseFloat(pt["lat"])
              return pt;
            })
            this.shapes.push(shape);
            this.filtredShapes.push(shape)
          }
        });
        this.initMap();
      }
    })
    this.loading$.subscribe((value: any) => {
      this.loading = value
    })
  }
  private loadGoogleMaps(): void {
    this.googleMapsService.loadGoogleMapsApi().then(() => {
      this.googleLoadded =true
      this.getRegions();
    });
  }
  initMap() {
    console.log("init map");
    if (!this.map) {
      const elem = document.getElementById('map') as HTMLElement;
      const myStyles = [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];
      this.map = new google.maps.Map(elem, {
        center: this.center,
        zoom: this.zoom,
        clickableIcons: false,
        styles: myStyles
      });
      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        const newZoomLevel = this.map.getZoom();
        if (newZoomLevel < 13) {
          for (var i = 0; i < this.markerLabel.length; i++) {
            this.markerLabel[i].setMap(null);
          }
        }
        else {
          // this.addLabels();
        }
      });
      this.MapInfoWindow = new google.maps.InfoWindow({
        maxWidth: 350
      });
      this.initDrawingManager();
    }
    else {
      this.Polygons.setMap(null);
      for (var i = 0; i < this.markerLabel.length; i++) {
        this.markerLabel[i].setMap(null);
      }
    }
    this.initShapes();
  }
  initDrawingManager() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
    });
    this.drawingManager.setMap(this.map);
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      this.drawnShape = event.overlay;
      this.drawnShape.type = event.type;
      if (event.type === google.maps.drawing.OverlayType.POLYGON && event.overlay.getPath().getLength() >= 3) {
        let enabled = this.testIntersections(JSON.stringify(event.overlay.getPath().getArray()))
        if (!enabled) {
          this.selectedZone = JSON.stringify(event.overlay.getPath().getArray());
          this.addNewRegion();
        }
        else {
          Swal.fire({
            text: "Intersection avec une ou plusieurs autres zones !",
            icon: 'warning',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            }
          }).then(() => {
            this.drawnShape.setMap(null);
          })
        }
      }
      else {
        this.drawnShape.setMap(null);
      }
    });
  }
  initShapes() {
    this.Polygons = new google.maps.Polygon({
      paths: this.filtredShapes,
      strokeColor: "#FD7716",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FD7716",
      fillOpacity: 0.35,
      editable: false,
      draggable: false,
    });
    this.Polygons.setMap(this.map);
    this.addLabels();
  }
  addLabels() {
    this.markerLabel = [];
    this.filtredRegionList.map((item: any) => {
      const point = JSON.parse(item.point)
      let position = this.calculateCenter(point)
      const polygonLabelUrl = `data:image/svg+xml, %3Csvg width='400' height='30' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' %3E%3Cg class='layer'%3E%3Ctitle%3EPolygon%3C/title%3E%3Ctext style='font-size: 14px;font-family: Roboto, sans-serif;font-weight:500' fill='%232C76BE' class='pltext' text-anchor='middle' transform='matrix(0.9827 0 0 1 3.23004 0)' x='195.9824' xml:space='preserve' y='21' %3E ${item.name} %3C/text%3E%3C/g%3E%3C/svg%3E`;
      let markerLabel = new google.maps.Marker({
        position: position,
        icon: polygonLabelUrl,
      });
      markerLabel.setMap(this.map);
      this.markerLabel.push(markerLabel);
    })
  }
  calculateCenter(num_coords: any) {
    let lat = 0;
    let lng = 0;
    for (let i = 0; i < num_coords.length; i++) {
      lat += num_coords[i].lat;
      lng += num_coords[i].lng;
    }
    lat /= num_coords.length;
    lng /= num_coords.length;
    return { lat: lat, lng: lng }
  }
  getRegions() {
    this.store.dispatch(areaActions.loadAreas());
  }
  testIntersections(newZone: string) {
    let error = false;
    let poly1: any = []
    JSON.parse(newZone).map((pt: any) => {
      let x = parseFloat(pt["lat"]);
      let y = parseFloat(pt["lng"]);
      poly1.push({ x: x, y: y })
    })
    this.shapes.map((item: any) => {
      let poly2: any = []
      item.map((pt: any) => {
        let x = parseFloat(pt["lat"]);
        let y = parseFloat(pt["lng"]);
        poly2.push({ x: x, y: y })
      });
      if (this.isEqualPolygon(poly1, poly2))
        error = true;
      else {
        let intersection = Polygon.intersection(poly1, poly2);
        if (intersection?.length) {
          error = true;
        }
      }
    })
    return error;
  }
  isEqualPolygon(P1: any, P2: any) {
    if (P1.length != P2.length) {
      return false
    }
    else {
      for (let i = 0; i < P1.length; i++) {
        if (!this.isEqual(P1[i], P2[i])) {
          return false
        }
      }
    }
    return true
  }
  isEqual(a: any, b: any) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
  addNewRegion() {
    this.addRegion = true;
  }
  closeRegion(): void {
    this.addRegion = false;
    this.selectedZone = null;
    this.drawnShape.setMap(null);
  }
  refresh(): void {
    this.addRegion = false;
    this.filter = ''
    this.getRegions();
  }
  closeUpdateRegion(): void {
    this.addRegion = false;
    this.selectedZone = null;
  }
  refreshUpdate(): void {
    this.EditRegion = false;
    this.filter = ''
    this.getRegions();
  }
  displayUpdateRegion(region: any) {
    this.selectedRegion = region;
    this.EditRegion = true;
  }
  deleteRegion(id: any) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.regionService.deleteRegion(id).subscribe((res: any) => {
          this.filter = ''
          this.getRegions();
          Swal.fire({
            text: "Region supprimé avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        })
      }
    })
  }
  getRegionsWithFilter() {
    if (this.filter) {
      this.filtredRegionList = this.regionList.filter((item: any) => item.name.toLowerCase().includes(this.filter.toLowerCase()))
    }
    else {
      this.filtredRegionList = this.regionList;
    }
    this.filtredShapes = []
    this.filtredRegionList.map((item: any) => {
      const point = JSON.parse(item.point)
      if (point && Array.isArray(point)) {
        let shape = point.map((pt: any) => {
          pt["lng"] = parseFloat(pt["lng"])
          pt["lat"] = parseFloat(pt["lat"])
          return pt;
        })
        this.filtredShapes.push(shape);
      }
    });
    this.Polygons.setMap(null);
    for (var i = 0; i < this.markerLabel.length; i++) {
      this.markerLabel[i].setMap(null);
    }
    this.initShapes();
  }
}
