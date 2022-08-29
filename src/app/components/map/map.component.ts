import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Map, LngLatBoundsLike, Popup } from 'mapbox-gl';
import { bbox } from 'turf';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() geoJsonData: any;
  
  @Input() popupContentValue!: string;
  
  @Input() loader: boolean = false;

  public bounds: LngLatBoundsLike | undefined;

  public map!: Map;

  public readonly boundsPadding = 30;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['geoJsonData']) {
      this.initLayerConfig();
    }
  }

  ngOnInit(): void {
  }

  public onMapLoad(event: Map): void {
    this.map = event;
  }

  public initLayerConfig(): void {
    if (this.map) {
      // Get the bounds of the polygon and fly to it
      this.bounds = bbox(this.geoJsonData) as LngLatBoundsLike;
  
      // Adding popup element to layer
      this.addingPopupInfo();
    }
  }

  private addingPopupInfo(): void {
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mousemove', 'zipcode', (e) => {
      
      // Change the cursor style as a UI indicator.
      this.map.getCanvas().style.cursor = 'pointer';

      const description = this.popupContentValue;

      // Locate the popup when is the curser.
      popup.setLngLat(e.lngLat).setHTML(description).addTo(this.map);
    });

    this.map.on('mouseleave', 'zipcode', () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }

}
