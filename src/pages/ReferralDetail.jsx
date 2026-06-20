import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getReferralById } from "../services/api";

export default function ReferralDetail() {
  const { id } = useParams();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

const formatDate = (date) => {
  if (!date) return "-";
  return date.replaceAll("-", "/");
};

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null)
    return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await getReferralById(id);

        const referralData = response?.data?.referrals?.[0];

        if (!referralData) {
          setNotFound(true);
          return;
        }

        setReferral(referralData);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">Loading...</div>
      </Layout>
    );
  }

  if (notFound || !referral) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-4">Referral not found</h1>

          <Link to="/" className="text-blue-600">
            Back to dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <Link to="/" className="text-blue-600 mb-6 inline-block">
          ← Back to dashboard
        </Link>

        <h1 className="text-4xl font-bold mb-6">Referral Details</h1>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">{referral.name}</h2>

          <div className="space-y-4">
            <div>
              <span className="font-medium">Referral ID:</span> {referral.id}
            </div>

            <div>
              <span className="font-medium">Service Name:</span>{" "}
              {referral.serviceName}
            </div>

            <div>
              <span className="font-medium">Date:</span>{" "}
              {formatDate(referral.date)}
            </div>

            <div>
              <span className="font-medium">Profit:</span>{" "}
              {formatCurrency(referral.profit)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
