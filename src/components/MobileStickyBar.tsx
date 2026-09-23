"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileStickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 700);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-stone-200 p-3 shadow-lg">
      <Link href="/#simulateur" className="btn-primary w-full text-sm">
        Estimer mon reste &agrave; charge
      </Link>
    </div>
  );
}
