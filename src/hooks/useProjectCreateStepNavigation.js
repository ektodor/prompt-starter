import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { PROJECT_CREATE_STEPS } from "@/constants/projectCreateSteps";

export function useProjectCreateStepNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = useMemo(() => {
    return PROJECT_CREATE_STEPS.findIndex((path) => path === location.pathname);
  }, [location.pathname]);

  const nextPath =
    currentIndex >= 0 && currentIndex < PROJECT_CREATE_STEPS.length - 1
      ? PROJECT_CREATE_STEPS[currentIndex + 1]
      : null;

  const prevPath =
    currentIndex > 0 ? PROJECT_CREATE_STEPS[currentIndex - 1] : null;

  const goNext = () => {
    if (nextPath) navigate(nextPath);
  };

  const goPrev = () => {
    if (prevPath) navigate(prevPath);
  };

  return {
    currentIndex,
    nextPath,
    prevPath,
    goNext,
    goPrev,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === PROJECT_CREATE_STEPS.length - 1,
  };
}
