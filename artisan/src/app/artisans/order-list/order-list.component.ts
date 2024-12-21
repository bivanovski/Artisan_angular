import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

enum SearchField {
  All = 'all',
  CustomerName = 'customerName',
  Email = 'email',
  Address = 'address',
  OrderId = 'orderId'
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})

export class OrderListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orders: Order[] = [];
  dataSource = new MatTableDataSource<Order>([]);
  displayedColumns: string[] = [
    'id',
    'customerName',
    'customerEmail', 
    'customerAddress',
    'products',
    'quantity',
    'orderDate',
    'actions'
  ];
  isLoading: boolean = true;
  searchFields = SearchField;
  selectedSearchField: SearchField = SearchField.All;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      if (!filter) return true;
      
      switch (this.selectedSearchField) {
        case SearchField.CustomerName:
          return data.customer.fullName.toLowerCase().includes(filter);
        case SearchField.Email:
          return data.customer.email.toLowerCase().includes(filter);
        case SearchField.Address:
          return data.customer.address.toLowerCase().includes(filter);
        case SearchField.OrderId:
          return data.id.toString().includes(filter);
        case SearchField.All:
        default:
          return data.customer.fullName.toLowerCase().includes(filter) ||
                 data.customer.email.toLowerCase().includes(filter) ||
                 data.customer.address.toLowerCase().includes(filter) ||
                 data.id.toString().includes(filter);
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Order, property: string) => {
      switch(property) {
        case 'customerName': return item.customer?.fullName || '';
        case 'customerEmail': return item.customer?.email || '';
        case 'customerAddress': return item.customer?.address || '';
        case 'orderDate': return new Date(item.orderDate).getTime();
        case 'quantity': return item.quantity;
        case 'products': return item.products?.length || 0;
        case 'id': return item.id;
        default: {
          console.warn(`Sort property ${property} not handled`);
          return '';
        }
      }
    };
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      return data.customer.fullName.toLowerCase().includes(filter) ||
             data.customer.email.toLowerCase().includes(filter) ||
             data.customer.address.toLowerCase().includes(filter) ||
             data.id.toString().includes(filter);
    };
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.dataSource.data = orders;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      }
    });
  }

  deleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      width: '250px',
      data: { orderId: order.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.deleteOrder(order.id).subscribe(
          () => {
            this.orders = this.orders.filter((o) => o.id !== order.id);
            this.dataSource.data = this.orders;
            console.log('Order deleted:', order);
          },
          (error) => {
            console.error('Error deleting order:', error);
          }
        );
      }
    });
  }
}