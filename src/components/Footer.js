import { GlobeAltIcon } from "@heroicons/react/24/outline";
import React from "react";

function Footer() {
  return (
    <div className="bg-white z-10 shadow-md">
      <div
        className="flex justify-center p-4 text-sm text-gray-600 
            space-x-4 ">
        <p className=" link">Privacy</p>
        <p>·</p>
        <p className="link">Terms</p>
        <p>·</p>
        <p className="link">Sitemap</p>
      </div>
      <div className="flex justify-center text-gray-600 border-t py-2 text-xs">
        <p className=" ">© 2023 RG Buils</p>
      </div>
    </div>
  );
}

export default Footer;
