import { ContractorsGate } from "@/components/contractors-gate";
import { SiteHeader } from "@/components/site-header";

export default function ContractorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <ContractorsGate />
      </main>
    </>
  );
}