import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../models/contact";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

class DataService {
}

class ExampleDataSource {
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() title: String;
  @Input() index: number = 0;
  @Input() contact: Contact;
  formContact: FormGroup;
  @Output() sendFormEmitter = new EventEmitter<FormGroup>();
  @Output() registerFormEmitter = new EventEmitter<FormGroup>();
  @Output() removeFormEmitter = new EventEmitter<FormGroup>();


  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  // index: number;
  id: number;


  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient,
              public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required,]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      index: [this.index, [Validators.required]],
    })
    this.formContact.patchValue({
      name: this.contact.name,
      lastName: this.contact.lastName,
      email: this.contact.email,
      position: this.contact.position,
      phone: this.contact.phone,
    });
    this.registerForm();
    this.loadData();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formContact.controls;
  }

  registerForm() {
    this.registerFormEmitter.emit(this.formContact);
  }

  removeForm() {
    console.log("CONTACT", "remove Form")
    this.removeFormEmitter.emit(this.formContact);
  }

  sendForm() {
    this.sendFormEmitter.emit(this.formContact);
  }


  refresh() {
    this.loadData();
  }

  public loadData() {

  }

  addNew(): void {
    console.log('add new')
    // const dialogRef = this.dialog.open(AddDialogComponent, {
    //   data: {issue: Issue }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     // After dialog is closed we're doing frontend updates
    //     // For add we're just pushing a new row inside DataService
    //     this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
    //     this.refreshTable();
    //   }
    // });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    // this.id = id;
    // // index row is used just for debugging proposes and can be removed
    // this.index = i;
    // console.log(this.index);
    // const dialogRef = this.dialog.open(EditDialogComponent, {
    //   data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
    //     // Then you update that record using data from dialogData (values you enetered)
    //     this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
    //     // And lastly refresh table
    //     this.refreshTable();
    //   }
    // });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    // this.index = i;
    // this.id = id;
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   data: {id: id, title: title, state: state, url: url}
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
    //     // for delete we use splice in order to remove single object from DataService
    //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    //     this.refreshTable();
    //   }
    // });
  }


}
