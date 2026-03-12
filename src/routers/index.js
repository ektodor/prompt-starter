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
import { UserProfile } from "@/views/frontend/UserProfile/UserProfile";
import ApiLayout from "@/views/backend/ApiLayout";
import { MemberHomePage } from "@/views/frontend/UserProfile/MemberHomePage";
import { supabase } from "@/utils/api/supabaseClient";
import { redirect } from "react-router";
import Swal from "sweetalert2";
import { queryClient } from "@/utils/queries/queryClient";
import SponsorshiOption from "@/components/layout/sponsor-plan/SponsorshipOption";
import SponsorshipOrder from "@/components/layout/sponsor-plan/SponsorshipOrder";
import { getOrderById, getProjectById } from "@/utils/api/supabase";
import { ProjectCreateLayout } from "@frontend/ProjectCreate/ProjectCreateLayout";
import { BasicInfo } from "@frontend/ProjectCreate/BasicInfo";
import { ContentInfo } from "@frontend/ProjectCreate/ContentInfo";
import { CrowdfundingSetting } from "@frontend/ProjectCreate/CrowdfundingSetting";
import { FundraisingTierSetting } from "@/views/frontend/ProjectCreate/FundraisingTierSetting";
import { RiskChallengeSetting } from "@frontend/ProjectCreate/RiskChallengeSetting";

const routes = [
  {
    path: "/",
    Component: FrontendLayout,
    children: [
      {
        index: true,
        Component: Index,
      },
      {
        path: "product-detail",
        Component: ProductDetailLayout,
        children: [
          { index: true, Component: ProductDetail },
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
        path: "sponsor-plan/:projectId/",
        Component: SponsorPlan,
        middleware: [authMiddleware, checkProjecctState],
        children: [
          { index: true, Component: SponsorshiOption },
          {
            path: ":orderId",
            Component: SponsorshipOrder,
            middleware: [checkOrderState],
          },
        ],
      },
      {
        path: "user-profile",
        middleware: [authMiddleware],
        Component: UserProfile,
      },
      {
        path: "project-create",
        Component: ProjectCreateLayout,
        children: [
          { index: true, Component: BasicInfo },
          { path: "content", Component: ContentInfo },
          { path: "crowdfunding", Component: CrowdfundingSetting },
          { path: "fundraising-tier", Component: FundraisingTierSetting },
          { path: "risk-challenge", Component: RiskChallengeSetting },
        ],
      },
    ],
  },
  {
    path: "/api",
    middleware: [authMiddleware],
    Component: ApiLayout,
  },
];

async function authMiddleware({ unstable_pattern: path }) {
  console.log("middleware");
  const { data: session, error } = await supabase.auth.getSession();
  if (error) {
    await Swal.fire("發生錯誤請稍後再試！！！");
    throw redirect("/");
  }
  if (!session) {
    await Swal.fire("請先登入！！！");
    throw redirect("/");
  }
  // 確定已經登入，表示有基本資料，所以直接讀快取資料
  const userProfile = queryClient.getQueryData(["getUserProfile"]);
  if (path === "/api" && !userProfile) {
    throw redirect("/");
  }
  if (path === "/api" && userProfile?.role === "user") {
    await Swal.fire("你不是管理員💥 不要過來！！！");
    throw redirect("/");
  }
}

async function checkProjecctState({ params: { projectId } }) {
  console.log("checkProjecctState");
  try {
    const { data, error } = await getProjectById(projectId);
    if (data.status !== "active" || error) throw new Error();
  } catch {
    await Swal.fire("查無此專案！！！");
    throw redirect("/");
  }
}

async function checkOrderState({ params: { orderId } }) {
  console.log("checkOrderState");
  try {
    const { data, error } = await getOrderById(orderId);
    if (!data || error) throw new Error();
  } catch {
    await Swal.fire("查無此訂單！！！");
    throw redirect("/");
  }
}

export default routes;
