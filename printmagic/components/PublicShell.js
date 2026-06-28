"use client";

import { EnquiryProvider } from "@/components/EnquiryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryFloatingButton from "@/components/EnquiryFloatingButton";

// Wraps the public storefront pages (home, /products, /about) with the
// shared nav/footer/enquiry-button chrome. This used to be a route-group
// layout at app/(site)/layout.js — moved to a plain component so the
// project has no parentheses in any folder name, which has been known
// to trip up some git/zip/CI tooling.
export default function PublicShell({ children }) {
  return (
    <EnquiryProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <EnquiryFloatingButton />
    </EnquiryProvider>
  );
}
