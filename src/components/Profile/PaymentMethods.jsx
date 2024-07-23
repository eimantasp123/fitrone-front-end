import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm, FormProvider } from "react-hook-form";
import { MdDelete, MdCreditCard } from "react-icons/md";

const stripePromise = loadStripe("your-publishable-key-here");

const PaymentMethods = () => {
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

  const handleSetDefault = (id) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method) => (method.id === id ? { ...method, default: true } : { ...method, default: false }))
    );
  };

  const handleRemoveCard = (id) => {
    setPaymentMethods((prevMethods) => prevMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="flex flex-col px-8 py-4 xl:flex-col  w-full">
      <h2 className="text-lg font-semibold ">Payment Methods</h2>
      <div className="px-5 flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="space-y-4 w-full ">
            <div className="flex justify-end items-center">
              <button type="button" onClick={() => setEditMode(!editMode)} className="text-sm font-medium ">
                + Add new card
              </button>
            </div>
            <p className="text-gray-600">Manage your credit cards and payment options.</p>
            <div className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg bg-white ">
                    <div className="flex items-center">
                      <MdCreditCard className="text-2xl mr-4" />
                      <div>
                        <p className="font-semibold">Card ending in {method.card.last4}</p>
                        <p className="text-sm text-gray-500">
                          Exp. date {method.card.exp_month}/{method.card.exp_year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {method.default ? (
                        <span className="px-4 py-1 border  bg-accent1 text-sm rounded-full">Default</span>
                      ) : (
                        <button onClick={() => handleSetDefault(method.id)} className=" text-sm">
                          Set as Default
                        </button>
                      )}
                      <button onClick={() => handleRemoveCard(method.id)} className="text-red-500 hover:text-red-700">
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No payment methods available.</p>
              )}
            </div>
            <div
              className={`transition-all pt-2 md:pt-0 ease-in-out duration-500 transform ${
                editMode ? "opacity-100 my-4 translate-y-0 max-h-40" : "opacity-0 max-h-0 -translate-y-[-50px]"
              }`}
              style={{
                transitionProperty: "opacity, transform, max-height",
                maxHeight: editMode ? "400px" : "0px",
                overflow: "hidden",
              }}
            >
              {editMode && (
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                  <CardElement options={{ hidePostalCode: true }} className="p-4 border rounded-lg bg-white " />
                  <div className="flex justify-end space-x-4">
                    <button className="bg-accent1 text-sm py-2 px-6 rounded-full" type="submit">
                      Save Payment Method
                    </button>
                    <button
                      className="bg-secondary text-white py-2 px-6 rounded-full text-sm"
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
