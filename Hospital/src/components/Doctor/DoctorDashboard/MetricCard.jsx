import React from "react";

const colorMap = {
  green: { bg: "bg-green-100", text: "text-green-500" },
  red: { bg: "bg-red-100", text: "text-red-500" },
  blue: { bg: "bg-blue-100", text: "text-blue-500" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-500" },
  purple: { bg: "bg-purple-100", text: "text-purple-500" },
  gray: { bg: "bg-gray-100", text: "text-gray-500" },
};

const MetricCard = ({
  icon: Icon,
  title,
  value,
  percentage = "",
  color = "gray",
  onClick,
}) => {
  const safePercentage = percentage || "";
  const isPositive = safePercentage?.startsWith?.("+");
  const textColorClass = isPositive ? "text-green-500" : "text-red-500";
  const colorClasses = colorMap[color] || colorMap.gray;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition`}
    >
      <div className="flex items-center">
        {Icon && (
          <div className={`p-3 rounded-full mr-4 ${colorClasses.bg}`}>
            <Icon className={`text-xl ${colorClasses.text}`} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>

      <div className="text-right">
        {safePercentage ? (
          <p className={`font-semibold text-sm ${textColorClass}`}>
            {safePercentage}
          </p>
        ) : (
          <p className="text-sm text-gray-400"></p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
