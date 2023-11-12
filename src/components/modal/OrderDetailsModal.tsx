import React from "react";

type OrderDetailsModalProps = {
  isOpen: boolean;
  orderDetails: any;
  closeModal: () => void;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  orderDetails,
  closeModal,
}) => {
  return (
    <div className={`modal${isOpen ? " active" : ""}`} id="order_details_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Order Details</h3>
        <div className="py-4">
          {orderDetails.map((item: any) => (
            <div key={item.id}></div>
          ))}
        </div>
        <div className="modal-action">
          <a href="#" className="btn" onClick={closeModal}>
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
