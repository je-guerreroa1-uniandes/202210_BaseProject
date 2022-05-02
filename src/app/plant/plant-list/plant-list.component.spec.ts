/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { PlantListComponent } from './plant-list.component';
import { Plant } from '../plant';
import { PlantService } from '../plant.service';
import { of } from 'rxjs';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let plantService: PlantService;
  let expectedPlants: Plant[] = [
    {
      id: 1,
      nombre_comun: faker.name.findName(),
      nombre_cientifico: faker.name.lastName(),
      tipo: faker.word.noun(),
      altura_maxima: faker.datatype.number(),
      clima: faker.word.noun(),
      sustrato_siembra: faker.lorem.lines()
    },
    {
      id: 2,
      nombre_comun: faker.name.findName(),
      nombre_cientifico: faker.name.lastName(),
      tipo: faker.word.noun(),
      altura_maxima: faker.datatype.number(),
      clima: faker.word.noun(),
      sustrato_siembra: faker.lorem.lines()
    },
    {
      id: 3,
      nombre_comun: faker.name.findName(),
      nombre_cientifico: faker.name.lastName(),
      tipo: faker.word.noun(),
      altura_maxima: faker.datatype.number(),
      clima: faker.word.noun(),
      sustrato_siembra: faker.lorem.lines()
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PlantListComponent ]
    })
    .compileComponents();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    plantService = new PlantService(httpClientSpy)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    component.plants = expectedPlants;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display table with requested information', (done: DoneFn) => {
    const fixture = TestBed.createComponent(PlantListComponent);
    fixture.detectChanges();
    expect(component.plants).toEqual(expectedPlants);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      console.log(tableRows)
      expect(tableRows.length).toBe(4);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.innerHTML).toContain('#');
      // expect(headerRow.cells[0].innerHTML).toBe('#');
      // expect(headerRow.cells[1].innerHTML).toBe('Nombre común');
      // expect(headerRow.cells[2].innerHTML).toBe('Tipo');
      // expect(headerRow.cells[2].innerHTML).toBe('Clima');

      // // Data rows
      // let row1 = tableRows[1];
      // expect(row1.cells[0].innerHTML).toBe(expectedPlants[0].id);
      // expect(row1.cells[1].innerHTML).toBe(expectedPlants[0].nombre_comun);
      // expect(row1.cells[2].innerHTML).toBe(expectedPlants[0].tipo);
      // expect(row1.cells[3].innerHTML).toBe(expectedPlants[0].clima);

      // Test more rows here..
      done();
  });
  });
});
