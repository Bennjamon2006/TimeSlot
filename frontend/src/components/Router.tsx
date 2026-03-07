import pages from "@/pages/pageList";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingPlaceholder from "./LoadingPlaceholder";
import useAuth from "@/hooks/useAuth";

const PageRoute = ({
  Page,
  protected: isProtected = false,
  adminOnly = false,
}: {
  Page: React.ComponentType;
  protected?: boolean;
  adminOnly?: boolean;
}) => {
  const { isAuthenticated, state, user } = useAuth();

  if (isProtected && state === "success" && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && state === "success") {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (user?.role !== "ADMIN") {
      return <Navigate to="/" />;
    }
  }

  return <Page />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPlaceholder variant="page" />}>
        <Routes>
          {pages.map(
            ({ name, path, Page, protected: isProtected, adminOnly }) => (
              <Route
                key={name}
                path={path}
                element={
                  <PageRoute
                    Page={Page}
                    protected={isProtected}
                    adminOnly={adminOnly}
                  />
                }
              />
            ),
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
