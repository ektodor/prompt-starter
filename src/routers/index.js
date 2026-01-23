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
import ApiLayout from "@/views/backend/ApiLayout";
import { supabase } from "@/utils/api/supabaseClient";
import { redirect } from "react-router";
import Swal from "sweetalert2";
import { useGetUserProfile } from "@/hooks/useUser";
import { queryClient } from "@/utils/queries/queryClient";
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
        middleware: [authMiddleware],
        Component: ProjectProposal,
      },
      {
        path: "sponsor-plan",
        middleware: [authMiddleware],
        Component: SponsorPlan,
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

export default routes;
