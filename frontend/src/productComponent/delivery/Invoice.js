import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Invoice.css";

const Invoice = ({ orderID, deliveryDate, shippingBy, contact, orderList }) => {
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.text("Invoice", 20, 10);
    doc.text(`Order ID: ${orderID}`, 20, 20);
    doc.text(`Estimated Delivery: ${deliveryDate}`, 20, 30);
    doc.text(`Shipping By: ${shippingBy}`, 20, 40);
    doc.text(`Contact: ${contact}`, 20, 50);

    const tableColumn = ["Product Name", "Price", "Quantity"];
    const tableRows = [];

    orderList.forEach((order) => {
      const orderData = [order.NAME, order.PRICE, order.QUANTITY];
      tableRows.push(orderData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    doc.save(`invoice_${orderID}.pdf`);
  };

  return (
    <div>
        <button className="Download-button"onClick={generatePDF}>Download Invoice</button>
    </div>
  );
};

export default Invoice;
