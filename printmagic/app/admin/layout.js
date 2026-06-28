"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      if (!data.session && !isLoginPage) {
        router.replace("/admin/login");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (!newSession && !isLoginPage) {
          router.replace("/admin/login");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-white font-body">{children}</div>;
  }

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center font-body text-sm text-ink/40">
        Checking session…
      </div>
    );
  }

  if (!session) {
    // Redirect is already in flight via the effect above.
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-body">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8">{children}</main>
    </div>
  );
}
