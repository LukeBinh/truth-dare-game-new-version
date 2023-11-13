namespace TruthOrDare.Models
{
    public class ResponseModel
    {
        public string? Status { get; set; }
        public string? Message { get; set; }
    }

    public class Duplicate
    {
        public string? Query { get; set; }
    }
}
