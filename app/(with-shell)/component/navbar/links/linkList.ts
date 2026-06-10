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
    label: "Request",
    link: "/request",
  },
];

export { LinkList, type LinkListType };
