using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Reflection;

namespace API.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TodoItem>()
                .HasOne(t => t.User)
                .WithMany(u => u.TodoItems)
                .HasForeignKey(t => t.UserId);

            var entityType = typeof(BaseEntity);
            var entityTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => entityType.IsAssignableFrom(t) && t.IsClass && !t.IsAbstract);

            foreach (var type in entityTypes)
            {
                var modelBuilderType = modelBuilder.Entity(type);
                var createdAtProperty = type.GetProperty("CreatedAt");
                var updatedAtProperty = type.GetProperty("UpdatedAt");
                var deletedAtProperty = type.GetProperty("DeletedAt");

                if (createdAtProperty != null)
                {
                    modelBuilderType.Property(createdAtProperty.Name)
                        .HasColumnName("CreatedAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");
                }

                if (updatedAtProperty != null)
                {
                    modelBuilderType.Property(updatedAtProperty.Name)
                        .HasColumnName("UpdatedAt");
                }

                if (deletedAtProperty != null)
                {
                    modelBuilderType.Property(deletedAtProperty.Name)
                        .HasColumnName("DeletedAt");
                }
            }
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = entry.Entity.CreatedAt == default
                        ? DateTime.UtcNow
                        : entry.Entity.CreatedAt;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;

                    entry.Property(e => e.CreatedAt).IsModified = false;
                }
            }
        }
    }
}