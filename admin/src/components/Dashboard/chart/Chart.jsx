import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const today = new Date();
const months = [];

for (let i = 5; i >= 0; i--) {
  const date = new Date(today.getFullYear(), today.getMonth() - i);
  const str = JSON.stringify(date);
  const res = str.substring(6, 8);
  months.push(res);
}

console.log(months);
const data = [
  {
    name: `Months:`,
    total: 0,
  },
  {
    name: `${months[0]}`,
    total: 1500,
  },
  {
    name: `${months[1]}`,
    total: 4500,
  },
  {
    name: `${months[2]}`,
    total: 100,
  },
  {
    name: `${months[3]}`,
    total: 900,
  },
  {
    name: `${months[4]}`,
    total: 1520,
  },
  {
    name: `${months[5]}`,
    total: 4800,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="title">Last 6 Months User Chart</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={"100%"}
          height={250}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
