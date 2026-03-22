using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;
using CleanArchitecture.Application.DTO;
using CleanArchitecture.Application.Services;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateProductRequest request)
    {
        await _productService.CreateProductAsync(request.Name, request.Price, request.StockQuantity);

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductResponse>>> GetAllProducts()
    {
        var products = await _productService.GetProductsAsync();

        var res = products.Select(product => new ProductResponse(
            product.Id, product.Name, product.Price, product.StockQuantity
        ));

        return Ok(res);
    }
}
