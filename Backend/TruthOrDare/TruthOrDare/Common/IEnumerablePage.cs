namespace TruthOrDare.Common
{
    public interface IEnumerablePage<T>
    {
        IEnumerable<T> PageData { get; }
        int TotalCount { get; }
    }

    public class EnumerablePage<T> : IEnumerablePage<T>
    {
        public IEnumerable<T> PageData { get; set;} 
        public int TotalCount { get; set; }
    }
}
