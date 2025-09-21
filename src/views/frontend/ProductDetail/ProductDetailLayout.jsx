import { Outlet } from "react-router";

import { productDetailCardInfo } from "@/js/ProductDetail/productDetailCardInfo";

import { ProductDetailCard } from "@/components/ProductDetail/ProductDetailCard";
import { NavLinkList } from "@/components/NavLinkList/NavLinkList";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { IconButtonComponent } from "@/components/buttons/IconButtonComponent";

const productDetailNavLink = [
  { id: "01", to: "", name: "方案內容", value: 1, showValue: false },
  { id: "02", to: "initiator", name: "發起人", value: 1, showValue: false },
  {
    id: "03",
    to: "proposal-update",
    name: "方案更新",
    value: 1,
    showValue: true,
  },
  { id: "04", to: "faqs", name: "常見問答", value: 12, showValue: true },
  { id: "05", to: "comments", name: "留言", value: 2, showValue: true },
];

export function ProductDetailLayout() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container">
        <div className="py-6 lg:py-10">
          <ProductDetailCard productDetailCardInfo={productDetailCardInfo} />
        </div>
      </div>
      <nav className="sticky top-0 z-10 bg-neutral-100 py-6">
        <div className="container flex">
          <div className="w-full lg:w-3/5 xl:w-2/3">
            <ul className="flex gap-10 overflow-auto">
              {productDetailNavLink.map((link) => (
                <NavLinkList key={link.id} list={link} />
              ))}
            </ul>
          </div>
          <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3">
            <div className="flex gap-4">
              <button className="size-12 border border-neutral-500 rounded-xl flex justify-center items-center cursor-pointer">
                <SVGColorComponent
                  url="./icons/bookmark_border.svg"
                  size="size-[19px]"
                  color="bg-neutral-700"
                />
              </button>
              <ButtonComponent size="lg" style="flex-1">
                贊助方案
              </ButtonComponent>
            </div>
          </div>
        </div>
      </nav>

      <IconButtonComponent
        type="outlined"
        iconUrl="./icons/arrow_upward.svg"
        clickEvent={backToTop}
        btnStyle="fixed right-3 bottom-24 z-10 lg:hidden"
      />
      <div className="fixed bottom-0 px-3 py-4 bg-neutral-0 block lg:hidden w-full z-10">
        <div className=" flex gap-4">
          <button className="size-12 border border-neutral-500 rounded-xl flex justify-center items-center cursor-pointer">
            <SVGColorComponent
              url="./icons/bookmark_border.svg"
              size="size-[19px]"
              color="bg-neutral-700"
            />
          </button>
          <ButtonComponent size="lg" style="flex-1">
            贊助方案
          </ButtonComponent>
        </div>
      </div>

      <Outlet />
    </>
  );
}
