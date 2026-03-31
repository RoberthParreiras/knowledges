using CleanArchitecture.Domain.Constants;

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
        if (priceValue < DomainProduct.MinPriceValue)
        {
            throw new ArgumentOutOfRangeException(
                nameof(priceValue),
                $"Value must be greater than {DomainProduct.MinPriceValue}."
            );
        }

        if (priceValue > DomainProduct.MaxPriceValue)
        {
            throw new ArgumentOutOfRangeException(
                nameof(priceValue),
                $"Value must be less than {DomainProduct.MaxPriceValue}"
            );
        }

        if (decimal.Round(priceValue, DomainProduct.PriceScale) != priceValue)
        {
            throw new ArgumentException(
                $"Value cannot contain more than {DomainProduct.PriceScale} decimal places"
            );
        }
    }

    public static implicit operator decimal(Price price) => price.Value;
}
