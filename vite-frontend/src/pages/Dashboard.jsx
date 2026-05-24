import { useState } from "react";
import ExpenseChart from "../charts/ExpenseChart.jsx";
import UploadBox from "../components/UploadBox.jsx";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
<<<<<<< HEAD
  const [health, setHealth] = useState(null);
  const [summary, setSummary] = useState("");

=======

  // Parse amount string like "1,234.56" → number
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
  const parseAmount = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, "")) || 0;
  };

<<<<<<< HEAD
  const income = health?.income || 0;
  const expenses = health?.expenses || 0;
  const savings = health?.savings || 0;

=======
  // Calculate totals from real transactions
  const income = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const savings = income - expenses;

  // Group expenses by category for the chart
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
  const categoryTotals = transactions
    .filter((t) => t.category !== "Income")
    .reduce((acc, t) => {
      const cat = t.category || "Others";
      acc[cat] = (acc[cat] || 0) + parseAmount(t.amount);
      return acc;
    }, {});

<<<<<<< HEAD
  const handleUploadSuccess = (data) => {
    setTransactions(data.transactions || []);
    setHealth(data.health || null);
    setSummary(data.summary || "");
  };

  const healthColor = {
    Excellent: "text-green-500",
    Good: "text-blue-500",
    Fair: "text-yellow-500",
    Poor: "text-red-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-10">💰 BankAnalyzer Dashboard</h1>

      {/* Upload Box */}
      <UploadBox onUploadSuccess={handleUploadSuccess} />

      {transactions.length > 0 && (
        <>
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

          {/* Health Score */}
          {health && (
            <div className="bg-white p-8 rounded-2xl shadow-lg mt-10">
              <h2 className="text-2xl font-bold mb-4">
                🏥 Financial Health Score
              </h2>
              <div className="flex items-center gap-6">
                <div className="text-6xl font-bold text-purple-500">
                  {health.score}%
                </div>
                <div>
                  <p className={`text-2xl font-semibold ${healthColor[health.label] || "text-gray-500"}`}>
                    {health.label}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Savings rate based on your income
                  </p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-purple-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(health.score, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* AI Summary */}
          {summary && (
            <div className="bg-white p-8 rounded-2xl shadow-lg mt-10">
              <h2 className="text-2xl font-bold mb-4">
                🤖 AI Financial Summary
              </h2>
              <div className="bg-purple-50 p-6 rounded-xl text-gray-700 whitespace-pre-line leading-relaxed">
                {summary}
              </div>
            </div>
          )}

          {/* Expense Chart */}
=======
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
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
          <ExpenseChart categoryTotals={categoryTotals} />

          {/* Transaction Table */}
          <div className="bg-white rounded-2xl shadow-lg mt-10 p-6 overflow-x-auto">
<<<<<<< HEAD
            <h2 className="text-2xl font-semibold mb-4">
              📋 Transactions
              <span className="text-sm font-normal text-gray-400 ml-3">
                {transactions.length} total
              </span>
            </h2>
=======
            <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Description</th>
                  <th className="p-3 border-b">Amount</th>
<<<<<<< HEAD
                  <th className="p-3 border-b">Type</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Flags</th>
=======
                  <th className="p-3 border-b">Balance</th>
                  <th className="p-3 border-b">Category</th>
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border-b text-sm">{t.date}</td>
                    <td className="p-3 border-b text-sm">{t.description}</td>
<<<<<<< HEAD
                    <td className={`p-3 border-b text-sm font-medium ${
                      t.type === "Credit" ? "text-green-500" : "text-red-500"
                    }`}>
                      ₹{parseAmount(t.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 border-b text-sm">{t.type}</td>
=======
                    <td className="p-3 border-b text-sm font-medium text-red-500">
                      ₹{parseAmount(t.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 border-b text-sm">₹{t.balance}</td>
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
                    <td className="p-3 border-b">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {t.category}
                      </span>
                    </td>
<<<<<<< HEAD
                    <td className="p-3 border-b text-sm">
                      {t.recurring && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full mr-1">
                          🔁 Recurring
                        </span>
                      )}
                      {t.unusual && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                          🚨 Unusual
                        </span>
                      )}
                    </td>
=======
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
<<<<<<< HEAD
      )}

      {transactions.length === 0 && (
        <p className="text-center text-gray-400 mt-16 text-lg">
          Upload a bank statement PDF or CSV to see your analysis.
=======
      ) : (
        <p className="text-center text-gray-400 mt-16 text-lg">
          Upload a bank statement PDF to see your financial summary.
>>>>>>> d43bd4741c5f562cd3d99515d8030f701b274f23
        </p>
      )}
    </div>
  );
}

export default Dashboard;