export interface User {
  avatar: string;
  email: string;
  id: string;
  name: string;
  role: string;
}

// Generate mock users
const generateMockUsers = (count: number): User[] => {
  const roles = ['Developer', 'Designer', 'Product Manager', 'Engineer', 'Analyst', 'Admin'];
  return Array.from({ length: count }, (_, index) => ({
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index + 1}`,
    email: `user${index + 1}@example.com`,
    id: `user-${index + 1}`,
    name: `User ${index + 1}`,
    role: roles[index % roles.length],
  }));
};

// Generate 100 mock users
const ALL_USERS = generateMockUsers(100);

export async function fetchAllUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ALL_USERS;
}

export async function fetchUsers(
  query?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ hasMore: boolean; total: number; users: User[] }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter users based on query
  const filteredUsers = query
    ? ALL_USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.role.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_USERS;

  const total = filteredUsers.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const users = filteredUsers.slice(start, end);
  const hasMore = end < filteredUsers.length;

  return { hasMore, total, users };
}
