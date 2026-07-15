import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { CursosService } from './cursos.service';
import { AsyncPipe } from '@angular/common';

export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-cursos',
  imports: [AsyncPipe,MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class CursosComponent implements OnInit{

  columnsToDisplay = ['position', 'symbol', 'name', 'weight'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;
  initialData$!: Observable<PeriodicElement[]>;

  /*addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }*/

  constructor(private service: CursosService) {}

  ngOnInit() {
   this.initialData$ = this.service.getList();
  }

  isExpanded(element: PeriodicElement) {
    return this.expandedElement === element;
  }

  toggle(element: PeriodicElement) {
      this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
