import { type AdapterMap, getDataFromVCJwt } from "@repo/utils";

import { SophtronAdapter } from "./adapter";
import { createSophtronVC, type DataParameters } from "./createVc";
import type { AdapterDependencies } from "./models";

export const getSophtronAdapterMapObject = (
  dependencies: AdapterDependencies,
) => {
  return {
    sophtron: {
      dataAdapter: async (params: DataParameters) => {
        return await getDataFromVCJwt(await createSophtronVC(dependencies)(params));
      },
      vcAdapter: createSophtronVC(dependencies),
      widgetAdapter: new SophtronAdapter({
        dependencies,
      }),
    } as AdapterMap,
  } as Record<string, AdapterMap>;
};

export * from "./models";
