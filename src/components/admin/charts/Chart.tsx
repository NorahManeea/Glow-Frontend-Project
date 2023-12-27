import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Chart() {
  const data = [
    { name: 'Jan', Total: 1200 },
    { name: 'Feb', Total: 2100 },
    { name: 'Mar', Total: 800 },
    { name: 'Apr', Total: 1600 },
    { name: 'May', Total: 900 },
    { name: 'Jun', Total: 1700 },
    { name: 'Jul', Total: 1000 },
    { name: 'Aug', Total: 900 },
    { name: 'Sep', Total: 700 },
    { name: 'Oct', Total: 400 },
    { name: 'Nov', Total: 1000 },
    { name: 'Dec', Total: 2000 },
  ];

  return (
    <div className="flex-4 p-10 shadow-md bg-white">
      <ResponsiveContainer width="100%" aspect={2.5 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FCD1CE" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FCD1CE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#FCD1CE"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

