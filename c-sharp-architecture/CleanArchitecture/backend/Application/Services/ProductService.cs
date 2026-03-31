using CleanArchitecture.Application.Models;
using CleanArchitecture.Application.Validations;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;
using CleanArchitecture.Domain.ValueObjects;
using FluentValidation;

namespace CleanArchitecture.Application.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ProductValidator _productValidator;

    public ProductService(
        IProductRepository productRepository,
        IUnitOfWork unitOfWork,
        ProductValidator productValidator
    )
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
        _productValidator = productValidator;
    }

    public async Task CreateProductAsync(CreateProductRequest data)
    {
        var res = await _productValidator.ValidateAsync(data);

        if (!res.IsValid)
        {
            throw new ValidationException(res.Errors);
        }

        var name = new Name(data.Name);
        var price = new Price(data.Price);
        var stockQuantity = new StockQuantity(data.StockQuantity);

        var product = new Product(name, price, stockQuantity);

        await _productRepository.Create(product);

        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _productRepository.GetProductsAsync();
    }
}
