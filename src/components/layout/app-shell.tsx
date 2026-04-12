"use client";

import { ReactNode } from "react";


type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="flex min-h-screen">

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-background px-4 py-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold md:text-xl">
                  Client Insights
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}