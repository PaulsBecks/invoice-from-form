import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useInvoiceStats, useArticleStats } from "../../hooks";
import "./Stats.css";

import {
  primaryColor,
  monochromaticColors as colors,
  monthNames,
} from "../../constants";

export default function Stats() {
  const invoiceStats = useInvoiceStats();
  const monthSeries = useMemo(
    () =>
      invoiceStats.map((m, i) => ({
        name: monthNames[i],
        "Gesamt Umsatz": m.reduce((total, i) => total + i.totalPrice, 0),
      })),
    [invoiceStats]
  );

  const articleStats = useArticleStats();
  const articleTurnoverSeries = useMemo(
    () =>
      Object.values(articleStats).map((m) => ({
        name: m.name.slice(0, 10) + "...",
        "Gesamt Umsatz": m.totalTurnover,
      })),
    [articleStats]
  );

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "45%", padding: "2em" }}>
          <h2 className="billeroo-stats-container-title">Monatsumsätze</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Gesamt Umsatz"
                stroke={primaryColor}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {articleTurnoverSeries.length > 0 && (
          <div style={{ width: "45%", padding: "2em" }}>
            <h2 className="billeroo-stats-container-title">
              Artikelumsätze - Anteilig
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={articleTurnoverSeries}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="Gesamt Umsatz"
                  label
                >
                  {articleTurnoverSeries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {articleTurnoverSeries.length > 0 && (
        <div>
          <h2 className="billeroo-stats-container-title">Artikelumsätze</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={articleTurnoverSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Gesamt Umsatz" fill={primaryColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
