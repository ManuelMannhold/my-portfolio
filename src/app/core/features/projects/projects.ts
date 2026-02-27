import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PortfolioService } from './projects.service';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
   @Input() isModal: boolean = false;
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
