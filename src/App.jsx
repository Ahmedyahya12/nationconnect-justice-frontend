import React, { useMemo, useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/RequestDetails";
import Outbox from "./pages/Outbox";
import Assistant from "./pages/Assistant";
import Toasts from "./components/Toasts";

export default function App() {
  const [path, setPath] = useState("/");

  const detailsId = useMemo(() => {
    const m = String(path).match(/^\/requests\/(\d+)$/);
    return m ? Number(m[1]) : null;
  }, [path]);

  return (
    <>
      <Layout path={path} onNavigate={setPath}>
        {path === "/" && <Home onNavigate={setPath} />}

        {path === "/requests" && (
          <Requests onOpenDetails={(id) => setPath(`/requests/${id}`)} />
        )}
        {detailsId && <RequestDetails id={detailsId} />}
        {path === "/outbox" && <Outbox />}
        {path === "/assistant" && <Assistant />}
      </Layout>
      <Toasts />
    </>
  );
}
