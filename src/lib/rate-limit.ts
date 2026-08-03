import { RATE_LIMITS } from '@/lib/config';

type RateLimitKey = keyof typeof RATE_LIMITS;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * Rate limit em memória, por processo.
 * ATENÇÃO: não sobrevive a restart nem funciona em serverless multi-instância.
 * Para produção, trocar por Redis/Upstash ou tabela no Supabase.
 */
const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(ip: string, key: RateLimitKey): RateLimitResult {
  const { maxRequests, windowMs } = RATE_LIMITS[key];
  const now = Date.now();
  const storeKey = `${key}:${ip}`;
  const entry = store.get(storeKey);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(storeKey, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(storeKey, entry);
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}
