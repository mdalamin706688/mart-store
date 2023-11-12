import { useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { auth as firebaseAuth } from '../../utils/firebase';
import { firestore } from '../../utils/firebase';
import {
  collection,
  query,
  getDocs,
  DocumentData,
} from '@firebase/firestore';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet-async';

function Dashboard() {
  const [orderHistory, setOrderHistory] = useState<DocumentData[]>([]);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (user) {
      const userOrdersRef = collection(firestore, `users/${user.uid}/orders`);
      const userOrdersQuery = query(userOrdersRef);

      getDocs(userOrdersQuery)
        .then((querySnapshot) => {
          const orders: DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            orders.push(doc.data());
          });
          setOrderHistory(orders);
        })
        .catch((error) => {
          console.error('Error fetching order history:', error);
        });
    }
  }, []);

  const downloadOrderHistoryAsPdf = () => {
    const pdf = new jsPDF();

    orderHistory.forEach((order, index) => {
      pdf.text(`Order Date: ${order.timestamp}`, 10, 10);
      
      order.items.forEach((item: { name: any; quantity: any; price: number; }, itemIndex: number) => {
        const yOffset = 20 + itemIndex * 20;
        pdf.text(`Product: ${item.name}`, 20, yOffset);
        pdf.text(`Quantity: ${item.quantity}`, 400, yOffset);
        pdf.text(`Price: $${item.price.toFixed(2)}`, 120, yOffset);
      });

      if (index < orderHistory.length - 1) {
        pdf.addPage(); // Add a new page for each order except the last one
      }
    });

    pdf.save('order_history.pdf');
  };

  return (
    <>
      <Header />
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="Dashboard min-h-screen w-[80%] mx-auto my-4 bg-gray-100 rounded-md p-4 sm:p-6 md:p-8 lg:p-10">
        <div>
          {orderHistory.length === 0 ? (
            <p>No order history available.</p>
          ) : (
            <>
              <button onClick={downloadOrderHistoryAsPdf} className="btn btn-primary mb-4">
                Download Order History as PDF
              </button>
              <ul>
              {orderHistory.map((order, index) => (
                <li key={index} className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded shadow-md">
                    <div className="mb-4 sm:mb-0">
                      <p className="font-bold">Order Date: {order.timestamp}</p>
                    </div>
                    <div className='w-[30vh] '>
                      <h3 className="font-extrabold">Order Details:</h3>
                      <ul className="divide-y divide-white">
                        {order.items.map((item: any, itemIndex: number) => (
                          <li
                            key={itemIndex}
                            className="p-4 sm:py-3 sm:px-6 lg:px-8 bg-gray-300 rounded"
                          >
                            <p className="font-bold">Product: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
