using CleanArchitecture.Domain.Constants;

namespace CleanArchitecture.Domain.ValueObjects;

public record Name
{
    public string PersonName { get; init; }

    public Name(string personName)
    {
        string validName = Validate(personName);
        PersonName = validName;
    }

    private static string Validate(string personName)
    {
        if (string.IsNullOrWhiteSpace(personName))
        {
            throw new ArgumentException("The field is empty.", nameof(personName));
        }

        if (personName.Length < DomainProduct.MinNameLength)
        {
            throw new ArgumentOutOfRangeException(
                nameof(personName),
                $"Value must be greater than {DomainProduct.MinNameLength}"
            );
        }

        if (personName.Length > DomainProduct.MaxNameLength)
        {
            throw new ArgumentOutOfRangeException(
                nameof(personName),
                $"Value must be less than {DomainProduct.MaxNameLength}"
            );
        }

        return personName.Trim();
    }

    public static implicit operator string(Name name) => name.PersonName;
}
