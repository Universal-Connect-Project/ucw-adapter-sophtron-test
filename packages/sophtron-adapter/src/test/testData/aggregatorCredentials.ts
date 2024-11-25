import { SOPHTRON_ADAPTER_NAME } from "../../constants";
import type { ApiCredentials } from "../../models";

export const aggregatorCredentials: ApiCredentials = {
  clientId: "testClientId",
  secret: "testSecret",
  endpoint: "https://api.sophtron.com/api",
  vcEndpoint: "https://vc.sophtron.com/api/",
  aggregator: SOPHTRON_ADAPTER_NAME,
  available: true,
};
