namespace CleanArchitecture.Domain.Constants;

public static class DomainProduct
{
    public const int MaxNameLength = 120;
    public const int MinNameLength = 3;
    public const decimal MaxPriceValue = 100_000m;
    public const decimal MinPriceValue = 0;
    public const int PricePrecision = 18;
    public const int PriceScale = 2;
    public const int MinStockQuantityValue = 0;
    public const int MaxStockQuantityValue = 100;
}
