using CleanArchitecture.Application.Services;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;
using CleanArchitecture.Domain.ValueObjects;
using Moq;

namespace CleanArchitecture.Tests.Application.UnitTests;

[TestFixture]
public class ProductsService
{
    private ProductService _productService = null!;
    private Mock<IProductRepository> _productRepository = null!;
    private Mock<IUnitOfWork> _unitOfWork = null!;

    [SetUp]
    public void SetUp()
    {
        _productRepository = new Mock<IProductRepository>();
        _unitOfWork = new Mock<IUnitOfWork>();
        _productService = new ProductService(_productRepository.Object, _unitOfWork.Object);
    }

    [Test]
    public async Task Should_Create_A_Product_Async()
    {
        Product? createdProduct = null;

        _productRepository
            .Setup(r => r.Create(It.IsAny<Product>()))
            .Callback<Product>(p => createdProduct = p)
            .Returns(Task.CompletedTask);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        await _productService.CreateProductAsync("Test Product", 11m, 1);

        Assert.Multiple(() =>
        {
            Assert.That(createdProduct, Is.Not.Null);
            Assert.That(createdProduct!.Name.PersonName, Is.EqualTo("Test Product"));
            Assert.That(createdProduct.Price.Value, Is.EqualTo(11m));
            Assert.That(createdProduct.StockQuantity.Value, Is.EqualTo(1));
        });

        _productRepository.Verify(r => r.Create(It.IsAny<Product>()), Times.Once);
        _unitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test]
    public async Task Should_Return_Products_Async()
    {
        var expectedProducts = new List<Product>
        {
            new(new Name("Test Product 1"), new Price(99.99m), new StockQuantity(10)),
            new(new Name("Test Product 2"), new Price(49.50m), new StockQuantity(25)),
        };

        _productRepository.Setup(r => r.GetProductsAsync()).ReturnsAsync(expectedProducts);

        var products = (await _productService.GetProductsAsync()).ToList();

        Assert.Multiple(() =>
        {
            Assert.That(products, Has.Count.EqualTo(2));

            Assert.That(products[0].Name.PersonName, Is.EqualTo("Test Product 1"));
            Assert.That(products[0].Price.Value, Is.EqualTo(99.99m));
            Assert.That(products[0].StockQuantity.Value, Is.EqualTo(10));

            Assert.That(products[1].Name.PersonName, Is.EqualTo("Test Product 2"));
            Assert.That(products[1].Price.Value, Is.EqualTo(49.50m));
            Assert.That(products[1].StockQuantity.Value, Is.EqualTo(25));
        });
    }
}
