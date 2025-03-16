import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import axiosInstance from "@/utils/axiosInterceptors";
import { capitalizeFirstLetter } from "@/utils/helper";
import { DashboardLimitsResponse } from "@/utils/types";
import { Spinner, Tooltip } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AccordionForDashboard from "./components/Accordion";
import LineIndicator from "./components/LineIndicator";
import TurnOnOrOffComponent from "./components/TurnOnOrOffComponent";

// Define the main GuideContainer type
type GuideContainer = {
  title: string;
  description: string;
  steps: GuideStep[];
  note: string;
  url: string;
};

// Define a single step, which can be either a basic step or a grouped step with methods
type GuideStep = {
  title: string;
  actions?: string[];
  methods?: GuideMethod[];
};

// Define methods for cases like adding ingredients in different ways (AI search, personal list, manual entry)
type GuideMethod = {
  name: string;
  actions: string[];
};

// Full guide container array type
type GuideContainerArray = GuideContainer[];

/**
 * Supplier Dashboard Page Component
 */
export default function SupplierDashboard() {
  const { t } = useTranslation(["dashboard", "common"]);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery<DashboardLimitsResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axiosInstance.get("/dashboard");
      return response.data;
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 3, // 5 minutes
  });

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const handleToggle = (index: number | null) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const guide = t("guideContainer", {
    returnObjects: true,
  }) as GuideContainerArray;

  return (
    <div className="w-full overflow-y-auto scrollbar-thin">
      <div className="mx-auto flex max-w-[1450px] flex-col md:px-3 2xl:max-w-[1500px] 3xl:max-w-[1600px]">
        <div className="my-4 flex w-full flex-col gap-4 px-3 md:flex-row">
          {/* Limits container */}
          <div className="max-h-fit min-h-[400px] rounded-lg bg-background p-4 text-sm dark:bg-backgroundSecondary md:flex-1">
            {isLoading && !isError ? (
              <div className="flex h-full justify-center pt-40 xl:items-center xl:pt-0">
                <Spinner />
              </div>
            ) : !isError && data?.data ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h6 className="font-semibold">{t("systemLimits")}</h6>
                    <p className="mt-1 text-sm">
                      {t("systemLimitsDescription")}
                    </p>
                    {data?.data.plan !== "base" && (
                      <span className="mt-2 inline-block items-center justify-start text-nowrap rounded-full border border-primary px-3 py-1">
                        {`${capitalizeFirstLetter(data?.data.plan)} ${t("plan")}`}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Tooltip label={t("refresh")} aria-label="A tooltip">
                      <span
                        onClick={refreshData}
                        className="cursor-pointer rounded-full bg-backgroundSecondary p-2 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:bg-background dark:hover:bg-neutral-800"
                      >
                        <HiOutlineRefresh />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {Object.entries(data?.data.usageLimits).map(
                    ([key, values], index) => (
                      <div key={index} className="rounded-lg border p-2">
                        <h6 className="font-semibold">{t(`${key}`)}</h6>
                        <p className="mb-2">
                          {t("usage", { count: values.currentCount })}
                        </p>
                        <LineIndicator
                          currentAmount={values.currentCount}
                          limit={values.limit}
                        />
                      </div>
                    ),
                  )}
                </div>
                {/*  */}
                <div className="my-3 flex w-full flex-col justify-between gap-3 2xl:flex-row">
                  <div className="flex flex-1 items-center justify-between rounded-lg border p-2">
                    <h6 className="font-semibold">{t("aiSearch")}</h6>
                    <TurnOnOrOffComponent
                      active={data?.data.features.aiSearch ?? false}
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-lg border p-2">
                    <h6 className="font-semibold">{t("clientRequestForm")}</h6>
                    <TurnOnOrOffComponent
                      active={data?.data.features.clientRequestForm ?? false}
                    />
                  </div>
                </div>

                {/* Button navigate to membership page */}
                <CustomButton
                  text={t("changeMembership")}
                  onClick={() => navigate("/subscription")}
                  widthFull={true}
                  paddingY="py-3"
                  type="lightSecondary"
                />
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <EmptyState
                  title={t("common:error")}
                  status="error"
                  height="h-[600px]"
                  description={t("common:errorsMessage.errorFetchingData")}
                />
              </div>
            )}
          </div>

          {/* Guide container */}
          <div className="h-fit flex-1 rounded-lg bg-background p-4 text-sm dark:bg-backgroundSecondary">
            <h6 className="font-semibold">{t("systemGuide")}</h6>
            <p className="mt-1 text-sm">{t("systemGuideDescription")}</p>
            <div className="mt-4 flex flex-col gap-3">
              {guide.map((obj, index) => (
                <AccordionForDashboard
                  key={index}
                  object={obj}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
