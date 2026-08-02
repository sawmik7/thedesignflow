import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";

// ─── Eager: Home is the critical first paint ───────────────────────────────
import Home from "@/pages/Home";

// ─── Lazy: All inner pages — chunked separately, loaded on demand ──────────
const BlogIndex   = lazy(() => import("@/pages/BlogIndex"));
const BlogPost    = lazy(() => import("@/pages/BlogPost"));
const WorkIndex   = lazy(() => import("@/pages/WorkIndex"));
const WorkPost    = lazy(() => import("@/pages/WorkPost"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const StudioPage  = lazy(() => import("@/pages/StudioPage"));

// Minimal fallback — invisible, no layout shift
function PageSkeleton() {
  return (
    <div
      style={{ minHeight: "100vh", background: "#050505" }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Cursor />
      <Preloader />
      <SmoothScrollProvider>
        <PageTransition>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/blog"          element={<BlogIndex />} />
              <Route path="/blog/:slug"    element={<BlogPost />} />
              <Route path="/work"          element={<WorkIndex />} />
              <Route path="/work/:slug"    element={<WorkPost />} />
              <Route path="/contact"       element={<ContactPage />} />
              <Route path="/studio"        element={<StudioPage />} />
              <Route path="/about"         element={<StudioPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </SmoothScrollProvider>
    </HelmetProvider>
  );
}
