import { useDisclosure } from "@chakra-ui/react";
import PrimaryButton from "../../../components/common/PrimaryButton";
import DraweForBalance from "./DraweForBalance";

const cardDetails = [
  {
    id: 1,
    title: "Fill Out the Form",
    description: "Enter your details to personalize your meal plan.",
  },
  {
    id: 2,
    title: "Get Your Results",
    description:
      "Discover the exact nutritional breakdown you need to reach your goals.",
  },
  {
    id: 3,
    title: "Unlock Meals & Suppliers",
    description: "Explore tailored meal options based on your results.",
  },
];

export default function NoBalance() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] p-4 3xl:mt-6">
        {/* Container Content */}
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-primary bg-background p-4 text-center transition-all duration-500 ease-in-out`}
        >
          <h1 className="mb-6 text-[22px] font-semibold text-textPrimary md:text-2xl lg:text-3xl">
            Calculate Your Meal Balance ⚖️
          </h1>
          <p className="mb-4 max-w-[800px] text-textSecondary">
            To find the best meals and suppliers for your goals, you first need
            tos calculate your daily balance of calories, protein, fats, and
            carbs.
          </p>
          <h2 className="mb-4 cursor-pointer text-lg font-bold">Steps</h2>

          {/* Cards */}
          <div className="mb-4 flex max-w-[1000px] items-center justify-center gap-4">
            {cardDetails.map((card, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center justify-center rounded-lg border border-borderPrimary p-8 shadow-custom-light4"
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
            className="w-64"
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
