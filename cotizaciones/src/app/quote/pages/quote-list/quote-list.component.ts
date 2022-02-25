import {Component, OnInit} from '@angular/core';
import {SelectorOption} from '../../components/selector/selector.component';
import {QuoteList} from '../../interfaces/QuoteList';
import {QuoteService} from '../../services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent  implements OnInit  {
  quotes: QuoteList[] = [];
  quotes_all: QuoteList[] = [];
  filteredQuotes: QuoteList[] = [];

  statusFilterOptions: SelectorOption[] = [
    {value: "active", caption: 'Vigente'},
    {value: "finish", caption: 'Finalizado'},
    {value: "all", caption: 'Todos'},
    {value: "only_marcado", caption: 'Me interesa'},
  ]

  numberPagesOptions: SelectorOption[] = [
    {value: "6", caption: 'Ver 6 páginas'},
    {value: "9", caption: 'Ver 9 páginas'},
    {value: "12", caption: 'Ver 12 páginas'},
    {value: "15", caption: 'Ver 15 páginas'},
  ]

  headquartersOptions: any = []

  categoriesOptions: any = [];

  pageSize = 6;
  numberOfPages = 0;

  _currentPage = 1;
  set currentPage(page: number) {
    this._currentPage = page;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get displayedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredQuotes.slice(start, end);
  }

  constructor(private quoteService: QuoteService) {
    this.headquartersOptions = this.quoteService.getHeadquarters();
    this.quoteService.getCategories({}).subscribe((item) => {
      // {value: false, caption: "Producto Farmaceutico", counter: 1000},
      if (item.codigo >= 1) {
        item.dato.forEach((value: any) => {
          let categoria = {id: value.id, value: false, caption: value.nombre, counter: value.total}
          this.categoriesOptions.push(categoria)
        })
      }
    });

    // Estados | 2 => Inactivo
    this.quoteService.getQuoteList({tipo: 3, categorias: []}).subscribe((item: any) => {
      if (item.codigo >= 1) {
        if (item.dato != null) {
          console.log(item.dato.length)
          item.dato.forEach((value: any) => {
            console.log(value)
            let category = {};
            this.categoriesOptions.forEach((cat: any) => {
              if (cat.id ==  value.id_categoria){
                category = cat
              }
            })

            let quote = {
              id: value.id,
              description: value.nombre,
              files: value.archivos[0],
              publicationDate: value.fec_ini,
              limitDate: value.fec_fin,
              requerimentName: 'Publicado: 00-00-00 00:00' ,
              marked: false,
              postulated: false,
              category: category
            }

            // //  activo
            // if (value.estado == 1 && value.idestado == 2) {
            //   this.quotes.push(quote)
            // }
            // if (value.estado == 0 && value.idestado == 2) {
            //   //finalizado
            // }
            // if (value.estado == 2 && value.idestado == 4) {
            //   //anulado
            // }
            // if (value.estado == 2 && value.idestado == 3) {
            //   //  inactivo
            // }


            // this.quotes_all.push(quote)
            this.quotes.push(quote)
          })

          this.filteredQuotes = this.quotes;
          this.setNumberOfPage();
        }
      }
    });
    // this.displayedItems();


  }


  setNumberOfPage() {
    this.numberOfPages = Math.floor((this.filteredQuotes.length + this.pageSize) / this.pageSize);
  }

  search(filter: string) {
    if (this.quotes && filter) {
      filter = filter.toUpperCase();
      this.filteredQuotes = this.quotes.filter(quote => quote.description.toUpperCase().includes(filter));
    } else {
      this.filteredQuotes = this.quotes;
    }
    this.setNumberOfPage();
  }

  onChangeStatusSelect(evt: any) {
    // this.quotes = []
    // this.quotes_all.forEach((item: any) => {
    //   //  inactivo
    //   if (item.estado == 2 && item.idestado == 3) {
    //     let quote = {
    //       id: item.id,
    //       description: item.nombre,
    //       files: item.archivos[0],
    //       publicationDate: item.fec_ini,
    //       limitDate: item.fec_fin,
    //       requerimentName: 'Nombre de requerimiento',
    //       marked: false,
    //       postulated: false
    //     }
    //     this.quotes.push(quote)
    //   }
    // })
  }

  onChangeNumberPageSelect(evt: any) {
    console.log(evt.value)
    this.pageSize = evt.value
  }

  goNextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }

  goPreviusPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnInit(): void {
  }
}
