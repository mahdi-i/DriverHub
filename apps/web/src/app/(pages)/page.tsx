import Chart from "@/core/components/custom/blook/chart/Chart";
import SocketClient from "@/core/test/SocketClient";
function page() {
  return (
    <>
      <h1>پروژه Next.js متصل به NestJS</h1>
      <SocketClient />
      <Chart />
    </>
  );
}

export default page;
