"use client";

import { useState } from "react";
import { createCitizen } from "@/src/actions/citizens.action";
import type { Citizen } from "@/src/types/types";
import Input from "@/src/components/ui/input/Input";
import Button from "@/src/components/ui/button/Button";
import Popup from "@/src/components/ui/popup/Popup";

const CreateCitizen = ({ isOpen, onClose, onCitizenCreated }: { isOpen: boolean; onClose: () => void; onCitizenCreated: (citizen: Citizen) => void }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [sex, setSex] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const resetForm = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhonenumber("");
        setWeight("");
        setHeight("");
        setSex("");
        setBirthdate("");
        setSubmitted(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleCreate = async () => {
        setSubmitted(true);
        if (!firstname || !lastname || !email || !isValidEmail(email) || !phonenumber || !weight || !height || !sex || !birthdate) return;
        const result = await createCitizen({ firstname, lastname, email, phonenumber, weight, height, sex, birthdate: new Date(birthdate) });
        if (result.citizen) {
            onCitizenCreated(result.citizen);
        }
        handleClose();
    };

    return (
        <Popup className="mdt-samd-create-user-popup" isOpen={isOpen} onClose={handleClose} title="Recenser un citoyen">
            <Input key="firstname" title="Prénom" label="Prénom..." type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} error={submitted && !firstname} errorMessage="Le prénom est requis."/>
            <Input key="lastname" title="Nom" label="Nom..." type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} error={submitted && !lastname} errorMessage="Le nom est requis."/>
            <Input key="email" title="Email" label="Email..." type="text" value={email} onChange={(e) => setEmail(e.target.value)} error={submitted && (!email || !isValidEmail(email))} errorMessage={!email ? "L'email est requis." : "Format d'email invalide."}/>
            <Input key="phonenumber" title="N°Téléphone" label="Téléphone..." type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} error={submitted && !phonenumber} errorMessage="Le numéro de téléphone est requis."/>
            <Input key="weight" title="Poids" label="Poids..." type="text" value={weight} onChange={(e) => setWeight(e.target.value)} error={submitted && !weight} errorMessage="Le poids est requis."/>
            <Input key="height" title="Taille" label="Taille..." type="text" value={height} onChange={(e) => setHeight(e.target.value)} error={submitted && !height} errorMessage="La taille est requise."/>
            <Input key="sex" title="Sexe" label="Sexe..." type="text" value={sex} onChange={(e) => setSex(e.target.value)} error={submitted && !sex} errorMessage="Le sexe est requis."/>
            <Input key="birthdate" title="Date de naissance" label="Date de naissance..." type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} error={submitted && !birthdate} errorMessage="La date de naissance est requise."/>
            <Button variant="default" onClick={handleCreate}>Créer</Button>
        </Popup>
    );
};

export default CreateCitizen;
