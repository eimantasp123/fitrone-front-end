import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FormButton from "../../components/common/FormButton";
import InputField from "../../components/common/InputField";
import SelectInputField from "../../components/common/SelectInputField";
import useCustomToast from "../../hooks/useCustomToast";
import {
  createDietPlan,
  getDietPlanDetails,
} from "../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import schema from "../../utils/dietPlanSchema";
import filterDietFormData from "../../utils/filterData";
import {
  PersonalizedDietFormRequirements,
  information,
} from "./mockData/mealFormRequirements";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

export default function MealPlanForm() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { details, createDietPlanLoading, loading } = useSelector(
    (state) => state.dietPlanDetails,
  );
  const { details: user } = useSelector((state) => state.personalDetails);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  useEffect(() => {
    if (!details || Object.keys(details).length === 0) {
      dispatch(getDietPlanDetails());
    }
  }, [dispatch, details]);

  const handleFormSubmit = async (data) => {
    try {
      const filterData = filterDietFormData(data);
      await dispatch(createDietPlan(filterData)).unwrap();
    } catch (error) {
      customToast({
        title: "Error submitting form",
        description: error.message,
        status: "error",
      });
    }
  };

  if (
    (details.status !== "none" &&
      Object.keys(details).length !== 0 &&
      details.status !== "rejected") ||
    user.plan === "base"
  ) {
    return <Navigate to="/meal-plans" />;
  }

  return (
    <div className="max-h-fit w-full overflow-y-auto p-6 scrollbar-none">
      <div className="container mx-auto h-[calc(100dvh-5rem)] max-w-[1500px] 3xl:pt-10">
        {loading ? (
          <div className="flex h-full items-center justify-center text-center">
            <Spinner size="lg" speed="0.65s" />
          </div>
        ) : (
          <>
            <div className="mb-6 md:mb-2 md:px-10">
              <h1 className="mb-4 text-2xl font-semibold text-textPrimary">
                Get Your Personalized Diet Plan!
              </h1>
              <div className="space-y-2 text-textSecondary">
                {information.map((info, index) => (
                  <p key={index}>{info.description}</p>
                ))}
                <p className="flex w-full justify-end text-sm text-textPrimary">
                  Fields marked with{" "}
                  <span className="mx-2 text-xl text-red-600">*</span> are
                  mandatory.
                </p>
              </div>
            </div>
            <div className="pb-10 md:px-10 2xl:pb-20">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(handleFormSubmit)}
                  className="space-y-8"
                >
                  {/* Physical Information Section */}
                  <div className="space-y-10">
                    {PersonalizedDietFormRequirements.map(
                      (requirement, index) => {
                        return (
                          <div
                            key={index}
                            className="flex h-fit w-full flex-col"
                          >
                            {/* Title */}
                            <div className="mb-3 text-lg font-semibold">
                              {requirement.title}
                            </div>
                            {/* Form Fields */}
                            <div className="border-border rounded-xl border bg-background p-8">
                              <div
                                className={`grid gap-4 ${
                                  requirement.data.length === 1
                                    ? "grid-cols-1"
                                    : requirement.data.length === 3
                                      ? "grid-cols-1 xl:grid-cols-[1fr_1fr] xl:grid-rows-2"
                                      : "grid-cols-1 xl:grid-cols-2"
                                }`}
                              >
                                {requirement.data.map((item, index) => {
                                  return (
                                    <div
                                      className={`${
                                        requirement.data.length === 3 &&
                                        index === 2
                                          ? "xl:col-span-2"
                                          : "xl:col-span-1"
                                      } min-h-1/2 self-start`}
                                      key={index}
                                    >
                                      {"options" in item ? (
                                        <SelectInputField
                                          required={item.required}
                                          placeholder={item.placeholder}
                                          label={item.label}
                                          name={item.name}
                                          options={item.options}
                                        />
                                      ) : (
                                        <InputField
                                          required={item.required}
                                          placeholder={item.placeholder}
                                          label={item.label}
                                          name={item.name}
                                          type={item.type}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>

                  {/* Submit Button */}
                  <FormButton
                    isFormValid={true}
                    loading={createDietPlanLoading}
                  >
                    Submit Form
                  </FormButton>
                </form>
              </FormProvider>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
