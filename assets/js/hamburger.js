'use strict';

class Topping {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}
class Hamburger {
  constructor(size) {
    this.size = size || 'big';
    this.topping = [];
    this.price = size === 'big' ? 100 : 50;
    this.calories = size === 'big' ? 40 : 20;
  }
  addTopping(topping) {
    this.topping.push(topping);
  }
  removeTopping(topping) {
    this.topping.splice(this.topping.indexOf(topping));
  }
  getSize() {
    return this.size;
  }
  getTopping() {
    return this.topping;
  }
  calculatePrice() {
    this.topping.map(item => {
      this.price += item.price;
    })
    return this.price;
  }
  calculateCalories() {
    this.topping.map(item => {
      console.log(item);
      this.calories += item.calories;
    })
    return this.calories;
  }
}
