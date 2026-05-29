import { Request } from "@/app/interface";
import { cookies } from "next/headers";
import ViewReqBtn from "./component/viewReqBtn";
import DeleteReqBtn from "./component/deleteReqBtn";
import AddReqBtn from "./component/addReqBtn";
import ApproveOrRejectReqBtn from "./component/approveOrRejectReqBtn";

export default async function RequestPage() {
  const cookieStorage = await cookies();
  const userCookie = cookieStorage.get("jwt");

  let listRequest: Request[] = [];

  const getRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/hris-api/v1/request", {
        headers: {
          Authorization: `Bearer ${userCookie?.value}`,
        },
      });
      if (res.ok) {
        const listJSON: any = await res.json();
        listRequest = listJSON.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  await getRequests();

  return (
    <div className="rounded-sm p-2 bg-red-700">
      <div className="flex justify-between mb-2">
        <AddReqBtn cookie={userCookie?.value} />
        <label className="input bg-transparent text-white border-white">
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="overflow-x-auto bg-white rounded-sm shadow-md">
        <table className="table table-md p-2">
          <thead>
            <tr className="text-red-700">
              <th>ID</th>
              <th>Title</th>
              <th>Username</th>
              <th>Status</th>
              <th className="text-center">Action</th>
              <th className="text-center">Approve / Reject</th>
            </tr>
          </thead>
          <tbody>
            {listRequest?.map((request: Request) => {
              return (
                <tr key={request.id}>
                  <th>{request.id}</th>
                  <td>{request.title}</td>
                  <td>{request.user.username}</td>
                  <td>{request.status}</td>
                  <td className="space-x-2 text-center">
                    <ViewReqBtn id={request.id} cookie={userCookie?.value} />
                    <DeleteReqBtn id={request.id} cookie={userCookie?.value} />
                  </td>
                  <td className="space-x-2 text-center">
                    <ApproveOrRejectReqBtn
                      id={request.id}
                      cookie={userCookie?.value}
                      isApproving={true}
                    />
                    <ApproveOrRejectReqBtn
                      id={request.id}
                      cookie={userCookie?.value}
                      isApproving={false}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
