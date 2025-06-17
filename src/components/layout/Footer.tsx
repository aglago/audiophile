import React from "react";
import Link from "next/link";
import Facebook from "../icons/facebook";
import Twitter from "../icons/twitter";
import Instagram from "../icons/instagram";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

export const Footer = () => {
  const footerNavigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "Headphones", href: "/products?category=headphones" },
      { name: "Speakers", href: "/products?category=speakers" },
      { name: "Earphones", href: "/products?category=earphones" },
    ],
    support: [
      { name: "Contact", href: "/contact" },
      { name: "Support", href: "/support" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="flex flex-col gap-12 place-items-center md:place-items-start">
          {/* Brand and description */}
          <div className="h-1 w-[101px] bg-primary absolute top-0 mx-auto"></div>
          <div className="flex flex-col lg:flex-row place-items-center md:place-items-start w-full lg:justify-between gap-12">
            <Link href="/">
            <Image alt="audiophile logo" src="/assets/shared/desktop/logo.svg" width={143} height={25} />
          </Link>
            {/* Navigation links */}
            <div>
              <ul className="flex flex-col md:flex-row gap-9 items-center font-bold">
                {footerNavigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white hover:text-primary transition-colors uppercase"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <p className="text-[15px] text-white/50 lg:max-w-[540px] text-center md:text-left">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
            <SocialLinks className="hidden lg:flex items-end" />
          </div>

          <div className="flex flex-col md:flex-row items-center w-full md:justify-between gap-12">
            <p className="text-white/50 font-bold text-[15px]">
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </p>

            <SocialLinks className="lg:hidden" />
          </div>
        </div>
      </div>
    </footer>
  );
};
