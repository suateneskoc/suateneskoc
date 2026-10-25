import { Pool } from "@neondatabase/serverless";

import { env } from "@/env";

export const database = new Pool({
  connectionString: env.DATABASE_URL,
  max: 5,
});
