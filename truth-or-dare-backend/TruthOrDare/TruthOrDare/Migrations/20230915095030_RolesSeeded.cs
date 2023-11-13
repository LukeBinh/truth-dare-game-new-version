using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TruthOrDare.Migrations
{
    public partial class RolesSeeded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0a10325d-26f1-46ec-8c4e-9d1566b6b982", "1", "Admin", "Admin" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2a2bafd7-da77-4b0e-9576-b6eb1ad1e5b2", "2", "User", "User" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a10325d-26f1-46ec-8c4e-9d1566b6b982");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a2bafd7-da77-4b0e-9576-b6eb1ad1e5b2");
        }
    }
}
