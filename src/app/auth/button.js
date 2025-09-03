// Componente reutilizable
export function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="awesome-btn"
    >
      {text}
    </button>
  );
}