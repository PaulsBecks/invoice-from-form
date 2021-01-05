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
import { useStats } from "../../hooks";
import "./Stats.css";

import {
  primaryColor,
  secondaryColor,
  monochromaticColors as colors,
  monthNames,
  monthNamesLong,
} from "../../constants";
import CountUp from "react-countup";
import { Table } from "semantic-ui-react";

export default function Stats() {
  const [{ invoiceStats, articleStats }] = useStats();
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

  const articleTurnoverSeries = useMemo(
    () =>
      Object.values(articleStats).map((m) => ({
        name: m.name ? m.name.slice(0, 20) + "..." : "",
        Verkauft: m.totalSold,
      })),
    [articleStats]
  );

  const articleTurnoverSeriesTotalTurnover = useMemo(
    () => articleTurnoverSeries.reduce(
      (total, at) => total + at.Verkauft
      , 0
    ),
    [articleTurnoverSeries]
  );

  const articleTurnoverSeriesFiltered = useMemo(
    () => articleTurnoverSeries.reduce(
      (total, at) => {
        if (at.Verkauft < articleTurnoverSeriesTotalTurnover * 0.05) {
          total[0]["Verkauft"] = total[0].Verkauft + at.Verkauft;
          return total;
        }
        else {
          return total.concat(at);
        }
      },
      [{ name: "Sonstige Artikel", Verkauft: 0 }]
    ),
    [articleTurnoverSeries]
  )

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
            Stückzahl Verkauft - Anteilig
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={articleTurnoverSeriesFiltered}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="Verkauft"
                label
              >
                {articleTurnoverSeriesFiltered.map((entry, index) => (
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
      <div className="billeroo-stats-article-table">
        <h2 className="billeroo-stats-container-title">Artikelübersich</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Artikelname</Table.HeaderCell>
              <Table.HeaderCell>Stückzahl verkauft</Table.HeaderCell>
              <Table.HeaderCell>Stückzahl versendet</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.values(articleStats).map((article) => {
              return (
                <Table.Row key={article._id}>
                  <Table.Cell>{article.name}</Table.Cell>
                  <Table.Cell>{article.totalSold}</Table.Cell>
                  <Table.Cell>{article.totalSend}</Table.Cell>
                </Table.Row>
              )
            })
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
