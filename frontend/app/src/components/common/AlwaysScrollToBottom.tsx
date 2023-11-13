import { useEffect, useRef } from "react";

interface AlwaysScrollToBottomProps {
  dependency: unknown;
}

/**
 * Helper Function to scroll to bottom when a dependency changes
 */
const AlwaysScrollToBottom = ({
  dependency,
}: AlwaysScrollToBottomProps): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dependency]);

  return <div ref={elementRef} />;
};

export default AlwaysScrollToBottom;
