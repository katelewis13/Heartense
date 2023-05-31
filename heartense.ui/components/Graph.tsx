import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Graph() {
  
  return (
    <div className="bg-zinc-900 pr-14 p-10 rounded-md">
      <LineChart 
        width={1200} 
        height={750} 
        data={data} 
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="Bryce" stroke="#39da8a" name="Bryce"/>
        <Line type="monotone" dataKey="Kate" stroke="#ff5c5c" name="Kate"/>
        <Line type="monotone" dataKey="Aidyn" stroke="#5b8dee" name="Aidyn"/>
        <Line type="monotone" dataKey="Yagumi" stroke="#fdac41" name="Yagumi"/>
        <Line type="monotone" dataKey="Varad" stroke="#73e0e6" name="Varad"/>

        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis 
          dataKey="recorded_on" 
          type="category"
          tickFormatter={formatXAxis}
          stroke="white"
          />
        <YAxis type="number" domain={['dataMin', 'dataMax']} padding={{ top: 50, bottom: 50 }} stroke="white"/>
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
      </LineChart>
    </div>
  );
}

const formatXAxis = (tickItem: number) => { 
  const date = new Date(tickItem);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString("en-AU", options); 
}

const data = [
  {
      "recorded_on": "2023-05-31T12:30:00",
      "Bryce": 79.1,
      "Kate": 96.1,
      "Aidyn": 96.6,
      "Yagumi": 92.2,
      "Varad": 70.0
  },
  {
      "recorded_on": "2023-05-31T12:30:30",
      "Bryce": 71.8,
      "Kate": 92.3,
      "Aidyn": 90.7,
      "Yagumi": 85.7,
      "Varad": 74.5
  },
  {
      "recorded_on": "2023-05-31T12:31:00",
      "Bryce": 72.7,
      "Kate": 91.8,
      "Aidyn": 97.3,
      "Yagumi": 91.2,
      "Varad": 67.8
  },
  {
      "recorded_on": "2023-05-31T12:31:30",
      "Bryce": 68.7,
      "Kate": 94.5,
      "Aidyn": 91.4,
      "Yagumi": 92.4,
      "Varad": 73.5
  },
  {
      "recorded_on": "2023-05-31T12:32:00",
      "Bryce": 65.5,
      "Kate": 93.4,
      "Aidyn": 98.6,
      "Yagumi": 97.0,
      "Varad": 70.2
  },
  {
      "recorded_on": "2023-05-31T12:32:30",
      "Bryce": 69.2,
      "Kate": 88.5,
      "Aidyn": 98.0,
      "Yagumi": 100,
      "Varad": 65.8
  },
  {
      "recorded_on": "2023-05-31T12:33:00",
      "Bryce": 70.4,
      "Kate": 93.3,
      "Aidyn": 100,
      "Yagumi": 100,
      "Varad": 60.4
  },
  {
      "recorded_on": "2023-05-31T12:33:30",
      "Bryce": 75.5,
      "Kate": 84.5,
      "Aidyn": 93.8,
      "Yagumi": 99.9,
      "Varad": 64.8
  },
  {
      "recorded_on": "2023-05-31T12:34:00",
      "Bryce": 78.7,
      "Kate": 92.6,
      "Aidyn": 99.0,
      "Yagumi": 100,
      "Varad": 70.9
  },
  {
      "recorded_on": "2023-05-31T12:34:30",
      "Bryce": 81.1,
      "Kate": 94.1,
      "Aidyn": 98.8,
      "Yagumi": 94.6,
      "Varad": 73.1
  }
]