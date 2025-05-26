import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";

const MotionUL = motion.ul;
const MotionLI = motion.li;

function App() {
  const [markets, setMarkets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    product: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get("/api/markets");
        const sortedMarkets = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMarkets(sortedMarkets);
      } catch (err) {
        console.error("Error loading markets:", err.message);
        setError("❌ Failed to load markets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.location.trim() || !form.product.trim()) {
      setError("⚠️ All fields are required.");
      return;
    }

    try {
      const response = await axios.post("/api/markets", {
        name: form.name.trim(),
        location: form.location.trim(),
        product: form.product.trim(),
      });
      setMarkets([response.data, ...markets]);
      setForm({ name: "", location: "", product: "" });
      setSuccess("✅ Market submitted successfully!");
    } catch (err) {
      console.error("Error submitting market:", err.message);
      setError("❌ Failed to submit market. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/markets/${id}`);
      setMarkets(markets.filter((market) => market._id !== id));
    } catch (err) {
      console.error("Error deleting market:", err.message);
      setError("❌ Failed to delete market.");
    }
  };

  const latestMarket = markets[0];

  let filteredMarkets = markets.filter(
    (market) =>
      market.name.toLowerCase().includes(search.toLowerCase()) ||
      market.location.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === "asc") {
    filteredMarkets.sort((a, b) =>
      a.location.localeCompare(b.location)
    );
  } else if (sortOrder === "desc") {
    filteredMarkets.sort((a, b) =>
      b.location.localeCompare(a.location)
    );
  }

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">Farm2Market</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-600 border-opacity-50"></div>
        </div>
      )}

      {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
      {success && <p className="text-green-600 font-semibold mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Market Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="product"
          value={form.product}
          onChange={handleChange}
          placeholder="Product"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-full"
        >
          Submit Market
        </button>
      </form>

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <div className="flex items-center gap-2">
          <label className="font-medium">Sort by location:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="default">Newest</option>
            <option value="asc">A–Z</option>
            <option value="desc">Z–A</option>
          </select>
        </div>
      </div>

      {latestMarket && (
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-4 rounded">
          <p className="font-semibold text-yellow-700 dark:text-yellow-300">📌 Latest Submission:</p>
          <p>
            <strong>{latestMarket.name}</strong> – {latestMarket.location} ({latestMarket.product})<br />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Submitted: {new Date(latestMarket.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
      )}

      {filteredMarkets.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">No markets found.</p>
      ) : (
        <MotionUL
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMarkets.map((market) => (
            <MotionLI
              key={market._id || market.id}
              className="border p-4 rounded shadow-sm flex flex-col justify-between bg-white dark:bg-gray-800 dark:border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <strong>{market.name}</strong> – {market.location} ({market.product})
                <div className="text-sm text-gray-500 dark:text-gray-300">
                  Added: {new Date(market.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => handleDelete(market._id)}
                className="text-red-600 hover:underline text-sm mt-2 self-end"
              >
                Delete
              </button>
            </MotionLI>
          ))}
        </MotionUL>
      )}
    </div>
  );
}

export default App;
