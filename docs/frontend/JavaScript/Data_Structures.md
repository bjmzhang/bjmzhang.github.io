# Array Destructuring

**Destructuring** is basically a way of unpacking values from an array or an object into separate variables.

In other words, **destructuring** is to break a complex data structure down into a smaller data structure like a variable.

_Without Destructuring:_

```js
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
```

_With Destructuring:_

```js
const [x, y, z] = arr; // [x, y, z] is not an array, it's just the destructuring assignment.
console.log(x, y, z); // 2 3 4
```

> 1. Whenever JavaScript sees an 'array' (actually is a **destructuring assignment**) on the left side of the equal sign, it knows that it should do destructuring.
> 2. Don't forget to also declare the variables using _const_.
> 3. Even though we did destructuring, the original array is not affected.

```js
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
};

const [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian
```

_Switching variables without destructuring:_

```js
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);
```

_Switching variables with destructuring:_

```js
let [main, , secondary]
[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegetarian Italian
```

_Add a new property:_

```js
restaurant.order = function (starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
};
```

_Receive 2 return values from a function:_

```js
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread Pizza
```

_Nested destructuring:_

```js
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]
const [l, , [m, n]] = nested;
console.log(l, m, n); // 2 5 6
```

_Set default values:_

```js
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8 9 undefined
const [s = 1, t = 1, u = 1] = [8, 9];
console.log(s, t, u); // 8 9 1
```

# Object Destructuring

```js
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
```

_create an object getting data from an array_

```js
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
```

_create new name while destructuring_

```js
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
```

_Set default values_

```js
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // [] ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
```

_Mutating variables while destructuring objects_

```js
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj); // MUST add parentheses
console.log(a, b);
```

_Nested objects_

```js
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 11 23
```

_Add a new function to the object:_

```js
restaurant.orderDelivery = function ({
  starterIndex,
  mainIndex,
  time,
  address,
}) {
  console.log(
    `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  );
};
```

_Call the function:_

```js
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});
```

# The Spread Operator(...)

We can use the **spread operator (...)** to basically expand an array into all its elements. It allows us to quickly copy all or part of an existing array or object into another array or object.

_Create a new array WITHOUT spread operator:_

```js
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 7, 8, 9]
```

_Create a new array WITH spread operator:_

```js
const newArr = [1, 2, ...arr];
console.log(newArr); // [1, 2, 7, 8, 9]
console.log(..newArr); // 1 2 7 8 9
```

```js
const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);
```

// Case: create shallow copies of arrays

```js
const mainMenuCopy = [...restaurant.mainMenu];
const menu = [...restaurant.mainMenu, starterMenu];
```

The **spread operator (...)** works on all so-called **iterables**.

- Iterables: arrays, strings, maps, sets. **NOT** objects.

```js
const str = "bowen";
const letters = [...str, " ", "s."];
console.log(letters); // ['b', 'o', 'w', 'e', 'n', ' ', 's.']
```

- Multiple values separated by a comma are usually expected when we pass arguments into a function, or when we build a new array.

_Real-world example_

```js
const restaurant = {
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
};
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("Ingredient 2?"),
  prompt("Ingredient 3"),
];
console.log(ingredients);
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);
```

_Objects_

```js
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant,
  founder: "Guiseppe",
};
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);
```

# Rest Pattern and Parameters
