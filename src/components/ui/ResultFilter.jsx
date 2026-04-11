import { useState } from 'react';
import './ResultFilter.css';

/**
 * ResultFilter – Dropdowns to filter results by year and exam type.
 */
export default function ResultFilter({ onFilter }) {
    const [year, setYear] = useState('');
    const [examType, setExamType] = useState('');

    const handleFilter = () => {
        if (onFilter) onFilter({ year, examType });
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
                    <option value="2025">[ANNÉE_1]</option>
                    <option value="2024">[ANNÉE_2]</option>
                    <option value="2023">[ANNÉE_3]</option>
                </select>
            </div>
            <div className="result-filter__group">
                <label className="result-filter__label" htmlFor="filter-exam">Type d&apos;examen</label>
                <select
                    id="filter-exam"
                    className="result-filter__select"
                    value={examType}
                    onChange={e => setExamType(e.target.value)}
                >
                    <option value="">Tous les examens</option>
                    <option value="bts">[EXAMEN_1]</option>
                    <option value="licence">[EXAMEN_2]</option>
                    <option value="master">[EXAMEN_3]</option>
                </select>
            </div>
            <button className="btn btn-primary result-filter__btn" onClick={handleFilter}>
                Filtrer les résultats
            </button>
        </div>
    );
}
