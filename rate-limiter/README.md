Rate limiting is a technique to limit the number of requests that can be sent to a web server or API. You can use rate limiting in front of the client or on the server to limit the usage of certain routes. In this repository, there will be a simple implementation in Python using the sliding window algorithm. There will also be a simple implementation in __Next.js__, using @upstash/rate-limiting and @upstash/redis.

## Logic

### Simple Implementation - Python

There are several algorithms that can be used to accomplish rate limiting. I will focus on the __Sliding Window__ algorithm because it's a good choice for this problem. __Sliding Window__ creates a window that "moves" over time, checking if the user can make a request while within the window (i.e., if the request limit has not been exceeded). If old request logs are outside the window, they will be deleted.

#### Deque
*   **Insertion**: The time complexity is *`O(1)`*, because it inserts at the end of the queue.
*   **Deletion**: The time complexity is *`O(1)`*, because it removes from the left end.

### Simple Implementation - Next.js

This uses middleware to limit routes that have expensive resources, using __Redis__ to store the requests made.

For rate limiting login and other client-side network traffic, you can use __Cloudflare Rate Limiting__.