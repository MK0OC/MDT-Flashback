"use client";

import { useState } from "react";
import type { Citizen } from "@/src/types/types";
import Input from "@/src/components/ui/input/Input";
import Button from "@/src/components/ui/button/Button";
import Popup from "@/src/components/ui/popup/Popup";
import { createIntervention } from "@/src/actions/samd/intervention.action";

const CreateIntervention = ({ isOpen, onClose, citizen }: { isOpen: boolean; onClose: () => void; citizen: Citizen;}) => {
    const [clinicalExam, setClinicalExam] = useState("");
    const [careProvided, setCareProvided] = useState("");
    const [checkup, setCheckup] = useState("");
    const [ata, setAta] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const resetForm = () => {
        setClinicalExam("");
        setCareProvided("");
        setCheckup("");
        setAta("");
        setSubmitted(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleCreate = async () => {
        setSubmitted(true);
        if (!clinicalExam || !careProvided || !checkup || !ata || isNaN(Number(ata))) return;
        const result = await createIntervention({
            citizenId: citizen.id,
            data: {
                clinicalExam,
                careProvided,
                checkup,
                ata: Number(ata),
            },
        });
        if (result.error) {
            console.error(result.error);
            return;
        }
        handleClose();
    };

    return (
        <Popup className="mdt-samd-create-user-popup" isOpen={isOpen} onClose={handleClose} title="Créer une intervention">
            <Input key="clinicalExam" title="Examen clinique" label="Examen clinique..." type="text" value={clinicalExam} onChange={(e) => setClinicalExam(e.target.value)} error={submitted && !clinicalExam} errorMessage="L'examen clinique est requis."/>
            <Input key="careProvided" title="Soins prodigués" label="Soins prodigués..." type="text" value={careProvided} onChange={(e) => setCareProvided(e.target.value)} error={submitted && !careProvided} errorMessage="Les soins prodigués sont requis."/>
            <Input key="checkup" title="Bilan" label="Bilan..." type="text" value={checkup} onChange={(e) => setCheckup(e.target.value)} error={submitted && !checkup} errorMessage="Le bilan est requis."/>
            <Input key="ata" title="ATA" label="ATA..." type="number" value={ata} onChange={(e) => setAta(e.target.value)} error={submitted && (!ata || isNaN(Number(ata)))} errorMessage={!ata ? "L'ATA est requis." : "L'ATA doit être un nombre."}/>
            <Button variant="default" onClick={handleCreate}>Créer</Button>
        </Popup>
    );
};

export default CreateIntervention;
