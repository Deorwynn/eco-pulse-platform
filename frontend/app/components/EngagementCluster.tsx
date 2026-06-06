"use client";

import { useState } from "react";

interface EngagementClusterProps {
  articleSlug: string;
}

export default function EngagementCluster({
  articleSlug,
}: EngagementClusterProps) {
  const [claps, setClaps] = useState(104);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleClap = async () => {
    if (isRegistering) return;
    setIsRegistering(true);

    try {
      const res = await fetch(
        "http://localhost:8080/api/analytics/engagement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleSlug: articleSlug,
            action: "like",
          }),
        },
      );

      if (!res.ok) throw new Error("Network telemetry failed");

      setClaps((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to log engagement telemetry:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleClap}
          disabled={isRegistering}
          className={`flex items-center space-x-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 px-4 py-2.5 rounded-full border border-slate-200 hover:border-emerald-200 transition-all active:scale-95 ${
            isRegistering ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl">👏</span>
          <span className="font-semibold text-sm">Clap for this article</span>
        </button>

        <span className="text-sm text-slate-500 font-medium">
          Total Engagement:{" "}
          <strong className="text-slate-900 font-semibold">{claps}</strong>{" "}
          claps
        </span>
      </div>

      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
        Service: Golang (:8080)
      </span>
    </div>
  );
}
