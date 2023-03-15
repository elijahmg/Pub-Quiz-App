import { procedure } from '../trpc';
import { z } from 'zod';

// think about query as Get from REST
// and mutation as POST/PATCH/DELETE
// for more check https://trpc.io/docs/useMutation
export const hello = procedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
  .query(({ input }) => {
    return {
      greeting: `hello ${input.text}`,
    };
  });
