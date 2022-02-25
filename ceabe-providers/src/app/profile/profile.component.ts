import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {filter} from "rxjs";
import {Category} from "../models/category";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {getProjectTargetOptions} from "@angular/cdk/schematics";
import {Contact} from "../models/contact";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  businessName: String;

  categoryList: Category[] = []
  public formSupplier: FormGroup;
  contacts: Contact[] = []

  constructor(private loginService: LoginService,
              private userService: UserService,
              private oauthService: OAuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formSupplier = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      representative: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      categories: new FormArray([]),
      contacts: new FormArray([]),
    })


    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.username = this.loginService.getUsername();
          this.businessName = this.loginService.getName();
          // this.
          this.userService.getProfileSupplier(this.username).subscribe(profile => {
            console.log(profile)
            this.categoryList = profile.categories
            this.formSupplier.patchValue({
              email: profile.email,
              representative: profile.representative,
              phone: profile.phone,
              cellphone: profile.cellphone,
            });
            this.contacts = profile.contacts
          });
        }
      });

    this.oauthService.events.pipe(filter(e => e.type === 'session_terminated')).subscribe(e => {
      console.debug('Your session has been terminated!');
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSupplier.controls;
  }


  onUpdateSupplier() {

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

  addContact() {
    this.contacts.push(new Contact())
  }

  goToHome(): void {
    window.location.href = 'http://localhost:4200/cotizaciones/';
  }
}

// FIX

// Button de postular
// Mostar la OEC QUE CONVOCA - EN EL DETALLE
// Mostrar la fecha de publicacion en la lista
// Compartir por redes

// Guardar numero de vistas

// Iconos en los botones de menu
// Colores a los botones del menu


// Mostrar que categoria es en cada requerimiento
// Mostrar que sede es en cada requerimiento


// Coregir paginacion
// Coregir el descargar y revisar como esta en PROD

// Nombre del proveedor

// Customizar el login con la barra de navegacion
// Preview de documentos suvidos

// Agregar el tipo de documentos a los iconos
// Maximo de tamaño 50 megas
