import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { defaultAnalysisData } from "../../../assets/mock/analysis";
import { AnalysisData } from "../../../assets/types/analysisDriverTs";
import BoxAnalysisDriver from "../../ui/analysis/BoxAnalysisDriver";
import ChartAnalysisDriver from "../../ui/analysis/ChartAnalysisDriver";
async function AnalysisDashboardPage() {
  const license = getAccessTokenSSR();

  let analysis: AnalysisData = defaultAnalysisData;

  try {
    const res = await fetch(`${BASE_URL}/analysis-driver`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${license}`,
      },
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      analysis = data;
    } else {
      console.log("err");
    }
  } catch {
    console.log("err");
  }

  return (
    <div>
      <BoxAnalysisDriver analysis={analysis} />

      <ChartAnalysisDriver />
    </div>
  );
}

export default AnalysisDashboardPage;
