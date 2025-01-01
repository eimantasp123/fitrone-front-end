import React from "react";
interface EmptyStateForSmallComponentsProps {
  title: string;
  description: string;
}

const EmptyStateForSmallComponents: React.FC<
  EmptyStateForSmallComponentsProps
> = ({ title, description }) => {
  return (
    <div className="mt-4 flex h-full w-full flex-col items-center justify-center rounded-lg bg-backgroundSecondary px-8 py-6 text-center dark:bg-background">
      <h2 className="text-md font-semibold">{title}</h2>
      <p className="pt-1 text-sm">{description}</p>
    </div>
  );
};

export default EmptyStateForSmallComponents;
