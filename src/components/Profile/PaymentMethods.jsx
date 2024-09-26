import { Spinner, useColorMode } from "@chakra-ui/react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdCreditCard, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useCustomToast from "../../hooks/useCustomToast";
import {
  addPaymentMethod,
  deletePaymentMethod,
  getPaymentDetails,
  setDefaultPaymentMethod,
} from "../../services/reduxSlices/Payment/paymentSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// PaymentMethods component
const PaymentMethods = () => {
  const { paymentDetails, lastFetched, loading } = useSelector(
    (state) => state.payment,
  );
  const { colorMode } = useColorMode();
  const [addLoading, setAddLoading] = useState(false);
  const [defaultLoading, setDefaultLoading] = useState({});
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editMode, setEditMode] = useState(false);
  const methods = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const customToast = useCustomToast();
  console.log(paymentDetails);

  useEffect(() => {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes
    const shouldFetch =
      !paymentDetails || Date.now() - lastFetched > tenMinutes;
    if (shouldFetch) {
      dispatch(getPaymentDetails());
    }
  }, [dispatch, paymentDetails, lastFetched]);

  // Submit payment method
  const handleAddPaymentMethod = async () => {
    try {
      setAddLoading(true);
      const cardElement = elements.getElement(CardElement);
      if (!stripe || !cardElement) return;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        customToast({
          status: "error",
          title: "Failed to add payment method",
          description: error.message,
        });
        setAddLoading(false);
        return;
      }
      // Add payment method
      await dispatch(addPaymentMethod(paymentMethod.id)).unwrap();
      setEditMode(false);
      customToast({
        status: "success",
        title: "Payment method added successfully",
      });
    } catch (error) {
      customToast({
        status: "error",
        title: "Failed to add payment method",
        description: error.message,
      });
      setAddLoading(false);
    }
  };

  // Set default payment method
  const handleSetDefault = async (paymentMethodId) => {
    setDefaultLoading((prev) => ({ ...prev, [paymentMethodId]: true }));
    try {
      await dispatch(setDefaultPaymentMethod(paymentMethodId)).unwrap();
      setDefaultLoading((prev) => ({ ...prev, [paymentMethodId]: false }));
      customToast({
        status: "success",
        title: "Default payment method set successfully",
      });
    } catch (error) {
      customToast({
        status: "error",
        title: "Failed to set default payment method",
        description: error.message,
      });
    } finally {
      setDefaultLoading((prev) => ({ ...prev, [paymentMethodId]: false }));
    }
  };

  // Remove payment method
  const handleRemoveCard = async (paymentMethodId) => {
    setDeleteLoading((prev) => ({ ...prev, [paymentMethodId]: true }));
    try {
      await dispatch(deletePaymentMethod(paymentMethodId)).unwrap();
      setDeleteLoading((prev) => ({ ...prev, [paymentMethodId]: false }));
      customToast({
        status: "success",
        title: "Payment method removed successfully",
      });
    } catch (error) {
      customToast({
        status: "error",
        title: "Failed to remove payment method",
        description: error.message,
      });
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [paymentMethodId]: false }));
    }
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
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="flex w-full justify-center" size="lg" />
        </div>
      ) : (
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
                {paymentDetails.length > 0 ? (
                  paymentDetails.map((method) => (
                    <div
                      key={method.paymentMethodId}
                      className="flex items-center justify-between rounded-lg border border-borderColor bg-background p-4"
                    >
                      <div className="flex items-center">
                        <MdCreditCard className="mr-4 text-2xl text-textSecondary" />
                        <div>
                          <p className="font-semibold text-textPrimary">
                            Card ending in {method.last4}
                          </p>
                          <p className="text-sm text-textSecondary">
                            Exp. date {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {method.isDefault ? (
                          <span className="rounded-full border border-borderColor bg-buttonPrimaryDark px-4 py-1 text-sm text-white">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleSetDefault(method.paymentMethodId)
                            }
                            className="text-sm"
                          >
                            {defaultLoading[method.paymentMethodId] ? (
                              <div className="px-7">
                                <Spinner size="xs" />
                              </div>
                            ) : (
                              "Set as Default"
                            )}
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleRemoveCard(method.paymentMethodId)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          {deleteLoading[method.paymentMethodId] ? (
                            <div className="px-1">
                              <Spinner size="xs" />
                            </div>
                          ) : (
                            <MdDelete className="text-xl" />
                          )}
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
                    onSubmit={methods.handleSubmit(handleAddPaymentMethod)}
                    className="space-y-6"
                  >
                    <CardElement
                      options={cardElementOptions}
                      className="rounded-lg border border-borderColor p-4"
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        className={`w-[200px] rounded-full ${addLoading ? "cursor-not-allowed" : ""} border border-borderColor bg-buttonPrimaryDark py-2 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-buttonPrimaryDarkHover`}
                        type="submit"
                        disabled={addLoading}
                      >
                        {addLoading ? (
                          <Spinner size="xs" />
                        ) : (
                          "Save Payment Method"
                        )}
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
      )}
    </div>
  );
};

const PaymentMethodsWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentMethods />
  </Elements>
);

export default PaymentMethodsWrapper;
