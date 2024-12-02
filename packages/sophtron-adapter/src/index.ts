import { type AdapterMap } from "@repo/utils";
import { createDataAdapter } from "./createDataAdapter";

import { SophtronAdapter } from "./adapter";
import { createSophtronVC } from "./createVc";
import type { AdapterDependencies } from "./models";

export const getSophtronAdapterMapObject = (
  dependencies: AdapterDependencies,
) => {
  const deps = {
    ...dependencies,
    aggregatorCredentials: {
      ...dependencies.aggregatorCredentials,
    },
  };

  return {
    sophtron: {
      dataAdapter: createDataAdapter(deps),
      vcAdapter: createSophtronVC(deps),
      widgetAdapter: new SophtronAdapter({
        dependencies: deps,
      }),
    } as AdapterMap,
  } as Record<string, AdapterMap>;
};

export * from "./models";
