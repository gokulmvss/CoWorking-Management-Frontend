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
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  imports: [NgIf,AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  coworkingSpace$: Observable<CoworkingSpace> | undefined;
  workspace$: Observable<Workspace> | undefined;
  company$: Observable<Company>| undefined;
  allSeats$: Observable<Seat[]>| undefined;
  availableSeats$: Observable<Seat[]>| undefined;
  companySeats$: Observable<Seat[]>| undefined;
  
  dashboardSummary$: Observable<any>| undefined;
  
  constructor(
    private coworkingSpaceService: CoworkingSpaceService,
    private workspaceService: WorkspaceService,
    private companyService: CompanyService,
    private seatService: SeatService
  ) { }

  ngOnInit(): void {
    // Initialize our observables
    this.coworkingSpace$ = this.coworkingSpaceService.getCoworkingSpace();
    this.workspace$ = this.workspaceService.getWorkspace();
    this.company$ = this.companyService.getCompany();
    this.allSeats$ = this.seatService.getAllSeats();
    this.availableSeats$ = this.seatService.getAvailableSeats();
    this.companySeats$ = this.seatService.getSeatsByCompanyId(1);
    
    // Create a summary for the dashboard
    this.dashboardSummary$ = combineLatest([
      this.coworkingSpace$,
      this.workspace$,
      this.company$,
      this.allSeats$,
      this.availableSeats$,
      this.companySeats$
    ]).pipe(
      map(([coworkingSpace, workspace, company, allSeats, availableSeats, companySeats]) => {
        return {
          coworkingSpace,
          workspace,
          company,
          totalSeats: allSeats.length,
          availableSeatsCount: availableSeats.length,
          allocatedSeatsCount: companySeats.length,
          occupancyRate: allSeats.length > 0 ? 
            ((allSeats.length - availableSeats.length) / allSeats.length * 100).toFixed(2) : 
            '0.00'
        };
      })
    );
  }
}
