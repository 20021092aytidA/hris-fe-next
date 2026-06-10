import { Request } from "@/app/interface";
import Link from "next/link";
import React, { Suspense } from "react";

async function RequestOverviewTable({
  cookie,
}: {
  cookie: string | undefined;
}): Promise<React.ReactNode> {
  const getRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/hris-api/v1/request", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      if (res.ok) {
        const listJSON: any = await res.json();
        return listJSON.data;
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  };

  const listReq = await getRequests();

  return (
    <>
      {listReq?.map((request: Request) => (
        <tr key={request.id}>
          <th>{request.id}</th>
          <td>{request.title}</td>
          <td>{request.user.username}</td>
          <td>{request.status}</td>
        </tr>
      ))}
    </>
  );
}

export default function RequestOverview({
  cookie,
}: {
  cookie: string | undefined;
}) {
  return (
    <>
      <Link
        className="inline-block underline font-semibold text-md text-white"
        href="/applicant"
      >
        Request
      </Link>
      <div className="bg-white rounded-sm p-2">
        <div className="overflow-x-auto h-60">
          <table className="table table-xs">
            <thead>
              <tr className="text-black text-xs">
                <th>ID</th>
                <th>Title</th>
                <th>Username</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <Suspense>
                <RequestOverviewTable cookie={cookie} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
