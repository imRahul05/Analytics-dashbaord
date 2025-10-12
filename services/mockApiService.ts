
// Mock data service
const ARTIFICIAL_LATENCY = 400; // ms
const ERROR_RATE = 0.1; // 10%

const mockFetch = <T,>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < ERROR_RATE) {
        reject(new Error('A random API error occurred!'));
      } else {
        resolve(data);
      }
    }, ARTIFICIAL_LATENCY + Math.random() * 200);
  });
};

// --- MOCK DATA GENERATORS ---

const generateRevenueData = () => {
  const data = [];
  let value = 5000;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value += (Math.random() - 0.5) * 500;
    value = Math.max(value, 3000);
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(value),
    });
  }
  return data;
};

const generateUsersData = () => {
  const firstNames = ['John', 'Jane', 'Peter', 'Susan', 'Michael', 'Emily'];
  const lastNames = ['Smith', 'Doe', 'Jones', 'Williams', 'Brown', 'Davis'];
  const domains = ['example.com', 'test.org', 'mail.net'];
  const statuses = ['Active', 'Pending', 'Inactive'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      signupDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
  });
};

const generateKpiData = () => {
    return {
        newUsers: {
            value: 1250,
            change: 12.5
        },
        totalRevenue: {
            value: 84530,
            change: -2.1
        },
        conversionRate: {
            value: 2.3,
            change: 0.5
        }
    };
}


// --- API FUNCTIONS ---

export const getRevenueData = () => mockFetch(generateRevenueData());
export const getUsersData = () => mockFetch(generateUsersData());
export const getKpiData = () => mockFetch(generateKpiData());

export type RevenueData = Awaited<ReturnType<typeof getRevenueData>>;
export type UsersData = Awaited<ReturnType<typeof getUsersData>>;
export type KpiData = Awaited<ReturnType<typeof getKpiData>>;
