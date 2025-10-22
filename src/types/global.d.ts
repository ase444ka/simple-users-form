type User = {
  id: number;
  name: string;
  password: string | null;
  type: "LDAP" | "local";
  tags: { text: string }[];
};
