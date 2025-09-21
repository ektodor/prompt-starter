import { Index } from "@frontend/Index";
import { ProjectProposal } from "@frontend/ProjectProposal";
import { SponsorPlan } from "@frontend/SponsorPlan";
import { FrontendLayout } from "@frontend/FrontendLayout";
import { ProductDetailLayout } from "@/views/frontend/ProductDetail/ProductDetailLayout";
import { ProductDetail } from "@/views/frontend/ProductDetail/ProductDetail";
import { Initiator } from "@/views/frontend/ProductDetail/Initiator";
import { ProposalUpdate } from "@/views/frontend/ProductDetail/ProposalUpdate";
import { FAQs } from "@/views/frontend/ProductDetail/FAQs";
import { Comments } from "@/views/frontend/ProductDetail/Comments";
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
        Component: ProductDetailLayout,
        children: [
          { path: "", Component: ProductDetail },
          { path: "initiator", Component: Initiator },
          { path: "proposal-update", Component: ProposalUpdate },
          { path: "faqs", Component: FAQs },
          { path: "comments", Component: Comments },
        ],
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
