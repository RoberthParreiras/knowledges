A hashmap is an optimized data structure for storing and retrieving key-value pairs. It uses an array (or list) of "buckets" or "nodes". Each bucket can hold multiple key-value pairs to handle cases where different keys map to the same bucket. This is often done using a list or a linked list at each index.

### Logic
When you store a key-value pair in the hashmap, a __hash__ is generated from the **key**. This hash is then converted into an index into the underlying array, typically using the formula `index = hash % size`, where `size` is the number of buckets in the hashmap. This determines which bucket the key-value pair will be stored in. To handle hash collisions (when multiple keys map to the same index), the key-value pairs are stored in a __list__ or a __linked list__ at that index. This technique is called **Separate Chaining**.

## List (for buckets)
When using a list for each bucket:
*   **Insertion**: The average time complexity is *`O(1)`* (amortized). You calculate the index and append to the list.
*   **Search**: The average time complexity is close to *`O(1)`* if the hash function distributes keys evenly. In the worst case (all keys hash to the same bucket), it becomes *`O(k)`*, where `k` is the number of items in that bucket.
*   **Deletion**: This requires finding the element and then removing it. The time complexity is *`O(k)`*, where `k` is the number of items in the bucket's list.

## Linked List (for nodes)
When using a linked list for each node:
*   **Insertion**: The time complexity is *`O(1)`*, as you can add the new item to the head of the list.
*   **Search**: The average time complexity is close to *`O(1)`*, but the worst-case is *`O(k)`*, similar to using a list.
*   **Deletion**: This requires finding the node and then removing it. Finding the node takes *`O(k)`* time. Once found, updating the pointers is *`O(1)`*. Therefore, the total time complexity for deletion is *`O(k)`*.