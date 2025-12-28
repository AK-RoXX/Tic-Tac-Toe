export default function Square({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-24 text-4xl font-bold rounded-lg transition-all duration-200 
        ${!value ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-700'} 
        ${highlight ? 'ring-4 ring-yellow-400' : ''}
        flex items-center justify-center`}
    >
      <span className={value === 'X' ? 'text-cyan-400' : 'text-pink-500'}>
        {value}
      </span>
    </button>
  );
}