import type { AdapterMap } from "@repo/utils";

import { SophtronAdapter } from "./adapter";
import { createSophtronVC } from "./createVc";
import type { AdapterDependencies } from "./models";

export const getSophtronAdapterMapObject = async (dependencies: AdapterDependencies) => {
  return {
    sophtron: {
      testInstitutionAdapterName: "sophtron",
      vcAdapter: await createSophtronVC(dependencies),
      widgetAdapter: new SophtronAdapter({
        dependencies,
      })
    } as AdapterMap,
  } as Record<string, AdapterMap>;
};

export * from "./models";
