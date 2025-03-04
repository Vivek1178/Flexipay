
import { Component,OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service'; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})


export class AdminDashboardComponent implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  showFilteredTable: boolean = false;


  constructor(private recordsService: AdminService) {}

  ngOnInit() {
    this.recordsService.getAllRecords()
      .subscribe(records => {
        // Sort records in descending order based on the "validity" column
        this.records = records;
        console.log(this.records)
        this.records = this.records.sort((a: { validity: string; }, b: { validity: string; }) => {
          const dateA = this.convertToDate(a.validity);
          const dateB = this.convertToDate(b.validity);
          return dateA.getTime() - dateB.getTime();
        });
      });
    
  }

  convertToDate(validity: string): Date {
    const parts = validity.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are zero-based in JavaScript Date objects
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }


  filterRecords(name: string) {
    
    console.log('Clicked name:', name);
    this.filteredRecords = this.records.filter(record => record.name === name);
    console.log(this.filteredRecords, this.records)
    this.showFilteredTable = true;
    
  }
}
