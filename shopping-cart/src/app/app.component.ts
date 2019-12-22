import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Rohan Online Shopping Portal";
  items: any = [];

  private cart = {
    quantity: 0,
    overall_price: 0
  };
  constructor(private service: AppService) {}

  ngOnInit() {
    this.service.getData().subscribe(res => {
      this.items = res;
      for (var i = 0; i < this.items.length; i++) {
        this.items[i]["selected_quantity"] = 0;
      }
      console.log(this.items);
    });
  }

  addbutton(item) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]["product_name"] == item["product_name"]) {
        this.items[i]["selected_quantity"] =
          this.items[i]["selected_quantity"] + 1;
      }
    }
  }

  subtractbutton(item) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]["product_name"] == item["product_name"]) {
        if (this.items[i]["selected_quantity"] > 0) {
          this.items[i]["selected_quantity"] =
            this.items[i]["selected_quantity"] - 1;
        } else {
          alert("Cannot have a negative quantity.");
        }
      }
    }
    if (this.cart.overall_price > 0 && this.cart.quantity > 0) {
      this.cart.quantity = this.cart.quantity - 1;
      this.cart.overall_price = this.cart.overall_price - item.price;
    }
  }

  addToCart(item) {
    this.cart.quantity = this.cart.quantity + item.selected_quantity;
    this.cart.overall_price =
      this.cart.overall_price + item.price * item.selected_quantity;
  }

  checkout() {
    if (this.cart.overall_price > 0) {
      alert("Transaction successfull.Thank you for shopping with us.");
    } else {
      alert(
        "Your shopping cart is empty. Please add some products to your cart."
      );
    }
  }
  clearCart() {
    this.cart.overall_price = 0;
    this.cart.quantity = 0;
  }
}
