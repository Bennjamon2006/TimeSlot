import pages from "@/pages/pageList";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingPlaceholder from "./LoadingPlaceholder";
import useAuth from "@/hooks/useAuth";

const PageRoute = ({
  Page,
  protected: isProtected = false,
}: {
  Page: React.ComponentType;
  protected?: boolean;
}) => {
  const { isAuthenticated, state } = useAuth();

  if (isProtected && state === "success" && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Page />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPlaceholder variant="page" />}>
        <Routes>
          {pages.map(({ name, path, Page, protected: isProtected }) => (
            <Route
              key={name}
              path={path}
              element={<PageRoute Page={Page} protected={isProtected} />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
