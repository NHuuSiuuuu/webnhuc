import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function MobileNav({ setOpen ,open }) {
    
  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed z-40 top-0 w-full h-dvh bg-white transform transition-transform duration-200 ease-in shadow-md`}
    >
      <ul className="flex flex-col pt-[60px]  p-[50px] pb-[250px] ">
        <div className="absolute right-0 pr-[50px]">
          <X onClick={() => setOpen(false)} className="size-8" />
        </div>
        <h3 className="block px-4 py-3 font-bold">Menu</h3>
        <li className="">
          <Link
            to=""
            onClick={() => setOpen(false)}
            className="block px-4 py-3 "
          >
            Clearance Sale
          </Link>
        </li>
        <li className="">
          <Link
            className="block px-4 py-3 "
            to="/products/san-pham-moi"
            onClick={() => setOpen(false)}
          >
            New Arrivals
          </Link>
        </li>
        <li className="">
          <Link
            to="/products/"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 "
          >
            ALL
          </Link>
        </li>
        <li className="">
          <Link
            onClick={() => setOpen(false)}
            to="/products/"
            className="block px-4 py-3 "
          >
            TOP
          </Link>
        </li>
        <li className="">
          <Link
            to="/products/"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 "
          >
            Skirts
          </Link>
        </li>
        <li className="">
          <Link to="/products/" className="block px-4 py-3 ">
            SET
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
