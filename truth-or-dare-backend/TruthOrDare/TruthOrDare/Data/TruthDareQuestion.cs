using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TruthOrDare.Data
{
    public class TruthDareQuestion
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "NVARCHAR(MAX)")]
        public string Question { get; set; }
    }

    [Table("DareQuestion")]
    public class DareQuestion: TruthDareQuestion
    {
       
    }

    [Table("TruthQuestion")]
    public class TruthQuestion: TruthDareQuestion
    {

    }
}
