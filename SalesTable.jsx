import React from "react";

export default function SalesTable({ items }) {
  if (!items.length) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Customer Region</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Total Amount</th>
          <th>Final Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row, idx) => (
          <tr key={row.transactionId + "-" + idx}>
            <td>{row.transactionId}</td>
            <td>{row.date}</td>
            <td>{row.customerId}</td>
            <td>{row.customerName}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.gender}</td>
            <td>{row.age}</td>
            <td>{row.customerRegion}</td>
            <td>{row.productCategory}</td>
            <td>{row.quantity}</td>
            <td>{row.totalAmount}</td>
            <td>{row.finalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
