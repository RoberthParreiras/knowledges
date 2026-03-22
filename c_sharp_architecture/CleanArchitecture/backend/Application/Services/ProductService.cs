using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.ValueObjects;
using CleanArchitecture.Domain.Repositories;
using System.Security.Cryptography.X509Certificates;
using System.Runtime.CompilerServices;
using System.Collections;

namespace CleanArchitecture.Application.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task CreateProductAsync(string productName, decimal productPrice, int productStockQuantity)
    {
        var name = new Name(productName);
        var price = new Price(productPrice);
        var stockQuantity = new StockQuantity(productStockQuantity);

        var product = new Product(name, price, stockQuantity);

        await _productRepository.Create(product);

        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _productRepository.GetProductsAsync();
    }
}
