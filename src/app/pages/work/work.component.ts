import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  DetailProduct!: IProject;
  constructor(
    private projectService: ProjectService,
    private activateRoute: ActivatedRoute
    ) { 
  }
  id!: number;
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id']
    this.projectService.getPost(this.id).subscribe((data) => {
      this.DetailProduct = data
    })
  }
}