export default function Hero() {
    return (
        <section className="space-y-8 animate-in opacity-0">
            <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
                    Coffee tracking for coffee{" "}
                    <abbr title="An enthusiast" className="no-underline cursor-help text-amber-400/90 border-b border-amber-400/30 border-dotted">
                        aficionados
                    </abbr>
                </h2>
                <p className="text-stone-400 text-lg max-w-lg">
                    Log every cup. See your caffeine curve. Own your ritual.
                </p>
            </div>

            <div className="flex flex-col gap-3 animate-in opacity-0 animate-in-delay-1">
                <p className="text-stone-300 font-medium">
                    Start with <span className="text-gradient font-semibold">CaffeineTrackr</span> and you’ll be …
                </p>
                <ul className="grid sm:grid-cols-1 gap-2">
                    {[
                        "Tracking every coffee in one place",
                        "Seeing your active caffeine level in real time",
                        "Measuring cost and habits over time",
                    ].map((line, i) => (
                        <li
                            key={i}
                            className="flex items-center gap-3 text-stone-400 py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 hover:bg-amber-500/5 transition-colors"
                        >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                                {i + 1}
                            </span>
                            {line}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="glass-card p-6 animate-in opacity-0 animate-in-delay-2">
                <div className="flex items-center gap-3 mb-4">
                    <span className="section-heading-icon">
                        <i className="fa-solid fa-circle-info" aria-hidden />
                    </span>
                    <h3 className="font-display font-semibold text-stone-100 text-lg">Did you know?</h3>
                </div>
                <p className="font-medium text-amber-200/90 mb-2">
                    Caffeine’s half-life is about 5 hours.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                    So half the caffeine from each cup is still in your system five hours later—keeping you alert longer. Drink 200 mg now, and in 5 hours you’ll still have ~100 mg on board.
                </p>
            </div>
        </section>
    );
}
