import PropTypes from "prop-types";

function InfoCard({ title, value, icon, color }) {
  return (
    <div
      className={`${color} relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      {/* Background Circle */}
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"></div>

      {/* Small Decoration */}
      <div className="absolute bottom-0 right-0 h-16 w-16 rounded-full bg-white/5"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-white/80">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold">{value}</h2>
        </div>

        <div className="rounded-2xl bg-white/20 p-5 text-5xl backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default InfoCard;
