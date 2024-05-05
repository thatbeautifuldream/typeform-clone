"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Loader from "@/components/layout/loader";
import Typeform from "@/components/form/typeform";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <main>
      <Nav />
      <Typeform />
      <Footer />
    </main>
  );
}
