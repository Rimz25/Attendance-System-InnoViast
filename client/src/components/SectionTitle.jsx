import PropTypes from "prop-types";

function SectionTitle({ title }) {
  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>

        <p className="text-gray-500 mt-2">
          {greeting}! Here's what's happening today.
        </p>
      </div>

      <div className="mt-5 md:mt-0 bg-white shadow rounded-xl px-5 py-3">
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
