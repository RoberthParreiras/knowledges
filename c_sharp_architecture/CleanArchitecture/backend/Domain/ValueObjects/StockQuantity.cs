namespace CleanArchitecture.Domain.ValueObjects;

public record StockQuantity
{
    public int Value { get; init; }

    public StockQuantity(int value)
    {
        Validate(value);
        Value = value;
    }

    private static void Validate(int stockQuantity)
    {
        if (stockQuantity < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(stockQuantity), "Stock cannot be negative");
        }
    }

    public static implicit operator int(StockQuantity stockQuantity) => stockQuantity.Value;
}