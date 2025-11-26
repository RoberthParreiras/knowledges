A BFS is an algorithm that searches in a tree or graph. It starts at the root and explores all nodes at the current depth before moving to the next depth level. Uses a __queue__ to store the nodes that have not been explored yet.

This BFS example is based in the [`Grokking Algorithms`](https://www.amazon.com.br/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230) book example.

![Example graph of Grokking Book](/bfs/image.png)

### Logic
First, you create each friend as a __Person__, containing the name and whether they are a mango seller. Then, you create a __dict__ to store the relationships, with __Person__ as the `key`. Inside `bfs`, a __deque__ stores the current friends to check (not yet verified as mango sellers). A __set__ tracks already-checked friends, preventing loops and optimizing the search.

## Deque
*   **Insertion**: The time complexity is *`O(1)`*, because it inserts at the end of the queue.
*   **Deletion**: The time complexity is *`O(1)`*, because it removes from the left or right end.

## Dictionary
*   **Insertion**: The time complexity is *`O(1)`*, because of hashing.
*   **Search**: The average time complexity is close to *`O(1)`*, because of hashing.

## Set
*   **Insertion**: The time complexity is *`O(1)`*, because of hashing.
*   **Search**: The time complexity is *`O(1)`*, because of hashing.

The average complexity of __bfs__ is *`O(V + E)`*, where `V` is the number of vertices and `E` is the number of edges.