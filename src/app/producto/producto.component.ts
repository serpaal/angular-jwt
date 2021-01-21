import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductoService } from '../services/producto.service';




@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnDestroy {

  //dtOptions: DataTables.Settings = {};
  products: any[] = [];
  // We use this trigger because fetching the list of products can be quite long,
  // thus we ensure the data is fetched before rendering
 // dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };*/

    this.products = this.productoService.getProductos()
      .subscribe(data => {
        this.products = data.rows;
        // Calling the DT trigger to manually render the table
        //this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

}
