import fs from "fs";

const regions = ["North", "South", "East", "West"];
const genders = ["Male", "Female"];
const categories = ["Clothing", "Electronics", "Beauty"];
const payments = ["Cash", "Card", "UPI", "Wallet", "Net Banking"];
const tags = ["fashion", "casual", "premium", "new", "sale"];

const data = [];

for (let i = 1; i <= 100; i++) {
  data.push({
    transactionId: String(1000000 + i),
    date: `2023-09-${String((i % 28) + 1).padStart(2, "0")}`,
    customerId: `CUST${1000 + i}`,
    customerName: `Customer ${i}`,
    phoneNumber: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    gender: genders[i % 2],
    age: 20 + (i % 30),
    customerRegion: regions[i % 4],
    customerType: i % 2 === 0 ? "New" : "Returning",
    productId: `PROD-${i}`,
    productName: `Product ${i}`,
    brand: `Brand${i % 5}`,
    productCategory: categories[i % 3],
    tags: `${tags[i % 5]},${tags[(i + 1) % 5]}`,
    quantity: (i % 5) + 1,
    pricePerUnit: 500 + (i % 5) * 200,
    discountPercentage: (i % 4) * 5,
    totalAmount: 1000,
    finalAmount: 800 + (i % 5) * 100,
    paymentMethod: payments[i % 5],
    orderStatus: "Completed",
    deliveryType: "Home Delivery",
    storeId: `ST-${i % 5}`,
    storeLocation: "India",
    salespersonId: `EMP-${i}`,
    employeeName: `Employee ${i}`,
  });
}

fs.writeFileSync("./salesData.json", JSON.stringify(data, null, 2));
console.log("✅ 100 records generated");
