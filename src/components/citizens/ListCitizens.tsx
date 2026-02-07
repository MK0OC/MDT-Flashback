"use client";

import { useEffect, useMemo, useState } from "react";
import type { Citizen } from "@/src/types/types";
import { getAllCitizens } from "@/src/actions/citizens.action";
import Input from "@/src/components/ui/input/Input";
import Loader from "@/src/components/ui/loader/Loader";
import Button from "@/src/components/ui/button/Button";
import Pagination from "@/src/components/ui/pagination/Pagination";

const PER_PAGE = 10;

const ListCitizen = ({ onCreateClick, addCitizen, onCitizenClick }: { onCreateClick: () => void; addCitizen: Citizen | null; onCitizenClick: (citizen: Citizen) => void }) => {
    const [citizens, setCitizens] = useState<Citizen[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getAllCitizens().then((result) => {
            setCitizens(result.citizens);
            setError(result.error);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        if (addCitizen) {
            setCitizens((prev) => [addCitizen, ...prev]);
        }
    }, [addCitizen]);

    const filteredCitizens = useMemo(() => {
        const q = search.toLowerCase();
        return citizens.filter((citizen) =>
            citizen.firstname.toLowerCase().includes(q)
            || citizen.lastname.toLowerCase().includes(q)
        );
    }, [citizens, search]);

    const totalPages = Math.max(1, Math.ceil(filteredCitizens.length / PER_PAGE));

    const paginatedCitizens = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return filteredCitizens.slice(start, start + PER_PAGE);
    }, [filteredCitizens, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    if (loading) {
        return (
            <div className="mdt-samd-searching">
                <div className="mdt-samd-search-input">
                    <Input label="Rechercher un citoyen..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button variant="default" onClick={onCreateClick}>Recenser un citoyen</Button>
                </div>
                <Loader />
            </div>
        );
    }

    return (
        <div className="mdt-samd-searching">
            <div className="mdt-admin-search-input">
                <Input label="Rechercher un citoyen..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="default" onClick={onCreateClick}>Recenser un citoyen</Button>
            </div>
            <div>
                {!error ? (
                    <div className="mdt-samd-citizen-list">
                        {filteredCitizens.length === 0 ? (
                            <p>Aucun citoyen de créé</p>
                        ) : (
                            paginatedCitizens.map((citizen) => (
                                <Button key={citizen.id} variant="citizen" onClick={() => onCitizenClick(citizen)}>
                                    <span className="citizen-btn-content">
                                        <span>{citizen.firstname} {citizen.lastname}</span>
                                        <span>{new Date(citizen.birthdate).toLocaleDateString("fr-FR")}</span>
                                    </span>
                                </Button>
                            ))
                        )}
                    </div>
                ) : (
                    <p>{error}</p>
                )}
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </div>
    );
};

export default ListCitizen;
