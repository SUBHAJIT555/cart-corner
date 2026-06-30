import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Dropdown = ({ menuItem, isActive = false }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      className="minimal-header__dropdown group relative list-none"
      onClick={() => setDropdownToggler(!dropdownToggler)}
    >
      <a
        href="#"
        className={`minimal-header__link flex items-center gap-1 ${
          isActive || pathUrl.includes(menuItem.title) ? "is-active" : ""
        }`}
      >
        {menuItem.title}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>

      <ul className={`dropdown ${dropdownToggler ? "flex" : ""} xl:group-hover:translate-y-0`}>
        {menuItem.submenu.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={pathUrl === item.path ? "text-dark" : ""}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
