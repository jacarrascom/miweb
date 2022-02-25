import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Quote} from '../../interfaces/Quote';
import {QuoteService} from '../../services/quote.service';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss']
})
export class QuoteDetailComponent implements OnInit {
  quote: Quote | undefined;
  isLogged: boolean;
  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.isLogged = this.loginService.getIsLogged();
    const code = this.route.snapshot.params['id'];
    // this.quote = this.quoteService.getQuote(code);
    this.quoteService.getQuoteList({tipo: 3, categorias: []}).subscribe((item: any) => {
      console.log(item)
      if (item.codigo >= 1) {
        if (item.dato != null) {
          item.dato.forEach((value: any) => {
            if (value.id == code) {
              let contacts = []

              value.contactos.forEach(element => {
                let contact = {cellphone: element.telefono, name: element.nombre, email: element.correo, item: element.item}
                contacts.push(contact)
              })
              this.quote = {
                id: value.id,
                contacts: contacts,
                description: value.nombre,
                file: value.archivos,
                publicationDate: value.fec_ini,
                limitDate: value.fec_fin,
                requerimentName: 'Nombre de requerimiento',
                marked: false,
                postulated: false,
                features: "string",
                products: [],
              }
            }
          })
        }
      }
    });
  }

  get total(): number {
    // if (this.quote) {
    //   return this.quote.products
    //     .map(q => q.price * q.quantity)
    //     .reduce((current, prev) => current + prev);
    // }
    return 0
  }

  ngOnInit()
    :
    void {
  }

  sendQuote(id
              :
              string | undefined
  ) {
    if (id) {
      this.quoteService.sendQuote(id);
      this.refreshComponent(id);
    }
  }

  refreshComponent(id
                     :
                     string
  ) {
    this.router.navigateByUrl('/cotizaciones', {skipLocationChange: true}).then(() => {
      this.router.navigate([`/cotizaciones/detalle/${id}`]);
    });
  }
}
