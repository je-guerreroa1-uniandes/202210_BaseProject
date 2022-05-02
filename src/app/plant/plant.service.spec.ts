/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlantService } from './plant.service';
import { Plant } from './plant';
import { of } from 'rxjs';

describe('Service: Plant', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let plantService: PlantService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    plantService = new PlantService(httpClientSpy)
  });

  it('should ...', inject([PlantService], (service: PlantService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected plants and called once', (done: DoneFn) => {
    const expectedPlants: Plant[] = [
      {
          id: 1,
          nombre_comun: "Lengua de vaca",
          nombre_cientifico: "Sansevieria Trifasciata",
          tipo: "Interior",
          altura_maxima: 140,
          clima: "Templado, cálido",
          sustrato_siembra: "Tierra orgánica con buen drenaje, arena, cascarilla de arroz"
      },
      {
          id: 2,
          nombre_comun: "Chachafruto",
          nombre_cientifico: "Schefflera actinophylla",
          tipo: "Exterior",
          altura_maxima: 1000,
          clima: "Todos",
          sustrato_siembra: "Sustrato para huerto"
      },
      {
          id: 3,
          nombre_comun: "Espatifilo",
          nombre_cientifico: "Spathiphyllum Wallasii",
          tipo: "Interior",
          altura_maxima: 65,
          clima: "Templado, cálido",
          sustrato_siembra: "Tierra orgánica"
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedPlants));

    plantService.getPlants().subscribe({
      next: plants => {
        expect(plants)
        .withContext('expected plants')
        .toEqual(expectedPlants);
        done();
      },
      error: done.fail
    });
  });
});
