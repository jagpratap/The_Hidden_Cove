import { useCheckout } from "./useCheckout";

import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, handleCheckout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => handleCheckout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
