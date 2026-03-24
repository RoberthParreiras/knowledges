using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitecture.Infrastructure.Data;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder
            .Property(p => p.Name)
            .HasConversion(name => name.PersonName, value => new Name(value))
            .HasMaxLength(120)
            .IsRequired();

        builder
            .Property(p => p.Price)
            .HasConversion(price => price.Value, value => new Price(value))
            .HasPrecision(18, 2)
            .IsRequired();

        builder
            .Property(p => p.StockQuantity)
            .HasConversion(stock => stock.Value, value => new StockQuantity(value))
            .IsRequired();

        builder.Property(p => p.CreatedAt).IsRequired();
    }
}
