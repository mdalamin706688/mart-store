import React from "react";

interface PaymentConfirmationProps {
  onConfirmation: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  onConfirmation,
}) => {
  return (
    <div>
      <h2>Your order is confirmed!</h2>
      <button onClick={onConfirmation}>Go to Dashboard</button>
    </div>
  );
};

export default PaymentConfirmation;
