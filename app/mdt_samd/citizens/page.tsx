"use client";

import { useState } from "react";
import type { Citizen } from "@/src/types/types";
import ListCitizen from "@/src/components/citizens/ListCitizens";
import CreateCitizen from "@/src/components/citizens/CreateCitizen";
import SamdCitizen from "@/src/components/samd/SamdCitizen";

const MdtSamdCitizens = () => {
    const [createUI, setCreateUI] = useState(false);
    const [lastCreated, setLastCreated] = useState<Citizen | null>(null);
    const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);

    return (
        <div className="mdt-samd-content">
            <ListCitizen onCreateClick={() => setCreateUI(true)} addCitizen={lastCreated} onCitizenClick={setSelectedCitizen} />
            {selectedCitizen && <SamdCitizen citizen={selectedCitizen} />}
            <CreateCitizen isOpen={createUI} onClose={() => setCreateUI(false)} onCitizenCreated={setLastCreated} />
        </div>
    );
};

export default MdtSamdCitizens;
