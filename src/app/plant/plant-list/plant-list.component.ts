import { Component, OnInit } from '@angular/core';
import { Plant } from '../plant';
import { PlantService  } from '../plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Plant[] = []

  constructor(private plantService: PlantService) { }

  getPlants() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
    });
  }

  exteriorPlantsTotal(): number {
    let plantsTotal = this.plants.reduce(function(accumulatedTotal, currentPlant){
      if (currentPlant.tipo == 'Exterior') {
        return accumulatedTotal + 1;
      } else {
        return accumulatedTotal;
      }
    }, 0);
    return plantsTotal;
  }

  interiorPlantsTotal(): number {
    return this.plants.length - this.exteriorPlantsTotal();
  }

  ngOnInit() {
    this.getPlants();
  }

}
