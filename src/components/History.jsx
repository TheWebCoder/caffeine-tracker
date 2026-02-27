import { useAuth } from "../context/AuthContext";
import {
    calculateCurrentCaffeineLevel,
    getCaffeineAmount,
    timeSinceConsumption,
} from "../utils";

export default function History() {
    const { globalData } = useAuth();
    const entries = Object.keys(globalData || {}).sort((a, b) => Number(b) - Number(a));

    return (
        <section className="space-y-6 animate-in opacity-0">
            <div className="section-heading">
                <span className="section-heading-icon">
                    <i className="fa-solid fa-timeline" aria-hidden />
                </span>
                <h2 className="font-display text-xl font-bold">History</h2>
            </div>
            <p className="text-sm text-stone-500">
                Hover a mug to see details.
            </p>
            <div className="flex flex-wrap gap-2">
                {entries.map((utcTime, index) => {
                    const coffee = globalData[utcTime];
                    const timeSinceConsume = timeSinceConsumption(utcTime);
                    const originalAmount = getCaffeineAmount(coffee.name);
                    const remainingAmount = calculateCurrentCaffeineLevel({ [utcTime]: coffee });
                    const summary = `${coffee.name} · ${timeSinceConsume} · $${coffee.cost} · ${remainingAmount} / ${originalAmount} mg`;

                    return (
                        <div
                            key={index}
                            title={summary}
                            className="group flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] text-amber-400/90 hover:border-amber-500/40 hover:bg-amber-500/10 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200 cursor-default"
                        >
                            <i className="fa-solid fa-mug-hot text-2xl transition-transform duration-200 group-hover:scale-110" aria-hidden />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
