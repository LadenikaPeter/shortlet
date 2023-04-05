import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';

export interface ExampleTab {
  label: string;
  content: string;
}

export interface UserData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any;
  asyncTabs: Observable<ExampleTab[]>;

  displayedColumns: string[] = [''];
  constructor(private dataS: DataStorageService) {
    //   this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
    //     setTimeout(() => {
    //       observer.next([
    //         { label: 'First', content: 'Content 1' },
    //         { label: 'Second', content: 'Content 2' },
    //         { label: 'Third', content: 'Content 3' },
    //       ]);
    //     }, 1000);
    //   });
  }

  ngOnInit(): void {
    this.dataS.getAllUsers();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
