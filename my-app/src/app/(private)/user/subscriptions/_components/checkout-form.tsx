import { Button, Modal, message } from "antd";
import React from "react";
import {
  useStripe,
  AddressElement,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { saveSubscription } from "@/actions/subscriptions";

interface Props {
  plan: any;
  showCheckoutForm: boolean;
  setShowCheckoutForm: any;
}

function CheckoutForm({ plan, showCheckoutForm, setShowCheckoutForm }: Props) {
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://localhost:3000/user/account",
        },
        redirect: "if_required",
      });
      if (result.error) {
        message.error(result?.error?.message);
      } else {
        message.success("Payment successful");
        await saveSubscription({
          paymentId: result.paymentIntent.id,
          plan,
        });
        message.success("Subscription purchased successfully");
        router.push("/user/account");
      }
      setShowCheckoutForm(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Complete your subscription purchase"
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
      footer={null}
      width={700}
      centered
    >
      {" "}
      <form onSubmit={handleSubmit} className="mt-7">
        <PaymentElement />
        <AddressElement options={{ mode: "shipping" }} />
        <div className="flex justify-end gap-5 mt-5">
          <Button onClick={() => setShowCheckoutForm(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CheckoutForm;
