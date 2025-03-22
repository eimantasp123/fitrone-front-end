import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi";

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
            <div className="my-6 flex flex-col gap-2 md:gap-3 lg:my-10 lg:flex-row">
              {/* Left Column */}
              <div className="flex w-full flex-col gap-2 md:gap-3 lg:w-1/2">
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
              <div className="flex w-full flex-col gap-2 md:gap-3 lg:w-1/2">
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
