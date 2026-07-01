function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-700 mb-6">{title}</h2>

      {children}
    </div>
  );
}

export default ChartCard;
