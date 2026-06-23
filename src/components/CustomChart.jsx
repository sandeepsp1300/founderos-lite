
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6",
];

function CustomChart({
  title,
  type = "line",
  data = [],
  dataKey = "value",
  xKey = "name",
}) {

  const renderChart = () => {

    switch (type) {

      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={xKey} />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey={dataKey}
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        );

      case "pie":
        return (
          <PieChart>

            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xKey}
              outerRadius={120}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        );

      default:
        return (
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={xKey} />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>
        );
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        height: "420px",
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        {renderChart()}
      </ResponsiveContainer>

    </div>
  );
}

export default CustomChart;

