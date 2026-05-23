import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28",
  "#FF8042", "#A855F7", "#EF4444",
  "#10B981", "#F59E0B"
];

function ExpenseChart({ categoryTotals }) {

  // Convert { Food: 5000, Travel: 3000 } → [{ name, value }]
  const data = Object.entries(categoryTotals || {}).map(([name, value]) => ({
    name,
    value: Math.round(value),
  }));

  // Nothing to show yet
  if (data.length === 0) return null;

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Expense Breakdown</h2>

      <PieChart width={500} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={140}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) =>
            `₹${value.toLocaleString("en-IN")}`
          }
        />

        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;