import { Page } from "@/components";
import { FindingMatchCard, SelectPreferencesCard } from "@/features/matching";

function JoinPage() {
  return (
    <Page display="grid" placeItems="center">
      <SelectPreferencesCard />
      <FindingMatchCard />
    </Page>
  );
}

export default JoinPage;
