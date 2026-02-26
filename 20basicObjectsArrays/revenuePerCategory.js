function revenuePerCategory(arr) {
    let result = {};
    for(const {category, price} of arr ){
        result[category] = (result[category] ?? 0) + price;
    }
    return result;
}

console.log(revenuePerCategory([
  { id: 1, category: "electronics", price: 100 },
  { id: 2, category: "clothes", price: 50 },
  { id: 3, category: "electronics", price: 200 }
]
));