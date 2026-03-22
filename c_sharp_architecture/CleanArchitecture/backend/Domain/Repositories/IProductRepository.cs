using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Domain.Repositories;

public interface IProductRepository
{
    Task Create(Product product);
    Task<IEnumerable<Product>> GetProductsAsync();
}
