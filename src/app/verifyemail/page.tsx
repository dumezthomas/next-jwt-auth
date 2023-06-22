"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TokenModel from "@/models/tokenModel";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const verifyEmail = async (token: string) => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Spinner />}

      {verified && (
        <h1 className="success">
          Congratulations , Your email has been verified <br />
          <Link href="/login">Click here to login</Link>
        </h1>
      )}

      {error !== "" && <h1 className="error">Something went wrong: {error}</h1>}
    </div>
  );
};

export default VerifyEmail;
