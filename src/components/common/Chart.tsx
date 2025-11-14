import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartProps {
  title: string;
  type?: 'line' | 'bar' | 'column' | 'pie' | 'area';
  data: number[] | Array<{ name: string; y: number }>;
  categories?: string[];
  height?: number;
  color?: string;
}

export const Chart = ({
  title,
  type = 'line',
  data,
  categories,
  height = 300,
  color = '#1A73EB',
}: ChartProps) => {
  const options = useMemo<Highcharts.Options>(() => {
    const isPieChart = type === 'pie';
    const chartData = isPieChart
      ? (data as Array<{ name: string; y: number }>)
      : (data as number[]);

    return {
      chart: {
        type: isPieChart ? 'pie' : type,
        height,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#03318C',
        },
      },
      colors: [color],
      xAxis: isPieChart
        ? undefined
        : {
            categories: categories || [],
            title: {
              text: 'Date',
            },
          },
      yAxis: isPieChart
        ? undefined
        : {
            allowDecimals: true,
            min: 0,
            title: {
              text: 'Value',
            },
          },
      tooltip: {
        pointFormat: isPieChart
          ? '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
          : '<b>{point.category}</b><br/><b>Value:</b> {point.y}',
      },
      plotOptions: {
        line: {
          marker: {
            enabled: true,
            radius: 4,
          },
          lineWidth: 2,
        },
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
        column: {
          dataLabels: {
            enabled: true,
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: isPieChart
        ? [
            {
              name: title,
              type: 'pie',
              data: chartData,
            },
          ]
        : [
            {
              name: title,
              type: type as 'line' | 'bar' | 'column' | 'area',
              data: chartData,
            },
          ],
    };
  }, [title, type, data, categories, height, color]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

