import { Slot } from "expo-router";
import { ContentfulClientProvider } from "@/ctx/ContentfulClientContext";
export default function Root() {
  return (
    <ContentfulClientProvider>
      <Slot />
    </ContentfulClientProvider>
  );
}
