import { Outlet } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Sidebar } from "@/components/ProjectCreate/Sidebar";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "project-create-draft";

const newProduct = () => ({
  id: uuidv4(),
  title: "",
  detailsImg: [],
  productIntroduction: [],
  productContents: [],
  emphasizeContent: [],
});

const newPricingCard = () => ({
  id: uuidv4(),
  cardImg: "",
  imgAlt: "",
  title: "",
  subtitle: "",
  sellingPrice: 0,
  listPrice: 0,
  sponsorshipsAvailable: 0,
  packageContents: [],
  recommendedTo: "",
  emphasizeContent: [],
  estimatedDelivery: "",
});

const newElaborateItem = () => ({
  id: uuidv4(),
  title: "",
  rac: "",
  countermeasures: "",
});

const defaultValues = {
  basicInfo: {
    title: "",
    topics: [],
    description: "",
    tags: [],
  },
  contentInfo: {
    products: [newProduct()],
  },
  crowdfunding: {
    fundingGoal: "",
    fundingDuration: "",
    schedule: "",
  },
  fundraisingTier: {
    pricingCard: [newPricingCard()],
  },
  risksAndChallenges: {
    preface: "",
    elaborate: [newElaborateItem()],
    disclosure: "",
  },
};

export function ProjectCreateLayout() {
  const savedDraft = localStorage.getItem(STORAGE_KEY);

  const methods = useForm({
    defaultValues: savedDraft ? JSON.parse(savedDraft) : defaultValues,
    shouldUnregister: false,
    mode: "onSubmit",
  });

  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...methods}>
      <div className="my-6 lg:my-25">
        <h1 className="text-center text-neutral-900 text-h4 pb-6 lg:text-h2 lg:pb-20">
          建立新專案
        </h1>

        <div className="container flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <Sidebar />
          </div>

          <div className="w-full lg:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
