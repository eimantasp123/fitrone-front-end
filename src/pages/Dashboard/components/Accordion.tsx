import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi";
import Video from "./Video";

interface AccordionProps {
  object: { title: string; description: string; url: string; steps: string[] };
  isOpen: boolean;
  onToggle: () => void;
}

/**
 *  Accordion Component for Dashboard
 */
const AccordionForDashboard = ({
  object,
  isOpen,
  onToggle,
}: AccordionProps) => {
  const { t } = useTranslation("dashboard");
  const contentRef = useRef<HTMLDivElement>(null); // Ref to measure the height of content
  const [loading, setLoading] = useState(true);
  const [videoVisible, setVideoVisible] = useState(isOpen);

  useEffect(() => {
    let outerTimeout: NodeJS.Timeout;
    let innerTimeout: NodeJS.Timeout;

    if (!isOpen) {
      outerTimeout = setTimeout(() => {
        setVideoVisible(false);

        innerTimeout = setTimeout(() => {
          setVideoVisible(true);
        }, 50);
      }, 200);
    }

    return () => {
      clearTimeout(outerTimeout);
      clearTimeout(innerTimeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  // Handle the onReady event
  const onReady = () => {
    setLoading(false); // Update loading state when player is ready
  };

  return (
    <div
      className={`rounded-lg border bg-background p-3 transition-colors duration-300 ease-in-out lg:p-3 ${
        isOpen ? "border-primary" : "border-borderLight dark:border-borderLight"
      }`}
    >
      {/* Accordion Header */}
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onToggle}
      >
        <h3 className="w-[80%] text-sm font-normal text-textPrimary">
          {object.title}
        </h3>
        <HiPlus
          className={`text-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 text-primaryDark" : "rotate-0"
          }`}
        />
      </div>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <p className="mt-3 text-sm text-textSecondary">{object.description}</p>
        <p className="mt-2 font-medium">{t("guideTopics")}:</p>
        <ul className="text-sm text-textSecondary">
          {object.steps.map((step, index) => (
            <li key={index} className="ml-5 list-disc">
              {step}
            </li>
          ))}
        </ul>

        {videoVisible && (
          <Video
            loading={loading}
            object={{ url: object.url }}
            setLoading={setLoading}
            onReady={onReady}
          />
        )}
      </div>
    </div>
  );
};

export default AccordionForDashboard;
