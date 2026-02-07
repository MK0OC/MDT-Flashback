'use client';

import "./Pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalPages, onPageChange }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <span className="pagination-info">{currentPage} / {totalPages}</span>
            <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </div>
    );
};

export default Pagination;
