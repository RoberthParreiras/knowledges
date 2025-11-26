A hashmap is an optimized data structure for storing and retrieving key-value pairs. It uses an array (or list) of __buckets__ to store the data. Each bucket can hold multiple key-value pairs to handle cases where different keys map to the same bucket.

### Logic
First, you create a __list__ of buckets with a fixed initial size. When you store a key-value pair, a __hash__ is generated from the **key** using the formula `index = hash % size`. This determines which bucket the key-value pair will be stored in. To handle hash collisions (when multiple keys map to the same index), the key-value pairs are stored in a __list__ or a __linked list__ at that index. This technique is called **Separate Chaining**.

## List (for buckets)
*   **Insertion**: The time complexity is *`O(1)`* (amortized), because you calculate the index and append to the list.
*   **Search**: The average time complexity is close to *`O(1)`* if keys are distributed evenly. Worst case is *`O(k)`*, where `k` is the number of items in that bucket.
*   **Deletion**: The time complexity is *`O(k)`*, because it requires finding and removing the element.

## Linked List (for nodes)
*   **Insertion**: The time complexity is *`O(1)`*, because you add the new item to the head of the list.
*   **Search**: The average time complexity is close to *`O(1)`*, but worst case is *`O(k)`*.
*   **Deletion**: The time complexity is *`O(k)`*, because finding the node takes *`O(k)`* time.

The average complexity of __hashmap__ operations is *`O(1)`*, assuming a good hash function with even distribution.