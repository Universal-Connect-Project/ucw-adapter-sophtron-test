import { getMxAdapterMapObject } from "@ucp-npm/mx-adapter";
import { getSophtronAdapterMapObject } from "@ucp-npm/sophtron-adapter";
import { getTemplateAdapterMapObject } from "@ucp-npm/template-adapter";
import { adapterMapObject as testAdapterMapObject } from "./test-adapter";
import config from "./config";
import { get, set } from "./services/storageClient/redis";
import * as logger from "./infra/logger";
import * as http from "./infra/http";

const templateAdapterMapObject = getTemplateAdapterMapObject();

const sophtronAdapterMapObject = getSophtronAdapterMapObject({
  logClient: logger,
  httpClient: http,
  aggregatorCredentials: {
    sophtron: {
      clientId: config.SophtronApiUserId,
      secret: config.SophtronApiUserSecret,
      endpoint: config.SophtronApiServiceEndpoint,
      vcEndpoint: config.SophtronVCServiceEndpoint,
      aggregator: "sophtron",
      available: true,
    },
  },
  envConfig: {
    HOSTURL: config.HOSTURL,
  },
});

const mxAdapterMapObject = getMxAdapterMapObject({
  cacheClient: {
    set: set,
    get: get,
  },
  logClient: logger,
  aggregatorCredentials: {
    mxInt: {
      username: config.MxClientId,
      password: config.MxApiSecret,
      basePath: "https://int-api.mx.com",
      vcEndpoint: "https://int-api.mx.com/",
      aggregator: "mx_int",
      available: true,
    },
    mxProd: {
      username: config.MxClientIdProd,
      password: config.MxApiSecretProd,
      basePath: "https://api.mx.com",
      vcEndpoint: "https://api.mx.com/",
      aggregator: "mx",
      available: true,
    },
  },
  envConfig: {
    HOSTURL: config.HOSTURL,
  },
});

// This is where you add adapters
export const adapterMap = {
  ...templateAdapterMapObject,
  ...mxAdapterMapObject,
  ...sophtronAdapterMapObject,
  ...testAdapterMapObject,
};

export type Aggregator = keyof typeof adapterMap | string;
export const aggregators = Object.keys(adapterMap);
