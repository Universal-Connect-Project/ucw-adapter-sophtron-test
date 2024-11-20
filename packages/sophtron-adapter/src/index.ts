import type { AdapterMap } from "@repo/utils";

import { SophtronAdapter } from "./adapter";
import { createSophtronVC } from "./createVc";
import type { AdapterDependencies } from "./models";
import { SOPHTRON_ADAPTER_NAME } from "./constants";

export const getSophtronAdapterMapObject = (
  dependencies: AdapterDependencies,
) => {
  return {
    sophtron: {
      testInstitutionAdapterName: SOPHTRON_ADAPTER_NAME,
      vcAdapter: createSophtronVC(dependencies),
      widgetAdapter: new SophtronAdapter({
        dependencies,
      }),
    } as AdapterMap,
  } as Record<string, AdapterMap>;
};

export * from "./models";
