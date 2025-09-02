import { FooterComponent } from "@/components/layout/FooterComponent";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { Outlet } from "react-router";

export function FrontendLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
}
