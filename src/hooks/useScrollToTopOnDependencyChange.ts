import { useEffect, RefObject, useRef } from "react";

/**
 * Custom hook to scroll to the top of a container when dependencies change
 * @param dependencies - Array of dependencies to monitor for changes
 * @param scrollContainerRef - Ref to the scrollable container
 */
const useScrollToTopOnDependencyChange = (
  dependencies: unknown[],
  scrollContainerRef: RefObject<HTMLDivElement>,
) => {
  const previousDependencies = useRef(dependencies);

  // Scroll to top when dependencies change
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Check if any dependency has changed
    const hasDependenciesChanged = dependencies.some(
      (dep, index) => dep !== previousDependencies.current[index],
    );

    // Only scroll to top if dependencies have changed and the container exists
    if (
      hasDependenciesChanged &&
      scrollContainer &&
      scrollContainer.scrollTop > 0
    ) {
      scrollContainer.scrollTop = 0;
    }

    // Update previous dependencies
    previousDependencies.current = dependencies;
  }, [dependencies, scrollContainerRef]); // Trigger on dependency changes
};

export default useScrollToTopOnDependencyChange;
