import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useGreeting } from "./hooks/useBackend";
import { AdminPage } from "./pages/AdminPage";
import { BirthdayPage } from "./pages/BirthdayPage";
import { FinalePage } from "./pages/FinalePage";
import { GiftsPage } from "./pages/GiftsPage";
import { ReadyPage } from "./pages/ReadyPage";
import { WelcomePage } from "./pages/WelcomePage";
import type { AppPage, BirthdayData } from "./types";

function AppInner() {
  const [page, setPage] = useState<AppPage>("welcome");
  const [birthdayData, setBirthdayData] = useState<BirthdayData | null>(null);
  const { data: greeting } = useGreeting();

  // Secret admin access via URL hash
  const isAdmin =
    typeof window !== "undefined" && window.location.hash === "#admin";

  const boyfriendName = greeting?.name ?? "My Love";
  const couplePhotoKey = greeting?.couplePhotoKey ?? "";

  if (page === "admin" || isAdmin) {
    return <AdminPage />;
  }

  return (
    <>
      {page === "welcome" && (
        <WelcomePage
          boyfriendName={boyfriendName}
          couplePhotoKey={couplePhotoKey}
          onVerified={(data) => {
            setBirthdayData(data);
            setPage("birthday");
          }}
        />
      )}
      {page === "birthday" && birthdayData && (
        <BirthdayPage
          data={birthdayData}
          boyfriendName={boyfriendName}
          onNext={() => setPage("ready")}
        />
      )}
      {page === "ready" && <ReadyPage onYes={() => setPage("gifts")} />}
      {page === "gifts" && <GiftsPage onComplete={() => setPage("finale")} />}
      {page === "finale" && <FinalePage />}
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <AppInner />
    </Layout>
  );
}
