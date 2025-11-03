from typing import Any

class HashMap:
    def __init__(self, size=50) -> None:
        self.size = size
        self.bucket = [[] for _ in range(self.size)]
    
    def _hash(self, key: str) -> int:
        return hash(key) % self.size
    
    def put(self, key: str, value: Any) -> None:
        index = self._hash(key)
        bucket = self.bucket[index]

        for i, (existing_key, existing_value) in enumerate(bucket):
            if existing_key == key:
                bucket[i] = (key, value)
                return
        
        bucket.append((key, value))
    
    def get(self, key: str) -> Any:
        index = self._hash(key)
        bucket = self.bucket[index]

        for existing_key, existing_value in bucket:
            if existing_key == key:
                return existing_value

        return "Key not found"
    
    def delete(self, key: str) -> Any:
        index = self._hash(key)
        bucket = self.bucket[index]

        for i, (existing_key, existing_value) in enumerate(bucket):
            if existing_key == key:
                bucket.pop(i)
                return "Deleted with success"
        
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

