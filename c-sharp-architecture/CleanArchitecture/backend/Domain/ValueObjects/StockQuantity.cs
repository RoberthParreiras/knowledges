using CleanArchitecture.Domain.Constants;

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
        if (stockQuantity < DomainProduct.MinStockQuantityValue)
        {
            throw new ArgumentOutOfRangeException(
                nameof(stockQuantity),
                $"Value cannot be less than {DomainProduct.MinStockQuantityValue}"
            );
        }

        if (stockQuantity > DomainProduct.MaxStockQuantityValue)
        {
            throw new ArgumentOutOfRangeException(
                nameof(stockQuantity),
                $"Value cannot be greater than {DomainProduct.MaxStockQuantityValue}"
            );
        }
    }

    public static implicit operator int(StockQuantity stockQuantity) => stockQuantity.Value;
}
