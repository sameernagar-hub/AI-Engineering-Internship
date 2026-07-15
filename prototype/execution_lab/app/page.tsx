import manifest from "../data/project-manifest.json";
import { LabClient } from "./lab-client";
import type { ProjectManifest } from "./types";

export default function Page() {
  return <LabClient manifest={manifest as ProjectManifest} />;
}
