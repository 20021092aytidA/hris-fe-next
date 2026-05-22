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

type EmployeeDetail = {
  id: number;
  userID: number;
  fullName: string;
  address: string;
  jobPosition: string;
  salary: string;
  dateOfBirth: string;
  joinDate: string;
  leaveAmount: string;
  note: string;
  user: Employee;
};

export type { Role, Employee, EmployeeDetail };
