import type { AdapterMap } from "@repo/utils";
import type { adapterMap } from "server/src/adapterSetup";
import { SophtronAdapter } from "./adapter";

import { createSophtronVC } from "./createVc";
import type { AdapterDependencies } from "./models";

export const getSophtronAdapterMapObject: (dependencies: AdapterDependencies) => Record<keyof typeof adapterMap, AdapterMap> = (dependencies: AdapterDependencies) => {
  return {
    sophtron: {
      testInstitutionAdapterName: "sophtron",
      vcAdapter: createSophtronVC(dependencies),
      widgetAdapter: new SophtronAdapter({
        dependencies,
      }),
    } as unknown as AdapterMap,
  } as Record<string, AdapterMap>;
};

export * from "./models";
