import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useState } from "react";
import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart, clearCart }) {
  const [recipientName, setRecipientName] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const cartTotal = cart.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
  const finalTipAmount = customTip ? parseFloat(customTip) || 0 : tipAmount;
  const grandTotal = cartTotal + finalTipAmount;
  const drinkCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isValidCart = drinkCount > 0 && drinkCount <= 4;

  const handleCheckout = () => {
    if (!recipientName.trim()) {
      alert("Please enter a recipient name.");
      return;
    }

    const orderData = {
      recipientName,
      items: cart,
      subtotal: cartTotal,
      tipAmount: finalTipAmount,
      tipAmount,
      grandTotal,
      orderDate: new Date().toLocaleString(),
      orderId: `ORD-${Date.now()}`
    };

    setOrderDetails(orderData);
    setOrderPlaced(true);
  };

  const handlePlaceNewOrder = () => {
    setRecipientName("");
    setTipAmount(0);
    setCustomTip("");
    setShowCheckout(false);
    setOrderPlaced(false);
    setOrderDetails(null);
    clearCart();
  };

  if (orderPlaced && orderDetails) {
    return (
      <Container className="py-4">
        <h2 className="mb-4 text-center">Order Confirmed! 🎉</h2>
        <Card className="mb-4 p-4 shadow-sm">
          <Card.Body>
            <div className="text-center mb-4">
              <h5 className="text-muted">Order ID: {orderDetails.orderId}</h5>
              <p className="text-muted small">{orderDetails.orderDate}</p>
            </div>

            <hr />

            <h5 className="mb-3">
              <strong>Recipient: {orderDetails.recipientName}</strong>
            </h5>

            <h6 className="mb-3 text-muted">Items Ordered:</h6>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="mb-3 ps-3 border-start">
                <div className="d-flex justify-content-between mb-1">
                  <span>
                    <strong>{item.name}</strong> × {item.quantity}
                  </span>
                  <span>${((item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
                <p className="mb-1 small text-muted">
                  <strong>Ingredients:</strong> {item.ingredients}
                </p>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${orderDetails.subtotal.toFixed(2)}</span>
            </div>

            {orderDetails.tipAmount > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span>Tip:</span>
                <span>${orderDetails.tipAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between border-top pt-2">
              <h5>
                <strong>Grand Total:</strong>
              </h5>
              <h5>
                <strong>${orderDetails.grandTotal.toFixed(2)}</strong>
              </h5>
            </div>

            <hr />

            <div className="text-center text-muted small mt-4">
              <p>Thank you for your order! Your cocktails will be ready shortly.</p>
            </div>

            <Button
              variant="dark"
              size="lg"
              className="w-100 mt-4"
              onClick={handlePlaceNewOrder}
            >
              Place Another Order
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {!showCheckout ? (
            <>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                />
              ))}

              <div className="mt-4 p-3 bg-light border rounded mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({drinkCount}):</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <h4 className="text-end">
                  <strong>Cart Total: ${cartTotal.toFixed(2)}</strong>
                </h4>
              </div>

              {!isValidCart && (
                <Alert variant="warning" className="mb-4">
                  {drinkCount === 0
                    ? "Your cart is empty. Add items to proceed."
                    : "Orders can contain between 1 and 4 drinks. Please adjust your cart."}
                </Alert>
              )}

              <div className="text-center">
                <Button
                  variant="dark"
                  size="lg"
                  onClick={() => setShowCheckout(true)}
                  disabled={!isValidCart}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          ) : (
            <Card className="p-4 shadow-sm">
              <h4 className="mb-4">Checkout</h4>

              <Form.Group className="mb-4">
                <Form.Label>
                  <strong>Recipient Name</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </Form.Group>

              <div className="mb-4 p-3 bg-light border rounded">
                <h6 className="mb-3">Order Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Form.Group className="mb-4">
                <Form.Label>
                  <strong>Tip Amount</strong>
                </Form.Label>
                <div className="d-flex gap-2 mb-3">
                  {[0, 1, 2, 3].map((amount) => (
                    <Button
                      key={amount}
                      variant={tipAmount === amount && !customTip ? "dark" : "outline-dark"}
                      size="sm"
                      onClick={() => {
                        setTipAmount(amount);
                        setCustomTip("");
                      }}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Or enter custom tip amount"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value);
                    if (e.target.value) {
                      setTipAmount(0);
                    }
                  }}
                />
              </Form.Group>

              <div className="p-3 bg-light border rounded mb-4">
                {finalTipAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tip:</span>
                    <span>${finalTipAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between border-top pt-2">
                  <h5>
                    <strong>Grand Total:</strong>
                  </h5>
                  <h5>
                    <strong>${grandTotal.toFixed(2)}</strong>
                  </h5>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="flex-grow-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Back to Cart
                </Button>
                <Button
                  variant="dark"
                  size="lg"
                  className="flex-grow-1"
                  onClick={handleCheckout}
                  disabled={!recipientName.trim()}
                >
                  Place Order
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </Container>
  );
}

export default CartPage;