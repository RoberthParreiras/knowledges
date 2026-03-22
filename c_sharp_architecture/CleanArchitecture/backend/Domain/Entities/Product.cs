using CleanArchitecture.Domain.ValueObjects;

namespace CleanArchitecture.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public Name Name { get; private set; }
    public Price Price { get; private set; }
    public StockQuantity StockQuantity { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public Product(Name name, Price price, StockQuantity stockQuantity)
    {
        Id = Guid.NewGuid();
        Name = name;
        Price = price;
        StockQuantity = stockQuantity;
        CreatedAt = DateTime.UtcNow;
    }
}
