import LightAndDarkMode from "@/components/common/LightAndDarkMode";
import LanguageSelector from "@/components/LanguageSelector";
import { useCustomerDetails } from "@/utils/validationSchema";
import { useColorMode } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UserDetailsFormComponent from "../Customers/components/UserDetailsFormComponent";
import { CustomerAddForm } from "@/utils/types";
import {
  useCustomerForm,
  UseCustomerFormProps,
} from "@/hooks/CustomerPageForm/useCustomerForm";
import { showCustomToast } from "@/hooks/showCustomToast";
import { SelectedPlace } from "../Customers/components/DrawerForCustomerAddAndEdit";

/**
 *  Customer page form component
 */
const CustomerPageForm: React.FC = () => {
  const { token } = useParams();
  const { t } = useTranslation(["customers", "meals", "common"]);
  const { colorMode } = useColorMode();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // Final selected place
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null,
  );

  const schema = useCustomerDetails();
  const methods = useForm<CustomerAddForm>({
    resolver: yupResolver(schema),
  });

  // Mutation to create a new customer
  const { mutate: createCustomer, isPending } = useCustomerForm(() => {
    setSelectedPlace(null);
    methods.reset();
  });

  // Handle form submission
  // Function to handle the submission for each step
  const onSubmit = async (data: CustomerAddForm) => {
    if (!selectedPlace || !token) return;

    if (!recaptchaToken) {
      showCustomToast({
        status: "error",
        description: t("recaptchaError"),
      });
      return;
    }

    // Merge the data with the address
    const dataSend: UseCustomerFormProps = {
      ...data,
      ...selectedPlace,
    };

    createCustomer({ data: dataSend, token, recaptchaToken });
  };

  return (
    <>
      <Helmet>
        <title>{t("customerForm")}</title>
      </Helmet>
      <div className="h-screen overflow-y-auto scrollbar-thin">
        <header className="border-border sticky top-0 z-50 flex max-h-16 min-h-16 select-none items-center justify-between gap-10 overflow-visible border-b-[1px] bg-background px-2 text-textPrimary dark:border-borderLight md:px-4">
          <img
            src={colorMode === "dark" ? `/logo-white.png` : `/logo-black.png`}
            alt="Logo"
            className="mx-4 my-3 h-auto w-[100px]"
          />
          <div className="flex items-center gap-2 md:gap-2">
            {/* Language switcher */}
            <LanguageSelector />

            {/* Dark Mode ON/OFF */}
            <LightAndDarkMode />
          </div>
        </header>
        <div className="mx-auto flex max-w-[1550px] flex-col px-6 pt-8 md:pt-14 lg:px-10">
          {token === "sample" && (
            <div className="mb-4 space-y-2 px-2 md:mb-0 md:px-9">
              <h4 className="text-lg font-semibold">{t("sampleFormTitle")}</h4>
              <p className="text-sm">{t("sampleFormDescription")}</p>
            </div>
          )}
          <UserDetailsFormComponent
            setSelectedPlace={setSelectedPlace}
            selectedPlace={selectedPlace}
            methods={methods}
            onSubmit={onSubmit}
            submitButtonText={t("sendForm")}
            loading={isPending}
            setRecaptchaToken={setRecaptchaToken}
            disableForm={token === "sample" || token!.length < 25 || isPending}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerPageForm;
