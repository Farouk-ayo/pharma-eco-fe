import Footer from "@/components/footer";
import CallToAction from "@/components/footer/callToAction";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: " About Us || Pharmabin",
  description: " About Us page",
};

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />
      {children}
      <CallToAction />
      <Footer />
    </section>
  );
};

export default HomeLayout;
