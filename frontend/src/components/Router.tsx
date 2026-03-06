import pages from "@/pages/pageList";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPlaceholder from "./LoadingPlaceholder";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPlaceholder variant="page" />}>
        <Routes>
          {pages.map(({ name, path, Page }) => (
            <Route key={name} path={path} element={<Page />} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
