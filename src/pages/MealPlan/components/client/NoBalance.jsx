import { useDisclosure } from "@chakra-ui/react";
import PrimaryButton from "../../../../components/common/PrimaryButton";
import DraweForBalance from "./DraweForBalance";
import { cardDetails } from "../../mockData/cardDetailsForNoBalancePage";

export default function NoBalance() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="container mx-auto min-h-fit w-full max-w-[1500px] p-4 md:h-[calc(100dvh-4rem)] 3xl:mt-6 3xl:h-[calc(100dvh-20rem)]">
        {/* Container Content */}
        <div
          className={`flex h-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-primary bg-background px-4 py-10 text-center transition-all duration-500 ease-in-out md:p-8`}
        >
          <h1 className="mb-2 font-semibold text-textPrimary md:mb-6 md:mt-0 md:text-2xl md:text-[22px] lg:text-3xl">
            Calculate Your Meal Balance ⚖️
          </h1>
          <p className="mb-4 max-w-[800px] text-textSecondary">
            To find the best meals and suppliers for your goals, you first need
            tos calculate your daily balance of calories, protein, fats, and
            carbs.
          </p>
          <h2 className="mb-4 cursor-pointer font-bold md:text-lg">Steps</h2>

          {/* Cards */}
          <div className="mb-4 flex max-w-[1000px] flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
            {cardDetails.map((card, index) => (
              <div
                key={index}
                className="flex w-full flex-1 flex-col items-center justify-start rounded-lg border border-borderPrimary p-3 shadow-custom-light4 md:p-8"
              >
                <span className="mb-2 flex size-6 items-center justify-center rounded-full bg-primary font-semibold text-black">
                  {card.id}
                </span>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-textSecondary">{card.description}</p>
              </div>
            ))}
          </div>

          <PrimaryButton
            onClick={onOpen}
            text="Start Balance Calculation"
            className="w-[280px]"
          />
        </div>
      </div>

      {/* Drawer for balance form */}
      <DraweForBalance
        headerTitle="Calculate Your Meal Balance"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
