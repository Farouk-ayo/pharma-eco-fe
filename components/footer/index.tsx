"use client";
import {
  InstagramIcon,
  LinkedInIcon2,
  TwitterIcon,
  TikTokIcon,
  FacebookIcon,
} from "../icons";
import ContactInfo from "./contactInfo";
import CopyRight from "./copyRight";
import LinkSection from "./linkSection";
import LogoSection from "./logoSection";

export const socialLinksData = [
  {
    name: "LinkedIn",
    icon: <LinkedInIcon2 />,
    url: "https://www.linkedin.com/company/pharmabin-ng/",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon width={25} height={25} />,
    url: "https://www.instagram.com/pharmabin?utm_source=qr&igsh=MTc2MTh5MHBjaDR3bg==",
  },
  {
    name: "facebook",
    icon: <FacebookIcon fill="transparent" width={25} height={25} />,
    url: "https://www.facebook.com/profile.php?id=61572270426064&mibextid=ZbWKwL",
  },

  {
    name: "TikTok",
    icon: <TikTokIcon fill="transparent" width={25} height={25} />,
    url: "https://vm.tiktok.com/ZMkx6G17D/",
  },
  {
    name: "X",
    icon: <TwitterIcon />,
    url: "https://x.com/pharmabin1?t=gHx2rchT87XsIhBxdce0LQ&s=08",
  },
];

const Footer = () => {
  const quickLinks = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/about-us",
      name: "About Us",
    },
    {
      link: "/articles",
      name: "Articles",
    },
    {
      link: "/contact-us",
      name: "Contact Us",
    },
  ];

  const legalLinks = [
    {
      link: "#",
      name: "Privacy Policy",
    },
    {
      link: "#",
      name: "Quality Policy",
    },
    {
      link: "#",
      name: "Cookies Policy",
    },
    {
      link: "#",
      name: "Terms & Condition",
    },
  ];

  return (
    <footer className="relative bg-bgPrimary px-4 lg:px-28 pt-12 lg:pt-20 bg-[#F4F4F4]">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 lg:gap-12">
          <LogoSection socialLinks={socialLinksData} />
          <LinkSection title="Quick Links" links={quickLinks} />
          <LinkSection title="Legal Links" links={legalLinks} />
          <ContactInfo />
        </div>
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
