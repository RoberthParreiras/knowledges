namespace CleanArchitecture.Application.Models;

public record CreateProductRequest(string Name, decimal Price, int StockQuantity);

public record ProductResponse(Guid Id, string Name, decimal Price, int StockQuantity);
