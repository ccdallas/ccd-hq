export const databaseTables = {
  users: {
    id: "uuid",
    name: "text",
    email: "text",
    role: "text"
  },
  missions: {
    id: "uuid",
    user_id: "uuid",
    title: "text",
    status: "text",
    priority: "text"
  },
  contacts: {
    id: "uuid",
    user_id: "uuid",
    name: "text",
    organization: "text",
    relationship: "text"
  },
  knowledge: {
    id: "uuid",
    user_id: "uuid",
    title: "text",
    category: "text"
  }
};
