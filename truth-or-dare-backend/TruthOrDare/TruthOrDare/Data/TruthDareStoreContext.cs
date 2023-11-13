using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TruthOrDare.Data;

namespace TruthOrDare.Data
{
    public class TruthDareStoreContext : IdentityDbContext<IdentityUser>
    {
        public TruthDareStoreContext(DbContextOptions<TruthDareStoreContext> opt): base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
        }

        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
                (
                    new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                    new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" }
                );
        }

        #region DbSet
        public DbSet<TruthQuestion>? TruthQuestion { get; set; }     
        public DbSet<DareQuestion>? DareQuestion { get; set; }
        #endregion
    }
}
