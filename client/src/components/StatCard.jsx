function StatCard({ title, value, icon, color }) {
  return (
    <div className={`rounded-2xl p-6 shadow-lg text-white ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg opacity-90">{title}</p>

          <h2 className="text-4xl font-bold mt-3">{value}</h2>
        </div>

        <div className="text-5xl">{icon}</div>
      </div>
    </div>
  );
}

export default StatCard;
