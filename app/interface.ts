type Role = {
  id: number;
  roleName: string;
};

type Employee = {
  id: number;
  roleID: number;
  username: string;
  email: string;
  role: Role;
};

type EmployeePOST = {
  username: string;
  password: string;
  userID: number;
  roleID: number;
  email: string;
  fullName: string;
  jobPosition: string;
  salary: string;
  joinDate: string;
  address: string;
  dateOfBirth: string;
  leaveAmount?: number;
  note?: string;
};

type EmployeePUT = {
  username: string;
  userID: number;
  userDetailID: number;
  roleID: number;
  email: string;
  fullName: string;
  jobPosition: string;
  salary: string;
  joinDate: string;
  address: string;
  dateOfBirth: string;
  leaveAmount?: number;
  note?: string;
};

type EmployeeDetail = {
  id: number;
  userID: number;
  fullName: string;
  address: string;
  jobPosition: string;
  salary: string;
  dateOfBirth: string;
  joinDate: string;
  leaveAmount: number;
  note: string;
  user: Employee;
};

export type { Role, Employee, EmployeePOST, EmployeePUT, EmployeeDetail };
