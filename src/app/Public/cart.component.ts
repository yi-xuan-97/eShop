import { Component, OnInit } from '@angular/core';
import { CartService } from '../Core/Services/cart.service';
import { CartItem } from '../Shared/Models/CartItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotalPrice();
  }

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
    this.items = this.cartService.getItems();  // Update the list
    this.total = this.cartService.getTotalPrice();  // Update the total price
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];  // Clear the items
    this.total = 0;  // Reset the total price
  }
  
  checkout() {
    console.log(this.items);
    this.cartService.checkOut(this.items).subscribe({
      next: (response) => {     
        console.log(response);
        this.router.navigateByUrl('/Order');
        this.clearCart();
      },
      error: (error) => {
        // Handle error, such as showing an error message.
        console.error(error);
      },
    });
  }
}
