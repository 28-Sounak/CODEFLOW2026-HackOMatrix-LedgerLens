<UploadBox />
import ExpenseChart from "../charts/ExpenseChart";
import UploadBox from "../components/UploadBox";

function Dashboard() {

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Financial Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Income</h2>
          <p className="text-3xl font-bold text-green-500">
            ₹50,000
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Expenses</h2>
          <p className="text-3xl font-bold text-red-500">
            ₹32,000
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl">Savings</h2>
          <p className="text-3xl font-bold text-blue-500">
            ₹18,000
          </p>
        </div>

      </div>

      <ExpenseChart />

    </div>

  );
}

export default Dashboard;