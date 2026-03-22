using Microsoft.EntityFrameworkCore;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;


namespace CleanArchitecture.Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _appDbContext;

    public ProductRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public Task Create(Product product)
    {
        _appDbContext.Products.Add(product);
        return Task.CompletedTask;
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _appDbContext.Products.AsNoTracking().ToListAsync();
    }
}
