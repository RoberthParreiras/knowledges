using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.ValueObjects;

namespace CleanArchitecture.Tests.Domain.UnitTests;

[TestFixture]
public class ProductsTests
{
    [Test]
    public void Constructor_Should_Set_Properties_And_Generate_Metadata()
    {
        var before = DateTime.UtcNow;

        var product = new Product(
            new Name("  Keyboard   "),
            new Price(99.99m),
            new StockQuantity(10)
        );

        var after = DateTime.UtcNow;

        Assert.Multiple(() =>
        {
            Assert.That(product.Id, Is.Not.EqualTo(Guid.Empty));
            Assert.That(product.Name.PersonName, Is.EqualTo("Keyboard"));
            Assert.That(product.Price.Value, Is.EqualTo(99.99m));
            Assert.That(product.StockQuantity.Value, Is.EqualTo(10));
            Assert.That(product.CreatedAt, Is.InRange(before, after));
        });
    }

    [TestCase("")]
    [TestCase("     ")]
    public void Constructor_Should_Throw_When_Name_Is_Invalid(string invalidName)
    {
        Assert.Throws<ArgumentException>(() =>
            new Product(new Name(invalidName), new Price(20m), new StockQuantity(23))
        );
    }

    [Test]
    public void Constructor_Should_Throw_When_Price_Is_Negative()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() =>
            new Product(new Name("Mouse"), new Price(-1m), new StockQuantity(1))
        );
    }

    [Test]
    public void Constructor_Should_Throw_When_Price_Has_More_Than_2_Decimals()
    {
        Assert.Throws<ArgumentException>(() =>
            new Product(new Name("Mouse"), new Price(10.999m), new StockQuantity(1))
        );
    }

    [Test]
    public void Constructor_Should_Throw_When_Stock_Is_Negative()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() =>
            new Product(new Name("Mouse"), new Price(10m), new StockQuantity(-1))
        );
    }
}
