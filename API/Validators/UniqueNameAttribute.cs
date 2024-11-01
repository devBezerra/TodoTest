using System.ComponentModel.DataAnnotations;
using API.Data;

[AttributeUsage(AttributeTargets.Property)]
public class UniqueNameAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string name && !string.IsNullOrWhiteSpace(name))
        {
            var dbContext = (AppDbContext)validationContext.GetService(typeof(AppDbContext));

            bool exists = dbContext.Users.Any(u => u.Name == name);
            if (exists)
            {
                return new ValidationResult("O nome de usuário já existe.");
            }
        }

        return ValidationResult.Success;
    }
}
