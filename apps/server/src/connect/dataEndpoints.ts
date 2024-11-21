/* eslint-disable @typescript-eslint/naming-convention */
import type { Response } from "express";
import he from "he";
import Joi from "joi";

import { VCDataTypes } from "@repo/utils";
import type { ConnectApi } from "./connectApi";
import type { Aggregator } from "../shared/contract";
import { withValidateAggregatorInPath } from "../utils/validators";
import { getAggregatorAdapter, getVC } from "../adapterIndex";

export interface AccountsDataQueryParameters {
  connectionId: string;
  aggregator: Aggregator;
  userId: string;
}

export interface AccountsRequest {
  params: AccountsDataQueryParameters;
  connectApi?: ConnectApi;
}

export interface IdentityRequest {
  params: IdentityDataParameters;
}

export interface TransactionsRequest {
  query: TransactionsDataQueryParameters;
  params: TransactionsDataPathParameters;
  connectApi?: ConnectApi;
}

export const accountsDataHandler = withValidateAggregatorInPath(
  async (req: AccountsRequest, res: Response) => {
    const { aggregator, connectionId, userId } = req.params;

    const aggregatorAdapter = getAggregatorAdapter(aggregator);
    const aggregatorUserId = await aggregatorAdapter.ResolveUserId(userId);

    try {
      const vc = await getVC({
        aggregator,
        connectionId,
        type: VCDataTypes.ACCOUNTS,
        userId: aggregatorUserId,
      });
      res.send({
        jwt: vc,
      });
    } catch (error) {
      res.status(400);
      res.send("Something went wrong");
    }
  },
);

export interface IdentityDataParameters {
  connectionId: string;
  aggregator: Aggregator;
  userId: string;
}

export const identityDataHandler = withValidateAggregatorInPath(
  async (req: IdentityRequest, res: Response) => {
    const { aggregator, connectionId, userId } = req.params;

    const aggregatorAdapter = getAggregatorAdapter(aggregator);
    const aggregatorUserId = await aggregatorAdapter.ResolveUserId(userId);

    try {
      const vc = await getVC({
        aggregator,
        connectionId,
        type: VCDataTypes.IDENTITY,
        userId: aggregatorUserId,
      });
      res.send({
        jwt: vc,
      });
    } catch (error) {
      res.status(400);
      res.send("Something went wrong");
    }
  },
);

export interface TransactionsDataQueryParameters {
  end_time: string;
  start_time: string;
}

export interface TransactionsDataPathParameters {
  accountId: string;
  aggregator: Aggregator;
  userId: string;
}

export const transactionsDataHandler = withValidateAggregatorInPath(
  async (req: TransactionsRequest, res: Response) => {
    const { accountId, aggregator, userId } = req.params;
    let validationError: string | undefined;

    if (
      typeof req.connectApi?.aggregatorAdapter?.DataRequestValidators
        ?.transactions === "function"
    ) {
      validationError =
        req.connectApi?.aggregatorAdapter.DataRequestValidators?.transactions(
          req,
        );
    } else {
      const schema = Joi.object({
        end_time:
          aggregator === ("sophtron" as Aggregator)
            ? Joi.string().required()
            : Joi.string(),
        start_time:
          aggregator === ("sophtron" as Aggregator)
            ? Joi.string().required()
            : Joi.string(),
      });

      const { error } = schema.validate(req.query);

      if (error) {
        validationError = error.details[0].message;
      }
    }

    if (validationError) {
      res.status(400);
      res.send(he.encode(validationError));
      return;
    }

    const { start_time, end_time } = req.query;

    const aggregatorAdapter = getAggregatorAdapter(aggregator);
    const aggregatorUserId = await aggregatorAdapter.ResolveUserId(userId);

    try {
      const vc = await getVC({
        aggregator,
        type: VCDataTypes.TRANSACTIONS,
        userId: aggregatorUserId,
        accountId,
        startTime: start_time,
        endTime: end_time,
      });
      res.send({
        jwt: vc,
      });
    } catch (error) {
      res.status(400);
      res.send("Something went wrong");
    }
  },
);
