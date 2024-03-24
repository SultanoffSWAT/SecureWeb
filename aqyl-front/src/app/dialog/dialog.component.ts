import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input() message!: string;
  @Input() actionTitle!: string;

  @Output() close = new EventEmitter<void>();

  @Output() action = new EventEmitter<void>();

  cancelDialog(){
    this.close.emit()
  }

  applyAction(){
    this.action.emit()
    this.close.emit()
  }
}
