'use strict';

class Hamburger {
  #ingredients = [];

  static SIZE = {
    small: {
      type: 'size',
      name: 'small',
      price: 50,
      calories: 20,
    },

    big: {
      type: 'size',
      name: 'big',
      price: 100,
      calories: 40,
    },
  };

  static STUFFING = {
    cheese: {
      type: 'stuffing',
      name: 'cheese',
      price: 10,
      calories: 20,
    },

    salad: {
      type: 'stuffing',
      name: 'salad',
      price: 20,
      calories: 5,
    },

    potato: {
      type: 'stuffing',
      name: 'potato',
      price: 15,
      calories: 10,
    },
  };

  static TOPPING = {
    flavoring: {
      type: 'topping',
      name: 'flavoring',
      price: 15,
      calories: 0,
    },

    mayonnaise: {
      type: 'topping',
      name: 'mayonnaise',
      price: 20,
      calories: 5,
    },
  };

  constructor(size, stuffing) {
    this.#ingredients.push(size, stuffing);
  }

  addTopping(topping) {
    this.#ingredients.push(topping);
  }

  calculatePrice() {
    return this.#ingredients.reduce((accumulate, item) => accumulate + item.price, 0);
  }

  calculateCalories() {
    return this.#ingredients.reduce((accumulate, item) => accumulate + item.calories, 0);
  }

  #getIngredient(ingredientType) {
    return this.#ingredients.find((ingredient) => ingredient.type === ingredientType);
  }

  #getIngredients(ingredientType) {
    return this.#ingredients.filter((ingredient) => ingredient.type === ingredientType);
  }

  getCompound() {
    const size = this.#getIngredient('size');
    const stuffing = this.#getIngredient('stuffing');
    const toppings = this.#getIngredients('topping');
    const sizeString = `Size: ${size.name} (calories: ${size.calories}, price: ${size.price})`;
    const stuffingString = `Stuffing: ${stuffing.name} (calories: ${stuffing.calories}, price: ${stuffing.price})`;

    let toppingsString = '';
    if (toppings.length) {
      const toppingsData = toppings.reduce((accumulate, value) => {
        accumulate.names.push(value.name);
        accumulate.calories += value.calories;
        accumulate.price += value.price;

        return accumulate;
      }, { names: [], calories: 0, price: 0 });

      toppingsString = `,\n - Toppings: ${toppingsData.names.map((name) => name).join(', ')} (calories: ${toppingsData.calories}, price: ${toppingsData.price})`;
    }

    return `Compounds:\n - ${sizeString},\n - ${stuffingString}${toppingsString}`;
  }
}


// Перевірка
const hamburger = new Hamburger(Hamburger.SIZE.small, Hamburger.STUFFING.cheese);
console.log(hamburger.getCompound());
// добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING.mayonnaise);
console.log(hamburger.getCompound());
// запитаємо скільки там калорій
console.log(`Calories: ${hamburger.calculateCalories()}`);
// скільки коштує
console.log(`Price: ${hamburger.calculatePrice()}`);
// я тут передумав і вирішив додати ще приправу
hamburger.addTopping(Hamburger.TOPPING.flavoring);
console.log(hamburger.getCompound());
// А скільки тепер коштує?
console.log(`Price: ${hamburger.calculatePrice()} tughriks`);
