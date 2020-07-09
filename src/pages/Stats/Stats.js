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
  secondaryColor,
  monochromaticColors as colors,
  monthNames,
  monthNamesLong,
} from "../../constants";
import CountUp from "react-countup";

export default function Stats() {
  const invoiceStats = useInvoiceStats();
  const monthSeries = useMemo(
    () =>
      invoiceStats.map((m, i) => ({
        name: monthNames[i],
        Gesamtumsatz: m.reduce((total, i) => total + i.totalPrice, 0),
        "Gesamtumsatz Netto": m.reduce(
          (total, i) => total + i.totalPriceNet,
          0
        ),
      })),
    [invoiceStats]
  );

  const articleStats = useArticleStats();
  const articleTurnoverSeries = useMemo(
    () =>
      Object.values(articleStats).map((m) => ({
        name: m.name.slice(0, 10) + "...",
        Gesamtumsatz: m.totalTurnover,
      })),
    [articleStats]
  );

  const month = new Date().getMonth();

  const CustomTooltip = ({ active, payload }) => {
    if (!active) return null;
    return payload.map((bar) => {
      if (bar.value <= 0.01) {
        return null;
      }
      return (
        <div
          className="billeroo-stats-linechart-tooltip"
          style={{ color: bar.color }}
          key={bar.dataKey}
        >
          {bar.value.toFixed(2)} €
        </div>
      );
    });
  };
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Gesamtumsatz"
                stroke={primaryColor}
              />
              <Line
                type="monotone"
                dataKey="Gesamtumsatz Netto"
                stroke={secondaryColor}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
                dataKey="Gesamtumsatz"
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
      </div>
      <div className="billeroo-stats-numbers-container">
        <div className="billeroo-stats-numbers-container-section">
          <h3 className="billeroo-stats-container-title">
            Rechnungen im {monthNamesLong[month]}
          </h3>
          <span className="billeroo-stats-container-section-number">
            <CountUp end={invoiceStats[month].length} />
          </span>
        </div>
        <div className="billeroo-stats-numbers-container-section">
          <h3 className="billeroo-stats-container-title">Jahresumsatz</h3>
          <span className="billeroo-stats-container-section-number">
            <CountUp
              end={monthSeries.reduce((t, i) => {
                return i["Gesamtumsatz"] + t;
              }, 0)}
            />{" "}
            €
          </span>
        </div>
        <div className="billeroo-stats-numbers-container-section">
          <h3 className="billeroo-stats-container-title">Artikel Verkauft</h3>
          <span className="billeroo-stats-container-section-number">
            <CountUp
              end={Object.values(articleStats).reduce((t, article) => {
                return article.totalSold + t;
              }, 0)}
            />
          </span>
        </div>
      </div>
      <div>
        <h2 className="billeroo-stats-container-title">Artikelumsätze</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={articleTurnoverSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Gesamtumsatz" fill={primaryColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
