"use client";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import FeaturesPanel from "#/ui/molecules/FeaturesPanel/FeaturesPanel";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

const FeaturesPanelButton = () => {
  const { toggleShowFeatures, areFeaturesShown } = useFeatureToggleContext();

  const ref = useOutsideClick<HTMLDivElement>(() => toggleShowFeatures());

  const toggleButton = (
    <BaseButton
      className="relative opacity-50"
      theme="secondary"
      flavor="icon"
      onClick={() => toggleShowFeatures()}
      title={(!areFeaturesShown ? "Open" : "Close") + " Settings"}
      icon={!areFeaturesShown ? <Cog8ToothIcon /> : <XMarkIcon />}
    />
  );

  if (!areFeaturesShown) {
    return <div className="absolute top-0 left-0 z-10">{toggleButton}</div>;
  }

  return (
    <div className="absolute top-0 left-0 z-10 w-96" ref={ref}>
      {areFeaturesShown && <FeaturesPanel className="absolute top-0 left-0 z-0" />}
      {toggleButton}
    </div>
  );
};

export default FeaturesPanelButton;
