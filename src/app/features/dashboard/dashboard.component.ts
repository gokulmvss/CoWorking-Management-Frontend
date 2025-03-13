import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CoworkingSpace } from '../../core/entity/coworking-space';
import { Workspace } from '../../core/entity/workspace';
import { Company } from '../../core/entity/company';
import { Seat } from '../../core/entity/seat';
import { CoworkingSpaceService } from '../../core/services/coworking-space.service';
import { WorkspaceService } from '../../core/services/workspace.service';
import { CompanyService } from '../../core/services/company.service';
import { SeatService } from '../../core/services/seat.service';
import { CommonModule, NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    coworkingSpace$: CoworkingSpace | undefined;
    workspace$: Workspace | undefined;
    company$: Company | undefined;
    allSeats$: Seat[] | undefined;
    availableSeats$: Seat[] | undefined;
    companySeats$: Seat[] | undefined;
    
    dashboardSummary$: any | undefined;
    
    constructor(
      private coworkingSpaceService: CoworkingSpaceService,
      private workspaceService: WorkspaceService,
      private companyService: CompanyService,
      private seatService: SeatService
    ) { }
  
    ngOnInit(): void {
      this.loadAllData();
    }
  
    loadAllData(): void {
      this.coworkingSpaceService.getCoworkingSpace().subscribe({
        next: (response) => {
          this.coworkingSpace$ = response; // Adjust if your API returns response.data
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
  
      this.workspaceService.getWorkspace().subscribe({
        next: (response) => {
          this.workspace$ = response; // Adjust if your API returns response.data
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
      
      this.companyService.getCompany().subscribe({
        next: (response) => {
          this.company$ = response.data; // You're using response.data here
          console.log(this.company$);
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
  
      this.seatService.getAllSeats().subscribe({
        next: (response) => {
          this.allSeats$ = response.data; // You're using response.data here
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
  
      this.seatService.getAvailableSeats().subscribe({
        next: (response) => {
          this.availableSeats$ = response.data; // You're using response.data here
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
  
      this.seatService.getSeatsByCompanyId(1).subscribe({
        next: (response) => {
          this.companySeats$ = response.data; // You're using response.data here
          this.updateDashboardSummary();
        },
        error: (error) => console.log(error.error)
      });
    }
  
    updateDashboardSummary(): void {
      if (this.coworkingSpace$ && this.workspace$ && this.company$ && 
          this.allSeats$ && this.availableSeats$ && this.companySeats$) {
        
        this.dashboardSummary$ = {
          coworkingSpace: this.coworkingSpace$,
          workspace: this.workspace$,
          company: this.company$,
          totalSeats: this.allSeats$.length,
          availableSeatsCount: this.availableSeats$.length,
          allocatedSeatsCount: this.companySeats$.length,
          occupancyRate: this.allSeats$.length > 0 ? 
            ((this.allSeats$.length - this.availableSeats$.length) / this.allSeats$.length * 100).toFixed(2) : 
            '0.00'
        };
        console.log(this.dashboardSummary$);
      }
    }
  }
  // coworkingSpace$: Observable<CoworkingSpace> | undefined;
  // workspace$: Observable<Workspace> | undefined;
  // company$: Observable<Company>| undefined;
  // allSeats$: Observable<Seat[]>| undefined;
  // availableSeats$: Observable<Seat[]>| undefined;
  // companySeats$: Observable<Seat[]>| undefined;

//   coworkingSpace$: CoworkingSpace | undefined;
//   workspace$: Workspace | undefined;
//   company$: Company| undefined;
//   allSeats$: Seat[]| undefined;
//   availableSeats$: Seat[]| undefined;
//   companySeats$: Seat[]| undefined;
  
//   dashboardSummary$: any| undefined;
  
//   constructor(
//     private coworkingSpaceService: CoworkingSpaceService,
//     private workspaceService: WorkspaceService,
//     private companyService: CompanyService,
//     private seatService: SeatService
//   ) { }

//   ngOnInit(): void {
//     // Initialize our observables
//      this.coworkingSpaceService.getCoworkingSpace().subscribe(
//       {
//         next:(response )=> {
//           this.coworkingSpace$=response;
//           // console.log(response);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );

//      this.workspaceService.getWorkspace().subscribe(
//       {
//         next:(response )=> {
//           this.workspace$=response;
//           // console.log(response);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );
     
//     this.companyService.getCompany().subscribe(
//       {
//         next:(response )=> {
//           this.company$=response.data;
//           console.log(this.company$);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );
//     this.seatService.getAllSeats().subscribe(
//       {
//         next:(response )=> {
//           this.allSeats$=response.data;
//           // console.log(response);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );
//      this.seatService.getAvailableSeats().subscribe(
//       {
//         next:(response )=> {
//           this.availableSeats$=response.data;
//           console.log(response);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );
//     this.seatService.getSeatsByCompanyId(1).subscribe(
//       {
//         next:(response )=> {
//           this.companySeats$=response.data;
//           // console.log(response);
//         },
//         error:(error)=>{
//           console.log(error.error);

//         }
//       }
//      );

//     // console.log(this.coworkingSpace$);
    
//   //   // Create a summary for the dashboard
//   //   this.dashboardSummary$ = combineLatest([
//   //     this.coworkingSpace$,
//   //     this.workspace$,
//   //     this.company$,
//   //     this.allSeats$,
//   //     this.availableSeats$,
//   //     this.companySeats$
//   //   ]).pipe(
//   //     map(([coworkingSpace, workspace, company, allSeats, availableSeats, companySeats]) => {
//   //       return {
//   //         coworkingSpace,
//   //         workspace,
//   //         company,
//   //         totalSeats: allSeats.length,
//   //         availableSeatsCount: availableSeats.length,
//   //         allocatedSeatsCount: companySeats.length,
//   //         occupancyRate: allSeats.length > 0 ? 
//   //           ((allSeats.length - availableSeats.length) / allSeats.length * 100).toFixed(2) : 
//   //           '0.00'
//   //       };
//   //     })
//   //   );
//   // }

//   if (this.coworkingSpace$ && this.workspace$ && this.company$ && 
//     this.allSeats$ && this.availableSeats$ && this.companySeats$) {
  
//   this.dashboardSummary$ = {
//     coworkingSpace: this.coworkingSpace$,
//     workspace: this.workspace$,
//     company: this.company$,
//     totalSeats: this.allSeats$.length,
//     availableSeatsCount: this.availableSeats$.length,
//     allocatedSeatsCount: this.companySeats$.length,
//     occupancyRate: this.allSeats$.length > 0 ? 
//       ((this.allSeats$.length - this.availableSeats$.length) / this.allSeats$.length * 100).toFixed(2) : 
//       '0.00'
//   };
// }
// console.log(this.dashboardSummary$);

// }
// }
