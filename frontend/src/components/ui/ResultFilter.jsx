import { useState } from 'react';
import './ResultFilter.css';

/**
 * ResultFilter – Dropdowns to filter results by year and program.
 */
export default function ResultFilter({ onFilter, years = [], programs = [] }) {
    const [year, setYear] = useState('');
    const [program, setProgram] = useState('');

    const handleFilter = () => {
        if (onFilter) onFilter({ year, program });
    };

    return (
        <div className="result-filter">
            <div className="result-filter__group">
                <label className="result-filter__label" htmlFor="filter-year">Année</label>
                <select
                    id="filter-year"
                    className="result-filter__select"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                >
                    <option value="">Toutes les années</option>
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
            <div className="result-filter__group">
                <label className="result-filter__label" htmlFor="filter-exam">Filière / Programme</label>
                <select
                    id="filter-exam"
                    className="result-filter__select"
                    value={program}
                    onChange={e => setProgram(e.target.value)}
                >
                    <option value="">Toutes les filières</option>
                    {programs.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary result-filter__btn" onClick={handleFilter}>
                Filtrer les résultats
            </button>
        </div>
    );
}
