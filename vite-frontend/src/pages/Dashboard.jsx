import { useState } from "react";
import ExpenseChart from "../charts/ExpenseChart.jsx";
import UploadBox from "../components/UploadBox.jsx";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  // Parse amount string like "1,234.56" → number
  const parseAmount = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, "")) || 0;
  };

  // Calculate totals from real transactions
  const income = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const savings = income - expenses;

  // Group expenses by category for the chart
  const categoryTotals = transactions
    .filter((t) => t.category !== "Income")
    .reduce((acc, t) => {
      const cat = t.category || "Others";
      acc[cat] = (acc[cat] || 0) + parseAmount(t.amount);
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-10">Financial Dashboard</h1>

      {/* Upload Box */}
      <UploadBox onUploadSuccess={(data) => setTransactions(data)} />

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Income</h2>
          <p className="text-3xl font-bold text-green-500">
            ₹{income.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Expenses</h2>
          <p className="text-3xl font-bold text-red-500">
            ₹{expenses.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Savings</h2>
          <p className="text-3xl font-bold text-blue-500">
            ₹{savings.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Chart — only show after upload */}
      {transactions.length > 0 ? (
        <>
          <ExpenseChart categoryTotals={categoryTotals} />

          {/* Transaction Table */}
          <div className="bg-white rounded-2xl shadow-lg mt-10 p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Description</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">Balance</th>
                  <th className="p-3 border-b">Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border-b text-sm">{t.date}</td>
                    <td className="p-3 border-b text-sm">{t.description}</td>
                    <td className="p-3 border-b text-sm font-medium text-red-500">
                      ₹{parseAmount(t.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 border-b text-sm">₹{t.balance}</td>
                    <td className="p-3 border-b">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {t.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400 mt-16 text-lg">
          Upload a bank statement PDF to see your financial summary.
        </p>
      )}
    </div>
  );
}

export default Dashboard;