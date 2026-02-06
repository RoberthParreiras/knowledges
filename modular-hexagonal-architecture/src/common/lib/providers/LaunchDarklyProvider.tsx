"use client";

import React, { useEffect, useState } from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

const context = {
  kind: "user",
  key: "anonymous",
  anonymous: true,
};

export default function LaunchDarklyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [LDProvider, setLDProvider] = useState<React.ComponentType<{
    children: React.ReactNode;
  }> | null>(null);

  useEffect(() => {
    (async () => {
      const Provider = await asyncWithLDProvider({
        clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_ID!,
        context,
      });
      setLDProvider(() => Provider);
    })();
  }, []);
  
  if (!LDProvider) return null;

  return <LDProvider>{children}</LDProvider>;
}
