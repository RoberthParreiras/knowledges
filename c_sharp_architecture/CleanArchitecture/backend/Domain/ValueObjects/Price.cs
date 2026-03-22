namespace CleanArchitecture.Domain.ValueObjects;

public record Price
{
    public decimal Value { get; init; }

    public Price(decimal value)
    {
        Validate(value);

        Value = value;
    }

    private static void Validate(decimal priceValue)
    {
        if (priceValue < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(priceValue), "Value cannot be negative.");
        }

        if (priceValue > 100_000m)
        {
            throw new ArgumentOutOfRangeException(nameof(priceValue), "Value must be greater than R$100.000");
        }

        if (decimal.Round(priceValue, 2) != priceValue)
        {
            throw new ArgumentException("Value cannot contains more than 2 decimal places");
        }
    }

    public static implicit operator decimal(Price price) => price.Value;
}
