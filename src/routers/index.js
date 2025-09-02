import { Index } from "@frontend/Index";
import { ProductDetail } from "@frontend/ProductDetail";
import { ProjectProposal } from "@frontend/ProjectProposal";
import { SponsorPlan } from "@frontend/SponsorPlan";
import { FrontendLayout } from "@frontend/FrontendLayout";
import { ComponentDemo } from "@/views/ComponentDemo";
const routes = [
  {
    path: "/",
    Component: FrontendLayout,
    children: [
      {
        path: "",
        Component: Index,
      },
      {
        path: "product-detail",
        Component: ProductDetail,
      },
      {
        path: "project-proposal",
        Component: ProjectProposal,
      },
      {
        path: "sponsor-plan",
        Component: SponsorPlan,
      },
      {
        path: "component-demo",
        Component: ComponentDemo,
      },
    ],
  },
];

export default routes;
