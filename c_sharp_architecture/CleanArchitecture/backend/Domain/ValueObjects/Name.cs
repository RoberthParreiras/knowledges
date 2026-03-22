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

        return personName.Trim();
    }

    public static implicit operator string(Name name) => name.PersonName;
}
