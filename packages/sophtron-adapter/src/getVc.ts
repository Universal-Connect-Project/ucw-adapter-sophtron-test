import axios from "axios";
import type { AdapterDependencies, VCDependencies } from "models";
import { buildSophtronAuthCode } from "./utils";
import SophtronClient from "./apiClient.v1";

interface VcResponse {
  vc: string;
}

export const getVc = async (path: string, args: VCDependencies) => {
  const { aggregatorCredentials } = args;
  const { clientId, secret, vcEndpoint } = aggregatorCredentials;

  console.log("clientId", clientId);
  console.log("secret", secret);
  console.log("vcEndpoint", vcEndpoint);
  const sophtronClient = new SophtronClient(args as AdapterDependencies);

  const res = await sophtronClient.getUserIntegrationKey();
  const headers = {
    IntegrationKey: res.IntegrationKey,
    Authorization: buildSophtronAuthCode("get", path, clientId, secret),
  };

  const ret: VcResponse = (
    await axios({
      url: `${vcEndpoint}vc/${path}`,
      method: "get",
      headers,
    })
  ).data;

  return ret?.vc;
};
