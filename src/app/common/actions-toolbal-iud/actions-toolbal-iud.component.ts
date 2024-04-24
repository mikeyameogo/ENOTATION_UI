import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions-toolbal-iud',
  templateUrl: './actions-toolbal-iud.component.html',
  styleUrls: ['./actions-toolbal-iud.component.scss']
})
export class ActionsToolbalIudComponent implements OnInit {
  @Input() enableBtnInfo!: boolean;
  @Input() enableBtnEdit!: boolean;
  @Input() enableBtnNoter!: boolean;
  @Input() enableBtnAttribuer!: boolean;
  @Input() enableBtnDelete!: boolean;
  @Input() enableBtnPrivilege?: boolean=false ;
  @Input() enableBtnPrint!: boolean;
  @Input() enableBtnCloture!: boolean;
  @Input() enableBtnRejeter!: boolean;
  @Input() enableBtnAccepter!: boolean;
  @Input() enableBtnRejeterNote!: boolean;

  @Output() info: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() privilege: EventEmitter<any> = new EventEmitter();
  @Output() print: EventEmitter<any> = new EventEmitter();
  @Output() cloture: EventEmitter<any> = new EventEmitter();
  @Output() rejeter: EventEmitter<any> = new EventEmitter();
  @Output() accepter: EventEmitter<any> = new EventEmitter();
  @Output() rejeterNote: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

   fireInfo() {
    this.info.emit();
  }

  fireEdit() {
    this.edit.emit();
  }

  fireDelete() {
    this.delete.emit();
  }

  firePrivilege() {
    this.privilege.emit();
  }

  firePrint() {
    this.print.emit();
  }

  fireCloture() {
    this.cloture.emit();
  }

  fireRejeter() {
    this.rejeter.emit();
  }

  fireAccepter() {
    this.accepter.emit();
  }

  fireRejeterNote() {
    this.rejeterNote.emit();
  }

}
