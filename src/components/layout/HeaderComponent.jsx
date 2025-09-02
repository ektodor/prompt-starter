import { NavLink } from "react-router";

export function HeaderComponent() {
  return (
    <header className="bg-red-300">
      <div className="container">
        <h1>HeaderComponent 暫時導覽列</h1>
        <div className="flex gap-2">
          <NavLink to={""}>首頁</NavLink>
          <NavLink to={"product-detail"}>商品詳細頁面</NavLink>
          <NavLink to={"project-proposal"}>提案頁面</NavLink>
          <NavLink to={"sponsor-plan"}>贊助頁面</NavLink>
          <NavLink to={"component-demo"}>元件demo頁面</NavLink>
        </div>
      </div>
    </header>
  );
}
