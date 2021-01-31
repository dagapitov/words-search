import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input()
  status: string;

  @Input()
  progress: number;

  constructor() { }

  ngOnInit(): void {
  }

}
