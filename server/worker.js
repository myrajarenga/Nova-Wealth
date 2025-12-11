import { serve } from "@hono/node-server";
import app from "./server.js";

// Cloudflare Worker entrypoint
export default {
  fetch: serve(app),
};
