import { useAuth } from "../context/AuthContext";
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from "../utils";

function StatCard(props) {
    const { lg, title, children } = props;
    return (
        <div
            className={`glass-card p-5 flex flex-col gap-4 animate-in opacity-0 ${
                lg ? "sm:col-span-2" : ""
            }`}
        >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {title}
            </h4>
            {children}
        </div>
    );
}

export default function Stats() {
    const { globalData } = useAuth();
    const stats = calculateCoffeeStats(globalData);
    const caffeineLevel = calculateCurrentCaffeineLevel(globalData);
    const warningLevel =
        caffeineLevel < statusLevels.low.maxLevel
            ? "low"
            : caffeineLevel < statusLevels.moderate.maxLevel
              ? "moderate"
              : "high";
    const levelStyle = statusLevels[warningLevel];

    return (
        <section className="space-y-6 animate-in opacity-0">
            <div className="section-heading">
                <span className="section-heading-icon">
                    <i className="fa-solid fa-chart-simple" aria-hidden />
                </span>
                <h2 className="font-display text-xl font-bold">Stats</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard lg title="Active caffeine level">
                    <div className="flex flex-wrap items-center gap-4">
                        <p className="flex items-baseline gap-1.5">
                            <span className="font-display text-4xl font-bold tabular-nums text-stone-100">
                                {caffeineLevel}
                            </span>
                            <span className="text-stone-500 text-lg">mg</span>
                        </p>
                        <span
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold capitalize"
                            style={{ color: levelStyle.color, background: levelStyle.background }}
                        >
                            {warningLevel}
                        </span>
                    </div>
                    <p className="text-sm text-stone-400 leading-relaxed">
                        {levelStyle.description}
                    </p>
                </StatCard>
                <StatCard title="Daily caffeine">
                    <p className="flex items-baseline gap-1.5">
                        <span className="font-display text-3xl font-bold tabular-nums text-stone-100">
                            {stats.daily_caffeine}
                        </span>
                        <span className="text-stone-500">mg</span>
                    </p>
                </StatCard>
                <StatCard title="Avg coffees / day">
                    <p className="font-display text-3xl font-bold tabular-nums text-stone-100">
                        {stats.average_coffees}
                    </p>
                </StatCard>
                <StatCard title="Daily cost">
                    <p className="flex items-baseline gap-0.5">
                        <span className="text-stone-500">$</span>
                        <span className="font-display text-3xl font-bold tabular-nums text-stone-100">
                            {stats.daily_cost}
                        </span>
                    </p>
                </StatCard>
                <StatCard title="Total cost">
                    <p className="flex items-baseline gap-0.5">
                        <span className="text-stone-500">$</span>
                        <span className="font-display text-3xl font-bold tabular-nums text-stone-100">
                            {stats.total_cost}
                        </span>
                    </p>
                </StatCard>
                <div className="sm:col-span-2 glass-card overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Top drinks
                        </h4>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left font-medium text-stone-400 px-4 py-3">
                                    Drink
                                </th>
                                <th className="text-left font-medium text-stone-400 px-4 py-3">
                                    Count
                                </th>
                                <th className="text-left font-medium text-stone-400 px-4 py-3">
                                    Share
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTopThreeCoffees(globalData).map((coffee, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium text-stone-200">
                                        {coffee.coffeeName}
                                    </td>
                                    <td className="px-4 py-3 text-stone-400">
                                        {coffee.count}
                                    </td>
                                    <td className="px-4 py-3 text-amber-400/90">
                                        {coffee.percentage}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
