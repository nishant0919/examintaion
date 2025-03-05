"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function StartMain() {
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const session = useSession();
  const router = useRouter();
  async function getUserData() {
    const res = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      router.push("/");
      return;
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!loading || hasFetched) return;

    setHasFetched(true); // Prevent duplicate calls
    getUserData();
  }, [loading]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!!data && data.success === false) {
    return (
      <div>
        <h1>{data.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

export default StartMain;
