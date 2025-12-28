export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 text-3xl font-bold rounded-lg bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
    >
      <span className={value === 'X' ? 'text-cyan-400' : 'text-pink-500'}>
        {value}
      </span>
    </button>
  );
}