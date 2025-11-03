from typing import Any

class Node:
    def __init__(self, key: str, value: Any) -> None:
        self.key = key
        self.value = value
        self.next = None

class HashMap:
    def __init__(self, size = 50) -> None:
        self.size = size

        # Create an Array of "heads" of linked lists
        self.node = [None] * self.size

    def _hash(self, key: str) -> int:
        return hash(key) % self.size

    def put(self, key: str, value: Any) -> None:
        index = self._hash(key)
        node: Node = self.node[index]

        while node:
            if node.key == key:
                node.value = value
                return
            
            node = node.next
        
        new_node = Node(key, value)
        new_node.next = self.node[index] # Point the new node to the old node
        self.node[index] = new_node
    
    def get(self, key: str) -> Any:
        index = self._hash(key)
        node: Node = self.node[index]

        while node:
            if node.key == key:
                return node.value
            
            node = node.next

        return "Key not Found"
    
    def delete(self, key: str) -> str:
        index = self._hash(key)
        node: Node = self.node[index]
        prev: Node = None

        while node:
            if node.key == key:
                if prev:
                    # It's in the middle or at the end
                    prev.next = node.next
                
                else:
                    # It's the head node
                    self.node[index] = node.next
                return "Success"

            prev = node
            node = node.next
        
        return "Key not found"

if __name__ == "__main__":
    my_hashmap = HashMap(size=5)

    my_hashmap.put("John", 100)
    my_hashmap.put("Jason", 200)

    print(f"The value is: {my_hashmap.get('John')}")
    print(f"The value is: {my_hashmap.get('Jason')}")
    print(f"The value is: {my_hashmap.get('Josh')}")
    
    print(my_hashmap.delete("Jason"))
    print(my_hashmap.delete("Jason"))