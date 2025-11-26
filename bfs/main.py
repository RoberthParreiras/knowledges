from collections import deque
from person import Person

# search if a friend or friend among your friends is a mango seller
def bfs(friends_net: dict, you: Person):
    search_queue: deque = deque()
    persons_checked: set = set()

    search_queue += friends_net[you]
    persons_checked.add(you.get_name())

    while search_queue:
        person: Person = search_queue.popleft()

        if person.get_name() not in persons_checked:

            if person.is_mango_seller():
                return {
                    "message": f"Wow! You founded. {person.get_name()} is mango seller.",
                    "status": "Success"
                }
        
            search_queue += friends_net[person]
            persons_checked.add(person.get_name())

    return {
        "message": "There is no mango seller among your friends.",
        "status": "Failed"
    }

if __name__ == "__main__":
    you = Person(name="you", is_mango_seller=False)
    alice = Person(name="alice", is_mango_seller=False)
    bob = Person(name="bob", is_mango_seller=False)
    claire = Person(name="claire", is_mango_seller=False)
    anuj = Person(name="anuj", is_mango_seller=False)
    peggy = Person(name="peggy", is_mango_seller=False)
    thom = Person(name="thom", is_mango_seller=True)
    jonny = Person(name="jonny", is_mango_seller=False)

    friends_net = {}
    friends_net[you] = [alice, bob, claire]
    friends_net[bob] = [anuj, peggy]
    friends_net[alice] = [peggy]
    friends_net[claire] = [thom, jonny]
    friends_net[anuj] = []
    friends_net[peggy] = []
    friends_net[thom] = []
    friends_net[jonny] = []

    print(bfs(friends_net, you))