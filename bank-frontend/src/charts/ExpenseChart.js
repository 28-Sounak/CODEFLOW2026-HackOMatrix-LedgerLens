import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

const data = [
  { name: "Food", value: 5000 },
  { name: "Travel", value: 3000 },
  { name: "Shopping", value: 7000 },
  { name: "Bills", value: 4000 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042"
];

function ExpenseChart() {

  return (

    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Expense Breakdown
      </h2>

      <PieChart width={400} height={400}>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >

          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>

    </div>

  );
}

export default ExpenseChart;