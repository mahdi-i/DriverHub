import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { Suspense } from "react";
import { defaultAnalysisData } from "../../../assets/mock/analysis";
import { AnalysisData } from "../../../assets/types/analysisDriverTs";
import BoxAnalysisDriver from "../../ui/analysis/BoxAnalysisDriver";
import ChartAnalysisDriver from "../../ui/analysis/ChartAnalysisDriver";
import AnalysisDashboardSkeleton from "./skeleton/AnalysisDashboardSkeleton";
async function AnalysisDashboardPage() {
  const license = getAccessTokenSSR();

  let analysis: AnalysisData = defaultAnalysisData;

  const res = await fetch(`${BASE_URL}/analysis-driver`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${license}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    analysis = data;
  }

  return (
    <div>
      <Suspense fallback={<AnalysisDashboardSkeleton />}>
        <BoxAnalysisDriver analysis={analysis} />
        <ChartAnalysisDriver />
      </Suspense>
    </div>
  );
}

export default AnalysisDashboardPage;
