import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as RedisCache from "express-redis-cache";

@Middleware({ type: "before" })
export class CacheMiddleware implements ExpressMiddlewareInterface {
  private cache = RedisCache.default({
    host: process.env.REDIS,
    prefix: "cache",
    expire: 10,
  });
  private useCaching = this.cache.route();

  public use(request: any, response: any, next: (err?: any) => any) {
    this.useCaching(request, response, next);
  }
}
