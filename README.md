# Live Ranking

Example of a live leaderboard using PUB/SUB to listen to experience update, like if it were a live compition between players.

## Considerations
### Top 5 tracking
Assumption is a high traffic leadboard, where the top players doesn't change often. 
The frontend keeps track of the top 10 players, and shows 5.<br />
This is done because theorectically place 6 can swap into place 5, but swapping in from beyond the top 10 to the top 5 should be unlikely.<br />
In the case there are mayor changes beyond the top 10, the frontend does reload the top 10 every 30 seconds. <br />
This behaviour can be observed by using the "Clear all" button and waiting until the next refresh.

### Caching
Calling the backend API is assumed to be expensive, especially during high trafic, this is why the frontend API applies a 10 second cache.<br />
The backend API itself however has no cache, as it assumes to be server-server traffic only.

### Redis
Redis is used as a memory cache as well as PUB/SUB channel. To simplify the setup, there is only 1 Redis setup, however in a production environment it would be better to split this up in two different services, or implement the frontend API cache differently.<br />
Prefered would be 1 Redis cluster for the character data, and another cluster for the output caching of the frontend API.

### Backend, Frontend API / APP split
- Backend API is assumed to be close to the data, requiring more restrictive networking setup but providing highspeed access. A more microservice approach. Authentication can be through an API-Key.
- Frontend API can contain application specific data handling, and could potentially combine several backend APIs / microservices. Also responsible for handling user authentication. Highly regionally scalable, assuming cloud provider provides good networking. e.g. 3 Frontend APIs (Americas, Europe/Africa, Asia/Oceania) talking to 1 Backend API (Europe).
- Frontend App, standalone SPA/PWA with SSR for SEO. Can be cached or regionalized depending on demand and data dynamic. Since data gets hydrated, the search engine sees cached data, but the app will load the most recent data afterwards.
