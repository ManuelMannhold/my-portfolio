import { Component, Inject, inject, Input, Optional } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PortfolioService } from './projects.service';
import { Project } from './project.model';
import { MatIconModule } from "@angular/material/icon";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-projects',
  imports: [TranslateModule, MatIconModule],
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  @Input() isModal: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isModal = !!data;
  }

   translate = inject(TranslateService);
   projects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter = 'all';
   private portfolioService = inject(PortfolioService);

   ngOnInit() {
    this.projects = this.portfolioService.getProjects();
    this.filteredProjects = this.projects;
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.type === filter);
    }
  }
}
