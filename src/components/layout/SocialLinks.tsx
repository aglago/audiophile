import Link from "next/link";
import Facebook from "../icons/facebook";
import Twitter from "../icons/twitter";
import Instagram from "../icons/instagram";


export default function SocialLinks({className}: {className?: string}) {
  const links = [
    { href: "#", icon: <Facebook className="group-hover:fill-primary" />, label: "Facebook" },
    { href: "#", icon: <Twitter className="group-hover:fill-primary" />, label: "Twitter" },
    { href: "#", icon: <Instagram className="group-hover:fill-primary" />, label: "Instagram" },
  ];

  return (
    <div className={`flex space-x-4 items-center ${className}`}>
      {links.map(({ href, icon, label }, index) => (
        <Link
          key={index}
          href={href}
          className="group text-white hover:text-primary transition-colors"
          aria-label={label}
        >
          {icon}
        </Link>
      ))}
    </div>
  );
}
