import { NavLink } from "react-router";

export function NavLinkList({
  list,
  otherClass = "",
  customClass = "",
  activeClass = "",
}) {
  const { to, name, value, showValue } = list;

  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) => {
          return customClass
            ? `${customClass} ${isActive ? activeClass : ""}`.trim()
            : `inline-block whitespace-nowrap py-[14.5px] border-b text-h6 text-neutral-500 ${isActive ? activeClass || " text-neutral-700 border-primary-400" : ""} ${otherClass}`.trim();
        }}
      >
        {name} {showValue && `(${value})`}
      </NavLink>
    </li>
  );
}
