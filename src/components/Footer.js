import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className="bg-white z-10 shadow-md mt-10">
      <div
        className="flex justify-center p-4 text-sm text-gray-600
            space-x-4 "
      >
        <p className=" link">Privacy</p>
        <p>·</p>
        <p className="link">Terms</p>
        <p>·</p>
        <p className="link">Sitemap</p>
      </div>
      <div className="flex justify-center text-gray-600 border-t py-2 text-xs">
        <Link href="https://www.ritaguilherme.com/">
          <p className="link">© 2023 RG Builds</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
