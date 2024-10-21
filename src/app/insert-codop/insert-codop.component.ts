import { Component, OnInit } from '@angular/core';
import { CodopsService } from '../services/codops.service';

@Component({
  selector: 'app-insert-codop',
  templateUrl: './insert-codop.component.html',
  styleUrls: ['./insert-codop.component.css']
})
export class InsertCodopComponent implements OnInit {

  constructor(private codopsService: CodopsService) { }

  ngOnInit() {
  }

}
