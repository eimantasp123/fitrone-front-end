import { useColorMode } from "@chakra-ui/react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdCreditCard, MdDelete } from "react-icons/md";

const stripePromise = loadStripe("your-publishable-key-here");

// PaymentMethods component
const PaymentMethods = () => {
  const { colorMode } = useColorMode();
  const [editMode, setEditMode] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      card: {
        brand: "visa",
        last4: "7830",
        exp_month: "06",
        exp_year: "24",
      },
      default: true,
    },
    {
      id: "2",
      card: {
        brand: "mastercard",
        last4: "1075",
        exp_month: "02",
        exp_year: "25",
      },
      default: false,
    },
  ]);
  const methods = useForm();
  const stripe = useStripe();
  const elements = useElements();

  // Submit payment method
  const onSubmit = async () => {
    const cardElement = elements.getElement(CardElement);
    if (!stripe || !cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      const newCard = {
        id: paymentMethod.id,
        card: {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
        },
        default: false,
      };

      setPaymentMethods((prevMethods) => [...prevMethods, newCard]);
      setEditMode(false);
    }
  };

  // Set default payment method
  const handleSetDefault = (id) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id
          ? { ...method, default: true }
          : { ...method, default: false },
      ),
    );
  };

  // Remove payment method
  const handleRemoveCard = (id) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.filter((method) => method.id !== id),
    );
  };

  // Card element options for Stripe
  const cardElementOptions = {
    style: {
      base: {
        color: colorMode === "dark" ? "#ffffff" : "#000000",
        fontWeight: "500",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "15px",
        "::placeholder": {
          color: colorMode === "dark" ? "#c5c5c5" : "#3a3a3a",
        },
        backgroundColor: "transparent",
        iconColor: colorMode === "dark" ? "#ffffff" : "#000000",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="border-border flex w-full flex-col rounded-2xl border bg-background p-6 shadow-custom-dark2 sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="w-full space-y-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="w-[60%] text-textPrimary">
                Manage your credit cards and payment options.
              </p>
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="w-[40%] text-end text-sm font-medium"
              >
                + Add new card
              </button>
            </div>
            <div className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between rounded-lg border border-borderColor bg-background p-4"
                  >
                    <div className="flex items-center">
                      <MdCreditCard className="mr-4 text-2xl text-textSecondary" />
                      <div>
                        <p className="font-semibold text-textPrimary">
                          Card ending in {method.card.last4}
                        </p>
                        <p className="text-sm text-textSecondary">
                          Exp. date {method.card.exp_month}/
                          {method.card.exp_year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {method.default ? (
                        <span className="rounded-full border border-borderColor bg-buttonPrimaryDark px-4 py-1 text-sm text-white">
                          Default
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveCard(method.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-textSecondary">
                  No payment methods available.
                </p>
              )}
            </div>
            <div
              className={`transform pt-2 transition-all duration-300 ease-in-out md:pt-0 ${
                editMode
                  ? "my-4 max-h-40 translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-[-50px] opacity-0"
              }`}
              style={{
                transitionProperty: "opacity, transform, max-height",
                maxHeight: editMode ? "400px" : "0px",
                overflow: "hidden",
              }}
            >
              {editMode && (
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <CardElement
                    options={cardElementOptions}
                    className="rounded-lg border border-borderColor p-4"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      className="rounded-full border border-borderColor bg-buttonPrimaryDark px-6 py-2 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-buttonPrimaryDarkHover"
                      type="submit"
                    >
                      Save Payment Method
                    </button>
                    <button
                      className="bg-secondary rounded-full px-6 py-2 text-sm"
                      type="button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

const PaymentMethodsWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentMethods />
  </Elements>
);

export default PaymentMethodsWrapper;
