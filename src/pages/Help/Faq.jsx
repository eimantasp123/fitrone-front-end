import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi";

// FAQ data
const faqs = [
  {
    question: "What is Fitrone?",
    answer:
      "Fitrone is a personalized fitness app that syncs with your wearable devices to track your progress and provide customized weekly nutrition plans. Our system evolves based on your real-time data, ensuring your meal plans and workout recommendations adapt to your body’s changing needs.",
  },
  {
    question: "How does Fitrone sync with my devices?",
    answer:
      "Fitrone integrates with popular wearable devices like Apple Watch, Fitbit, Garmin, and more. Simply connect your device through the app, and Fitrone will automatically pull data such as workouts, sleep patterns, and calorie burn to tailor your fitness plan.",
  },
  {
    question: "Can I customize my meal plans?",
    answer:
      "Yes! Your meal plans are fully customizable. Based on your fitness goals, dietary preferences, and real-time progress, you’ll receive weekly meal recommendations that you can adjust to fit your specific needs.",
  },
  {
    question: "Do I need to manually update my progress?",
    answer:
      "No, Fitrone automatically tracks your progress by syncing with your wearable device. However, you can manually log body measurements or specific workouts if you prefer more detailed tracking.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Currently, Fitrone does not offer a free trial. However, you can subscribe to our monthly or yearly plans, with the flexibility to cancel anytime if it doesn’t meet your expectations.",
  },
  {
    question: "How does Fitrone personalize my plan?",
    answer:
      "Fitrone uses your real-time data—such as workouts, heart rate, calorie burn, and sleep metrics—from synced devices to create dynamic meal and fitness plans. These plans adjust weekly based on your activity, progress, and fitness goals.",
  },
  {
    question: "Can I use Fitrone without a wearable device?",
    answer:
      "Yes, while Fitrone works best when synced with wearable devices, you can still manually input data such as body weight, workout details, and progress to receive customized plans.",
  },
  {
    question: "What makes Fitrone different sd from other fitness apps?",
    answer:
      "Fitrone offers real-time personalized fitness and nutrition plans based on your unique progress. Unlike generic apps, our plans evolve as your body changes, helping you avoid plateaus and stay motivated.",
  },
  {
    question: "Can I use Fitrone without ds a wearable device?",
    answer:
      "Yes, while Fitrone works best when synced with wearable devices, you can still manually input data such as body weight, workout details, and progress to receive customized plans.",
  },
  {
    question: "What makes Fitrone different from fd other fitness apps?",
    answer:
      "Fitrone offers real-time personalized fitness and nutrition plans based on your unique progress. Unlike generic apps, our plans evolve as your body changes, helping you avoid plateaus and stay motivated.",
  },
  {
    question: "Can I use Fitrone without a wearable device?",
    answer:
      "Yes, while Fitrone works best when synced with wearable devices, you can still manually input data such as body weight, workout details, and progress to receive customized plans.",
  },
  {
    question: "What makes Fitrone different from other sd fitness apps?",
    answer:
      "Fitrone offers real-time personalized fitness and nutrition plans based on your unique progress. Unlike generic apps, our plans evolve as your body changes, helping you avoid plateaus and stay motivated.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation("faq");

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = t("quastionsAndAnswers", { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <div className="flex w-full overflow-y-auto p-4 scrollbar-thin md:px-14 md:py-10">
        <div className="container mx-auto mb-4 h-full w-full max-w-[1400px] md:mb-0">
          <section id="faq" className="flex select-none flex-col">
            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-md mt-2 text-center font-semibold text-textPrimary md:text-2xl lg:text-2xl">
                {t("title")}
              </h2>
            </div>

            {/* FAQ SECTIONS */}
            <div className="my-6 flex flex-col gap-3 lg:my-10 lg:flex-row">
              {/* Left Column */}
              <div className="flex w-full flex-col gap-3 lg:w-1/2">
                {faqs.slice(0, 4).map((faq, index) => (
                  <Accordion
                    key={index}
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
              </div>

              {/* Right Column */}
              <div className="flex w-full flex-col gap-3 lg:w-1/2">
                {faqs.slice(4, 8).map((faq, index) => (
                  <Accordion
                    key={index + 6}
                    faq={faq}
                    isOpen={openIndex === index + 6}
                    onToggle={() => handleToggle(index + 6)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Accordion Component
const Accordion = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef(null); // Ref to measure the height of content

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-lg border bg-background p-5 shadow-custom-dark2 transition-colors duration-300 ease-in-out lg:p-6 ${
        isOpen ? "border-primary" : "border-borderLight dark:border-borderLight"
      }`}
    >
      {/* Accordion Header */}
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onToggle}
      >
        <h3 className="w-[80%] text-sm font-normal text-textPrimary">
          {faq.question}
        </h3>
        <HiPlus
          className={`text-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 text-primaryDark" : ""
          }`}
        />
      </div>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <p className="mt-3 text-sm text-textSecondary">{faq.answer}</p>
      </div>
    </div>
  );
};

// Accordion PropTypes
Accordion.propTypes = {
  faq: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};
