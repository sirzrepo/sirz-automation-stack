import { ReactNode } from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  interface ChartData {
  [key: string]: string | number;
}

interface UniversalChartProps {
  type?: 'bar' | 'line' | 'area' | 'pie';
  data: ChartData[];
  dataKeyX: string;
  dataKeyY: string;
  height?: number;
  children?: ReactNode;
}

export default function UniversalChart({ 
  type = 'bar', 
  data, 
  dataKeyX, 
  dataKeyY, 
  height = 300 
}: UniversalChartProps) {
    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <XAxis dataKey={dataKeyX} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={dataKeyY} stroke={COLORS[1]} strokeWidth={3} />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={data}>
                        <XAxis dataKey={dataKeyX} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey={dataKeyY} stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.3} />
                    </AreaChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKeyY}
                            nameKey={dataKeyX}
                            outerRadius={200}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                );
            case 'bar':
            default:
                return (
                    <BarChart data={data}>
                        <XAxis dataKey={dataKeyX} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKeyY} fill={COLORS[0]} radius={6}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Bar>
                    </BarChart>
                );
        }
    };

    return (
        <div className="w-full h-[${height}px]">
            <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
}
  