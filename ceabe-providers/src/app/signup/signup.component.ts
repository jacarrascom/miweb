import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from "../models/category";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../models/contact";
import {UserService} from "../services/user.service";
import {OAuthService} from "angular-oauth2-oidc";
import {ModalSignupComponent} from "./modal.signup.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoadingComponent} from "../loading/loading.component";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})


export class SignupComponent implements OnInit {

  activeIds: string[] = ['categories', 'supplier', 'representative'];

  ruc = new FormControl('', [Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.minLength(11),
  ]);


  rucError = {status: false, title: '', message: ''}
  categoryError = {status: false, title: '', message: ''}
  businessName: string = "";
  categoryList: Category[] = [];
  categorySelect: Category[] = [];
  contacts: Contact[] = [new Contact(),]
  public formSupplier: FormGroup;
  public formReport: FormGroup;
  public progress: MatDialogRef<LoadingComponent>;

  validateAccount = ''
  statusAccount = {
    empty: 'empty',
    exists: 'exists',
  }

  constructor(private userService: UserService, private router: Router,
              private formBuilder: FormBuilder, private oauthService: OAuthService,
              public dialog: MatDialog
              // config: NgbModalConfig, private modalService: NgbModal
  ) {
    // config.backdrop = 'static';
    // config.keyboard = false;
  }

  ngOnInit(): void {

    this.formSupplier = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      representative: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      categories: new FormArray([]),
      contacts: new FormArray([]),
      captcha: new FormControl('', [Validators.required])
    })

    this.formReport = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(3)]],
    })

    this.loadCategoryList();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSupplier.controls;
  }

  open() {
    // const modalRef = this.modalService.open(ModalSignupComponent);
    // modalRef.componentInstance.name = 'World';
  }

  addContact() {
    this.contacts.push(new Contact())
  }

  onCategoryChange(event) {
    const formArray: FormArray = this.formSupplier.get('categories') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  sendFormEmitter(event) {
    const formArray: FormArray = this.formSupplier.get('contacts') as FormArray;
    formArray.controls[event.value.index] = event;
  }

  registerFormEmitter(event) {
    const formArray: FormArray = this.formSupplier.get('contacts') as FormArray;
    formArray.push(event);
  }

  removeFormEmitter(event) {
    const formArray: FormArray = this.formSupplier.get('contacts') as FormArray;

    let i: number = 0;
    formArray.controls.forEach((group: FormGroup) => {
      if (group.value.index == event.value.index) {
        formArray.removeAt(i);
        return;
      }
      i++;
    });

    this.contacts.splice(i, 1);

  }

  onRegisterSupplier(): void {

    this.categorySelect = []
    this.formSupplier.value.categories.forEach(id => {
      this.categorySelect.push(this.categoryList.find(cat => cat.code == id))
    });
    this.formSupplier.value.categories = this.categorySelect

    if (this.businessName == null || this.businessName.length == 0) {
      this.rucError.title = 'RUC vacio:';
      this.rucError.message = 'Para poder registrarte tienes que validar tu RUC.';
      this.rucError.status = true;

      console.log('error', 'CEABE', 'Se debe buscar un ruc.');
    } else if (this.categorySelect.length == 0) {
      this.categoryError.title = 'Categoria Vacio:';
      this.categoryError.message = 'Para poder registrarte tienes que seleccionar una categoria.';
      this.categoryError.status = true;
      console.log('error', 'CEABE', 'Se deben seleccionar categorias.');
    } else {
      let data = {
        "ruc": this.ruc,
        "businessName": this.businessName,
        ...this.formSupplier.value
      }
      this.userService.registerSupplier(data).subscribe(
        data => {
          this.onSuccessRegister();
        },
        err => console.log(err)
      );
    }
  }

  searchRUC() {
    if (this.ruc.hasError('required')) {
      console.log('El RUC es obligatorio')
      return 'El RUC es obligatorio';
    }

    let ruc = this.ruc.value.toString()
    if (ruc.toString().length < 11) {
      console.log('error', 'CEABE', 'Se debe ingresar un RUC válido');
      this.rucError.title = 'RUC erroneo:';
      this.rucError.message = 'Ingrese un RUC válido';
      this.rucError.status = true;
      return ''
    } else {
      console.log('entro al else')
      this.showProgress();
      this.rucError.status = false;
      this.userService.getProfileSupplier(this.ruc.value)
        .subscribe((item) => {
          console.log(item)
          this.businessName = item.businessName
          // this.ruc = ruc
          this.formSupplier.value.businessName = item.businessName
          this.validateAccount = this.statusAccount.exists
        }, (error) => {
          this.userService.searchByRUC(this.ruc.value).subscribe((dataItem) => {

            if (dataItem.codigo >= 1) {
              this.businessName = dataItem.dato.razonSocial
              // this.ruc = ruc
              this.formSupplier.value.businessName = dataItem.dato.razonSocial
              this.validateAccount = this.statusAccount.empty
            } else {
              this.validateAccount = ''
              this.rucError.title = 'RUC no encontrado:';
              this.rucError.message = 'No pudimos encontrar tu RUC corrigelo y vuelve a intentarlo';
              this.rucError.status = true;
            }
            this.hideProgress();
          });
        });
    }
  }

  loadCategoryList() {
    this.userService.getCategoryList({}).subscribe((dataItem) => {
      if (dataItem.codigo >= 1) {
        dataItem.dato.forEach((item) => {
          this.categoryList.push(new Category(item.id, item.nombre, item.total))
        });
      } else {
        console.log('error', 'CEABE', 'Se produjo un error');
      }
    });
  }

  onSuccessRegister(): void {
    window.location.href = 'http://localhost:4200/cotizaciones';
  }

  openAll() {
    this.activeIds = ['categories', 'supplier', 'representative'];
    console.log(this.activeIds);
  }


  sendReport() {
    let data = {
      ruc: this.ruc,
      ...this.formReport.value
    }

    this.userService.sendReport(data).subscribe(item => {
      console.log(item)
      this.open();
    }, error => {
      console.log(error)
    });
  }

  private hideProgress() {
    this.progress.close();
  }

  showProgress() {
    this.progress = this.dialog.open(LoadingComponent, {
      panelClass: 'transparent',
      disableClose: true,
      data: {}
    });

  }


}
