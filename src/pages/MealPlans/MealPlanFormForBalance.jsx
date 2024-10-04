import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/common/InputField";
import SelectInputField from "../../components/common/SelectInputField";
import useCustomToast from "../../hooks/useCustomToast";
import { createDietPlanBalance } from "../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import {
  dietaryPreferencesSchema,
  goalsAndLifestyleSchema,
  healtInformationSchema,
  hydrationAndLifestyleSchema,
  mealPlanPreferencesSchema,
  personalInfoSchema,
} from "../../utils/dietPlanSchema";
import { PersonalizedDietFormRequirements } from "../MealPlanForm/mockData/mealFormRequirements";
import { steps } from "../MealPlanForm/mockData/steps";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function MealPlanFormForBalance() {
  const { details } = useSelector((state) => state.dietPlanDetails);
  const [formLevel, setFormLevel] = useState(0);
  const navigate = useNavigate();
  const customToast = useCustomToast();
  const { createDietPlanBalanceLoading } = useSelector(
    (state) => state.dietPlanDetails,
  );
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(
      formLevel === 0
        ? personalInfoSchema
        : formLevel === 1
          ? goalsAndLifestyleSchema
          : formLevel === 2
            ? dietaryPreferencesSchema
            : formLevel === 3
              ? mealPlanPreferencesSchema
              : formLevel === 4
                ? healtInformationSchema
                : hydrationAndLifestyleSchema,
    ),
  });

  if (details && details.planBalance) {
    return <Navigate to="/meal-plan" />;
  }

  // Function to handle the submission for each step
  const onSubmit = async (data) => {
    try {
      if (formLevel === 5) {
        console.log("Submit form", data);
        await dispatch(createDietPlanBalance(data)).unwrap();
        customToast({
          title: "Form submitted successfully",
          description: "Your form has been submitted successfully",
          status: "success",
        });
        navigate("/meal-plan");
      } else {
        setFormLevel((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      customToast({
        title: "Error submitting form",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <div className="max-h-fit w-full overflow-y-auto p-4 scrollbar-none">
      <div className="container mx-auto h-[calc(100dvh-7rem)] max-h-[900px] max-w-[1500px] 3xl:pt-10">
        <div className="flex h-full w-full justify-between gap-10 p-1">
          {/*  */}
          <div className="s flex h-full w-1/3 flex-col justify-evenly p-6">
            {/* Step 1  */}
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex gap-4 ${formLevel === index ? "text-textPrimary" : "text-neutral-500"}`}
              >
                <span
                  className={`${formLevel === index ? "text-primaryDark" : formLevel > index ? "text-[#7dbf3f8c]" : "text-neutral-500"}`}
                >
                  <IoMdCheckmarkCircleOutline className="mt-[3px] text-xl" />
                </span>
                <div className="flex flex-col items-start justify-start">
                  <h3 className="mb-1 font-semibold">{step.title}</h3>
                  <p className="text-[15px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/*  */}
          <div className="flex min-h-fit w-2/3 flex-col justify-center overflow-y-auto rounded-xl border border-borderPrimary bg-background p-10 shadow-custom-light2 3xl:p-16">
            <FormProvider {...methods}>
              <form className="mb-9" onSubmit={methods.handleSubmit(onSubmit)}>
                {PersonalizedDietFormRequirements.map((requirement, index) => {
                  if (formLevel === index) {
                    return (
                      <div className="space-y-4" key={index}>
                        <div className="mb-8 flex w-full items-center justify-between text-xl font-semibold">
                          <h3>{requirement.title}</h3>
                          <p className="flex justify-end pt-2 text-sm text-textPrimary">
                            Fields marked with{" "}
                            <span className="mx-2 text-xl text-red-600">*</span>{" "}
                            are mandatory.
                          </p>
                        </div>

                        {requirement.data.map((item, index) => {
                          return (
                            <div key={index}>
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
                        <div className="flex w-full justify-between gap-10 pt-3">
                          {/* Back Button */}
                          {formLevel > 0 && (
                            <button
                              className="text-textPrimarySecondary w-1/2 rounded-full border border-borderColor bg-background px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary"
                              onClick={() => setFormLevel((prev) => prev - 1)}
                            >
                              Back
                            </button>
                          )}

                          {/* Next Button */}
                          <button
                            type="submit"
                            disabled={createDietPlanBalanceLoading}
                            className="w-full rounded-full bg-primary py-2 text-black transition-colors duration-300 ease-in-out hover:bg-primaryDark"
                          >
                            {!createDietPlanBalanceLoading ? (
                              formLevel ===
                              PersonalizedDietFormRequirements.length - 1 ? (
                                "Submit"
                              ) : (
                                "Next"
                              )
                            ) : (
                              <Spinner size="sm" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
