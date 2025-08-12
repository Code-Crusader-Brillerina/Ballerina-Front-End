import React from "react";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChartCard = ({
  title,
  value,
  percentage = "",
  subtitle,
  color = "blue",
  chart = null,
  navigateTo = "/patients-details",
  showMenu = true,   // NEW PROP to control 3-dot menu visibility
}) => {
  const navigate = useNavigate();
  const isPositive = percentage?.startsWith("+");
  const textColorClass = isPositive ? "text-green-500" : "text-red-500";

  const getChartSVG = (chartColor) => {
    const pathData = "M0,15 C20,5 40,15 60,10 C80,5 100,15";
    return (
      <svg
        className="w-full h-16 mt-4"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path d={pathData} stroke={chartColor} fill="none" strokeWidth="2" />
      </svg>
    );
  };

  const chartColor = isPositive ? "#10B981" : "#EF4444";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {value && <p className="text-3xl font-bold text-gray-900">{value}</p>}

          {percentage ? (
            <div className="flex items-center space-x-1 text-sm">
              <span className={`font-semibold ${textColorClass}`}>
                {percentage}
              </span>
              <FaChartLine className={`w-4 h-4 ${textColorClass}`} />
            </div>
          ) : null}

          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>

        {/* Conditionally render 3-dot menu button */}
        {showMenu && (
          <button
            aria-label="open details"
            onClick={() => navigate(navigateTo)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-400 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        )}
      </div>

      <div>
        {chart ? (
          <div className="mt-2">{chart}</div>
        ) : (
          getChartSVG(chartColor)
        )}
      </div>
    </div>
  );
};

export default ChartCard;
