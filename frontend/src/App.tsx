import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { ScrollToTop } from "./components/layout/ScrollToTop";

import { Home } from "./pages/public/Home";
import { About } from "./pages/public/About";
import { Members } from "./pages/public/Members";
import { MemberDetail } from "./pages/public/MemberDetail";
import { Documents } from "./pages/public/Documents";
import { DocumentDetail } from "./pages/public/DocumentDetail";
import { Contact } from "./pages/public/Contact";
import { NotFound } from "./pages/public/NotFound";

import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { MembersAdmin } from "./pages/admin/MembersAdmin";
import { DocumentsAdmin } from "./pages/admin/DocumentsAdmin";
import { AccountsAdmin } from "./pages/admin/AccountsAdmin";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="gioi-thieu" element={<About />} />
          <Route path="thanh-vien" element={<Members />} />
          <Route path="thanh-vien/:id" element={<MemberDetail />} />
          <Route path="tai-lieu" element={<Documents />} />
          <Route path="tai-lieu/:id" element={<DocumentDetail />} />
          <Route path="lien-he" element={<Contact />} />
        </Route>

        <Route path="admin/login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="members"
            element={
              <ProtectedRoute roles={["ADMIN", "MOD"]}>
                <MembersAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="documents" element={<DocumentsAdmin />} />
          <Route
            path="accounts"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AccountsAdmin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
