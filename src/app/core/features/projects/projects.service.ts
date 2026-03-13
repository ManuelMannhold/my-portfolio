import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private projects: Project[] = [
    {
      id: 'join',
      title: 'Join',
      tech: 'HTML | CSS | JavaScript | Firebase',
      descriptionKey: 'portfolio.join',
      image: '/img/join-new.png',
      liveUrl: 'https://join.manuel-mannhold.de/index.html',
      githubUrl: 'https://github.com/ManuelMannhold/join',
      type: 'javascript',
    },
    {
      id: 'pollo',
      title: 'El Pollo Locco',
      tech: 'HTML | CSS | JavaScript',
      descriptionKey: 'portfolio.pollo',
      image: '/img/pollo-locco-new.png',
      liveUrl: 'https://el-pollo-loco.manuel-mannhold.de/index.html',
      githubUrl: 'https://github.com/ManuelMannhold/el-pollo-loco',
      type: 'javascript',
    },
    {
      id: 'pronode',
      title: 'ProNode',
      tech: 'TypeScript | Angular | Firebase | Angular Material',
      descriptionKey: 'portfolio.pronode',
      image: '/img/pronode-project.png',
      imageSecondary: '/img/pronode-login.png',
      liveUrl: 'https://pronode.manuel-mannhold.de/login',
      githubUrl: 'https://github.com/ManuelMannhold/proNode',
      type: 'angular',
    }
  ];

  getProjects(): Project[] {
    return this.projects.slice();
  }
}
