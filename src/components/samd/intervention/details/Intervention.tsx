"use client";

import { useEffect, useState } from "react";
import "@/src/components/samd/intervention/details/Intervention.scss";
import type { Citizen, Intervention as InterventionType } from "@/src/types/types";
import { getCitizenInterventions } from "@/src/actions/samd/intervention.action";
import Loader from "@/src/components/ui/loader/Loader";

const Intervention = ({ citizen }: { citizen: Citizen }) => {
    const [interventions, setInterventions] = useState<InterventionType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterventions = async () => {
            const result = await getCitizenInterventions(citizen.id);
            if (!result.error) {
                setInterventions(result.interventions);
            }
            setLoading(false);
        };
        fetchInterventions();
    }, [citizen.id]);

    if (loading) {
        return <Loader />;
    }

    if (interventions.length === 0) {
        return (
            <div className="intervention-body">
                <p>Aucune intervention enregistrée.</p>
            </div>
        );
    }

    return (
        <div className="intervention-body">
            {interventions.map((intervention) => (
                <div key={intervention.id} className="intervention-card">
                    <div className="intervention-header">
                        <span className="intervention-date">
                            {new Date(intervention.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="intervention-ata">ATA: {intervention.ata}</span>
                    </div>
                    <div className="intervention-content">
                        <div className="intervention-field">
                            <span className="field-label">Examen clinique</span>
                            <span className="field-value">{intervention.clinicalExam}</span>
                        </div>
                        <div className="intervention-field">
                            <span className="field-label">Soins prodigués</span>
                            <span className="field-value">{intervention.careProvided}</span>
                        </div>
                        <div className="intervention-field">
                            <span className="field-label">Bilan</span>
                            <span className="field-value">{intervention.checkup}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Intervention;
