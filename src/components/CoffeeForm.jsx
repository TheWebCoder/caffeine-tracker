import { coffeeOptions } from "../utils";
import { useState } from "react";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CoffeeForm(props) {
    const { isAuthenticated } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const { globalData, setGlobalData, globalUser } = useAuth();

    async function handleSubmitForm() {
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }
        if (!selectedCoffee) return;

        try {
            const newGlobalData = { ...(globalData || {}) };
            const nowTime = Date.now();
            const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
            const timestamp = nowTime - timeToSubtract;
            const newData = { name: selectedCoffee, cost: coffeeCost };
            newGlobalData[timestamp] = newData;
            setGlobalData(newGlobalData);

            const userRef = doc(db, "users", globalUser.uid);
            await setDoc(userRef, { [timestamp]: newData }, { merge: true });
            setSelectedCoffee(null);
            setHour(0);
            setMin(0);
            setCoffeeCost(0);
        } catch (err) {
            console.error(err.message);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    const inputBase = "input-field";
    const cardBase = "flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 ";
    const cardDefault = "border-white/10 bg-white/[0.03] hover:border-amber-500/30 hover:bg-amber-500/5";
    const cardSelected = "border-amber-500/60 bg-amber-500/10 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10";

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            <section className="space-y-6 animate-in opacity-0 animate-in-delay-2">
                <div className="section-heading">
                    <span className="section-heading-icon">
                        <i className="fa-solid fa-pencil" aria-hidden />
                    </span>
                    <h2 className="font-display text-xl font-bold">Start tracking today</h2>
                </div>

                <div>
                    <label className="block text-stone-400 font-medium text-sm mb-2">Coffee type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {coffeeOptions.slice(0, 5).map((option, optionIndex) => (
                            <button
                                key={optionIndex}
                                type="button"
                                onClick={() => {
                                    setSelectedCoffee(option.name);
                                    setShowCoffeeTypes(false);
                                }}
                                className={`${cardBase} ${option.name === selectedCoffee ? cardSelected : cardDefault}`}
                            >
                                <span className="font-semibold text-stone-100 text-sm text-center leading-tight">
                                    {option.name}
                                </span>
                                <span className="text-xs text-amber-400/80">{option.caffeine} mg</span>
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                setShowCoffeeTypes(true);
                                setSelectedCoffee(null);
                            }}
                            className={`${cardBase} ${showCoffeeTypes ? cardSelected : cardDefault}`}
                        >
                            <span className="font-semibold text-stone-100 text-sm">Other</span>
                            <span className="text-xs text-stone-500">n/a</span>
                        </button>
                    </div>
                </div>

                {showCoffeeTypes && (
                    <div className="animate-in opacity-0">
                        <select
                            onChange={(e) => setSelectedCoffee(e.target.value)}
                            name="coffee-list"
                            id="coffee-list"
                            className={`${inputBase} max-w-md`}
                        >
                            <option value="">Select type</option>
                            {coffeeOptions.map((option, optionIndex) => (
                                <option key={optionIndex} value={option.name}>
                                    {option.name} ({option.caffeine} mg)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-stone-400 font-medium text-sm mb-2">Cost ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={coffeeCost}
                        onChange={(e) => setCoffeeCost(e.target.value)}
                        placeholder="4.50"
                        className={`${inputBase} max-w-[10rem]`}
                    />
                </div>

                <div>
                    <label className="block text-stone-400 font-medium text-sm mb-2">Time since consumption</label>
                    <div className="grid grid-cols-2 gap-3 max-w-[14rem]">
                        <div>
                            <label htmlFor="hours-select" className="sr-only">Hours</label>
                            <select
                                id="hours-select"
                                value={hour}
                                onChange={(e) => setHour(Number(e.target.value))}
                                className={inputBase}
                            >
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i}>{i}h</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="mins-select" className="sr-only">Minutes</label>
                            <select
                                id="mins-select"
                                value={min}
                                onChange={(e) => setMin(Number(e.target.value))}
                                className={inputBase}
                            >
                                {[0, 1, 2, 3, 4, 5, 10, 15, 30, 45].map((m) => (
                                    <option key={m} value={m}>{m}m</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmitForm}
                    className="btn-primary"
                >
                    <i className="fa-solid fa-plus" aria-hidden />
                    Add entry
                </button>
            </section>
        </>
    );
}
