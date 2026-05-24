import UploadBox from "../components/UploadBox";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center">
        AI Bank Statement Analyzer
      </h1>

      <p className="text-center mt-4 text-gray-600">
        Upload your statement and get AI-powered financial insights
      </p>

      <UploadBox />

    </div>
  );
}

export default Home;