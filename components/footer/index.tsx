"use client";
import {
  FacebookIcon2,
  InstagramIcon,
  LinkedInIcon2,
  TwitterIcon,
  TikTokIcon,
} from "../icons";
import ContactInfo from "./contactInfo";
import CopyRight from "./copyRight";
import LinkSection from "./linkSection";
import LogoSection from "./logoSection";

const Footer = () => {
  const socialLinks = [
    {
      name: "facebook",
      icon: (
        <FacebookIcon2
          fill="transparent"
          stroke="#157D18"
          width={25}
          height={25}
          className="hover:fill-primary transition-colors duration-300"
        />
      ),
      url: "https://www.facebook.com/profile.php?id=61572270426064&mibextid=ZbWKwL",
    },
    {
      name: "Instagram",
      icon: (
        <InstagramIcon
          stroke="#157D18"
          width={25}
          height={25}
          className="hover:stroke-primary transition-colors duration-300"
        />
      ),
      url: "https://www.instagram.com/pharmabin?utm_source=qr&igsh=MTc2MTh5MHBjaDR3bg==",
    },
    {
      name: "TikTok",
      icon: (
        <TikTokIcon
          fill="transparent"
          stroke="#157D18"
          width={25}
          height={25}
          className="hover:fill-primary transition-colors duration-300"
        />
      ),
      url: "https://vm.tiktok.com/ZMkx6G17D/",
    },
    {
      name: "X",
      icon: (
        <TwitterIcon
          fill="#157D18"
          className="hover:fill-primary transition-colors duration-300"
        />
      ),
      url: "https://x.com/pharmabin1?t=gHx2rchT87XsIhBxdce0LQ&s=08",
    },
    {
      name: "LinkedIn",
      icon: (
        <LinkedInIcon2
          color="#157D18"
          className="hover:text-primary transition-colors duration-300"
        />
      ),
      url: "https://www.linkedin.com/company/pharmabin-ng/",
    },
  ];

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
    <footer className="bg-bgPrimary px-4 sm:px-6 lg:px-20 pt-14 bg-[#F4F4F4]">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <LogoSection socialLinks={socialLinks} />
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
