import time
from collections import deque

class SlidingWindowRateLimiter:
    def __init__(self, requests_limit: int, window: int) -> None:
        """
        :param requests_limit: Max requests allowed in the window.
        :param window_seconds: The size of the window in seconds.
        """
        self._requests_limit = requests_limit
        self._window = window

        # this deque will store the timestamps of valid requests
        self._requests_made: deque = deque()

    def _remove_old_requests(self, now: float) -> None:
        while self._requests_made and self._requests_made[0] <= (now - self._window):
            self._requests_made.popleft()

    def allow_request(self) -> bool:
        now = time.time()

        self._remove_old_requests(now)
        
        if len(self._requests_made) < self._requests_limit:
            self._requests_made.append(now)
            return True
        else: 
            return False
        
if __name__ == "__main__":
    limiter = SlidingWindowRateLimiter(requests_limit=3, window=5)

    # simulate traffic
    for i in range(1, 11):
        is_request_allowed = limiter.allow_request()
        print(f"Request {i} at {time.strftime('%X')}: {is_request_allowed if 'Allowed' else 'Denied'}")
    
        time.sleep(1)
