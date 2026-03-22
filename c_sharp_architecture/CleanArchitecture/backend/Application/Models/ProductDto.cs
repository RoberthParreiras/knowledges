namespace CleanArchitecture.Application.DTO;

public record CreateProductRequest(
    string Name,
    decimal Price,
    int StockQuantity
);

public record ProductResponse(
    Guid Id,
    string Name,
    decimal Price,
    int StockQuantity
);
