import { Slot } from "expo-router";
import { ContentfulClientContext } from "@/ctx/ContentfulClientContext";
import { useEffect, useState } from "react";
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const [client, setClient] = useState();

  useEffect(() => {
    try {
      const contentful = require("contentful");
      const contentfulClient = contentful.createClient({
        accessToken: process.env.EXPO_PUBLIC_ACCESS_TOKEN,
        space: process.env.EXPO_PUBLIC_SPACE,
      });
      setClient(contentfulClient);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ContentfulClientContext.Provider value={{ client, setClient }}>
      <Slot />
    </ContentfulClientContext.Provider>
  );
}
