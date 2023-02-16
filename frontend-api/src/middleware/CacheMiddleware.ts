import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as RedisCache from "express-redis-cache";

@Middleware({ type: "before" })
export class CacheMiddleware implements ExpressMiddlewareInterface {
  private cache = RedisCache.default({
    host: "localhost",
    prefix: "cache",
    expire: 60,
  });
  public use(request: any, response: any, next: (err?: any) => any) {
    this.cache.route()(request, response, next);
  }
}
