import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

type CreateContextOptions = Record<string, never>;

import { prisma } from '../db';

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;
