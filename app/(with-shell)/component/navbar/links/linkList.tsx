type LinkListType = {
  label: string;
  link?: string;
  children?: LinkListType[];
};

//DASHBOARD EXCLUDED
const LinkList: LinkListType[] = [
  {
    label: "Employee",
    link: "/employee",
  },
  {
    label: "Applicant",
    link: "/applicant",
  },
];

export { LinkList, type LinkListType };
