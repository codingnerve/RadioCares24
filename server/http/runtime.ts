import { loadEnv } from "../config/env";
import { createMailer } from "../services/mailer";
import { createLogger } from "../utils/logger";
import { createApi, type ApiHandler } from "./api";

// Kept on globalThis so Next.js dev reloads do not reset rate-limit counters.
const shared = globalThis as typeof globalThis & { __rc24Api?: ApiHandler };

/**
 * The production API handler, built lazily on the first request (never at import or build time,
 * so `next build` works without secrets). Throws a readable error if the environment is invalid.
 */
export function getApi(): ApiHandler {
  if (!shared.__rc24Api) {
    const env = loadEnv();
    const logger = createLogger(env.logLevel);
    shared.__rc24Api = createApi({ env, logger, mailer: createMailer(env, logger) });
  }
  return shared.__rc24Api;
}
