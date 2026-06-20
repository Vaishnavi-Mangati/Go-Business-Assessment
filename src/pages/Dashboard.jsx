import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
  const ITEMS_PER_PAGE = 10;
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response = await getDashboardData();

        setDashboardData(response.data);
        setReferrals(response.data.referrals || []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (!dashboardData) return;

    const loadTable = async () => {
      try {
        setTableLoading(true);

        const response =
          await getDashboardData(
            search,
            sort
          );

        setReferrals(
          response.data.referrals || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setTableLoading(false);
      }
    };

    loadTable();
  }, [search, sort]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (date) => date.replaceAll("-", "/");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const totalPages = Math.ceil(referrals.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentRows = referrals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-6">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div role="alert" className="max-w-6xl mx-auto p-6 text-red-500">
          {error}
        </div>
      </Layout>
    );
  }

  const { metrics, serviceSummary, referral } = dashboardData;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Referral Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </div>

        {/* Overview */}

        <section className="mb-10" role="region" aria-label="Overview metrics">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{metric.label}</p>

                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Service Summary */}

        <section className="mb-10" aria-label="Service summary">
          <h2 className="text-2xl font-semibold mb-4">Service summary</h2>

          <div className="bg-white border rounded-2xl p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-500">Service</p>

                <p className="font-semibold">{serviceSummary.service}</p>
              </div>

              <div>
                <p className="text-gray-500">Your Referrals</p>

                <p className="font-semibold">{serviceSummary.yourReferrals}</p>
              </div>

              <div>
                <p className="text-gray-500">Active Referrals</p>

                <p className="font-semibold">
                  {serviceSummary.activeReferrals}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Total Ref. Earnings</p>

                <p className="font-semibold">
                  {serviceSummary.totalRefEarnings}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Section */}

        <section className="mb-10" aria-label="Share referral">
          <h2 className="text-2xl font-semibold mb-4">
            Refer friends and earn more
          </h2>

          <div className="bg-white border rounded-2xl p-6">
            <div className="mb-6">
              <label className="block mb-2 text-sm">Your Referral Link</label>

              <div className="flex gap-2">
                <input
                  readOnly
                  value={referral.link}
                  className="flex-1 border rounded px-3 py-2"
                />

                <button
                  onClick={() => copyText(referral.link)}
                  className="border px-4 rounded"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Your Referral Code</label>

              <div className="flex gap-2">
                <input
                  readOnly
                  value={referral.code}
                  className="flex-1 border rounded px-3 py-2"
                />

                <button
                  onClick={() => copyText(referral.code)}
                  className="border px-4 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* All Referrals */}

        <section>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <h2 className="text-2xl font-semibold">All referrals</h2>

            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                aria-label="Search referrals"
                placeholder="Name or service…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border rounded px-3 py-2"
              />

              <div>
                <label className="mr-2">Sort by date</label>

                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="border rounded px-3 py-2"
                >
                  <option value="desc">Newest first</option>

                  <option value="asc">Oldest first</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>

                  <th className="text-left p-4">Service</th>

                  <th className="text-left p-4">Date</th>

                  <th className="text-left p-4">Profit</th>
                </tr>
              </thead>

              <tbody>
                {tableLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center"
                    >
                      Loading referrals...
                    </td>
                  </tr>
                ) : currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      No matching entries
                    </td>
                  </tr>
                ) : (
                  currentRows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => navigate(`/referral/${row.id}`)}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="p-4">{row.name}</td>

                      <td className="p-4">{row.serviceName}</td>

                      <td className="p-4">{formatDate(row.date)}</td>

                      <td className="p-4">{formatCurrency(row.profit)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <p>
              Showing {referrals.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, referrals.length)} of{" "}
              {referrals.length} entries
            </p>

            <div className="flex gap-2 flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="border px-3 py-1 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`px-3 py-1 rounded border ${
                    page === index + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="border px-3 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
