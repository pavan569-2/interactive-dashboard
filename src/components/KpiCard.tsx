interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

export default function KpiCard({ title, value, subtitle }: KpiCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}
