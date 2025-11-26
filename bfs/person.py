class Person:
    def __init__(self, name: str, is_mango_seller: bool) -> None:
        self._name = name
        self._is_mango_seller = is_mango_seller

    def is_mango_seller(self) -> bool:
        return self._is_mango_seller

    def get_name(self) -> str:
        return self._name
