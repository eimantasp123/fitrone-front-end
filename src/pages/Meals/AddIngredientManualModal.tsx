import CustomInput from "@/components/common/NewCharkaInput";
import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { formatNumber } from "@/utils/helper";
import { useIngredientInputSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Ingredient {
  title: string;
  amount: number;
  unit?: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  currentAmount: number;
}

interface setIngredients {
  title: string;
  id: string;
  currentAmount: number;
  unit: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

interface AddIngredientManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<React.SetStateAction<setIngredients[]>>;
}

// AddIngredientManualModal component
const AddIngredientManualModal: React.FC<AddIngredientManualModalProps> = ({
  isOpen,
  onClose,
  setIngredients,
}) => {
  const { t } = useTranslation("meals");
  const [unit, setUnit] = useState<string>("g");
  const schema = useIngredientInputSchema();
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<Ingredient>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const handleSubmitForm: SubmitHandler<Ingredient> = async (data) => {
    setLoading(true);
    const ingredientData = {
      ...data,
      unit,
    };

    // Prepare data for backend
    const backendData = {
      title: ingredientData.title,
      amount: 100,
      unit: ingredientData.unit,
      calories: ingredientData.calories,
      protein: ingredientData.protein,
      fat: ingredientData.fat,
      carbs: ingredientData.carbs,
      currentAmount: ingredientData.currentAmount,
      withCurrentAmount: true,
    };

    // Send data to backend
    try {
      const response = await axiosInstance.post(
        "/meals/add-ingredient",
        backendData,
      );
      if (response.status === 201) {
        setIngredients((prev) => [...prev, response.data.data]);
        closeModal();
        showCustomToast({
          status: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        methods.setError("title", {
          type: "manual",
          message: error.response.data.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      isCentered
      size={{ base: "sm", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent
        p={6}
        sx={{
          borderRadius: "0.75rem",
        }}
      >
        <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
          <div className="flex items-center gap-4">
            <h4 className="text-xl font-semibold">{t("addIngredient")}</h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <FormProvider {...methods}>
            <form
              className="mt-6 flex select-none flex-col gap-3"
              onSubmit={methods.handleSubmit(handleSubmitForm)}
            >
              {/* Description text */}
              <p className="text-sm">
                {t("addIngredientManuallyFirstInfoText")}
              </p>
              <CustomInput
                name="title"
                label={t("ingredientName")}
                placeholder={t("enterIngredient")}
              />
              {/* First info text */}
              <p className="pt-2 text-sm">
                1. {t("addIngredientManuallySecondInfoText")}
              </p>
              <div className="flex gap-4">
                {/* Select unit */}
                <div className="flex flex-1 flex-col gap-2">
                  <span className="text-[13px] text-textPrimary">
                    {t("unit")}
                  </span>
                  <div className="flex flex-1 items-center gap-2 text-sm">
                    <div
                      onClick={() => setUnit("g")}
                      className={`flex flex-1 cursor-pointer items-center ${unit === "g" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} justify-center rounded-lg px-4 py-[11px]`}
                    >
                      {t("grams")}
                    </div>
                    <div
                      onClick={() => setUnit("ml")}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg ${unit === "ml" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} px-4 py-[11px]`}
                    >
                      {t("milliliters")}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="flex flex-1 flex-col gap-2">
                  <CustomInput
                    name="amount"
                    label={t("amount")}
                    value="100"
                    isDisabled={true}
                  />
                </div>
              </div>
              {/* Nutritional Information */}
              <p className="pt-2 text-sm">
                2. {t("addIngredientManuallyThirdInfoText")}
              </p>
              <div className="grid grid-cols-4 gap-4">
                {["calories", "carbs", "fat", "protein"].map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <CustomInput
                      name={field}
                      type="number"
                      label={t(`${field}`)}
                      placeholder="e.g. 50"
                    />
                  </div>
                ))}
              </div>
              <p className="pt-2 text-sm">
                3. {t("addIngredientManuallyLastInfoText")}
              </p>
              <CustomInput
                name="currentAmount"
                type="number"
                label={t("needenAmount")}
                placeholder="e.g. 100"
              />
              <div className="grid w-full grid-cols-2 grid-rows-1 gap-3">
                <span
                  className="mt-4 flex-1 cursor-pointer rounded-md bg-black/90 px-4 py-3 text-center text-sm text-white transition-colors duration-200 ease-in-out hover:bg-black/80 dark:hover:bg-black/40"
                  onClick={closeModal}
                >
                  {t("cancel")}
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 rounded-md bg-primary px-4 py-3 text-center ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
                >
                  {loading ? <Spinner size="sm" /> : `${t("add")}`}
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddIngredientManualModal;
