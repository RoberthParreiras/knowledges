using CleanArchitecture.Application.Models;
using CleanArchitecture.Domain.Constants;
using FluentValidation;

namespace CleanArchitecture.Application.Validations;

public class ProductValidator : AbstractValidator<CreateProductRequest>
{
    public ProductValidator()
    {
        RuleFor(product => product.Name)
            .NotEmpty()
            .WithMessage("The name field is required.")
            .MinimumLength(DomainProduct.MinNameLength)
            .WithMessage($"The name must be greater than {DomainProduct.MinNameLength} letters.")
            .MaximumLength(DomainProduct.MaxNameLength)
            .WithMessage($"The name must be less than {DomainProduct.MaxNameLength} letters.");

        RuleFor(product => product.Price)
            .NotEmpty()
            .WithMessage("The price field is required.")
            .GreaterThan(DomainProduct.MinPriceValue)
            .WithMessage($"The price must be greater than {DomainProduct.MinPriceValue}")
            .LessThan(DomainProduct.MaxPriceValue)
            .WithMessage($"The price must be less than {DomainProduct.MaxPriceValue}")
            .PrecisionScale(DomainProduct.PricePrecision, DomainProduct.PriceScale, true)
            .WithMessage("The price field cannot contain more than 2 decimal places");

        RuleFor(product => product.StockQuantity)
            .NotEmpty()
            .WithMessage("The stock quantity field is required.")
            .GreaterThan(DomainProduct.MinStockQuantityValue)
            .WithMessage(
                $"The stock quantity must be greater than {DomainProduct.MinStockQuantityValue}"
            )
            .LessThan(DomainProduct.MaxStockQuantityValue)
            .WithMessage(
                $"The stock quantity must be less than {DomainProduct.MaxStockQuantityValue}"
            );
    }
}
