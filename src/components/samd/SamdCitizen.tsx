"use client";

import type { Citizen } from "@/src/types/types";
import CitizenDetails from "../citizens/details/CitizenDetails";
import Image from "next/image";
import Button from "../ui/button/Button";
import Tabs from "../ui/tabs/Tabs";
import Interventions from "./intervention/details/Intervention";
import CreateIntervention from "./intervention/CreateIntervention";
import { useState } from "react";

const SamdCitizen = ({ citizen }: { citizen: Citizen }) => {
    const [createIntervention, setCreateIntervention] = useState(false);

    return (
        <>
            <CitizenDetails
                citizen={citizen}
                logo={<Image src={"/logo_samd.webp"} width={200} height={200} alt="SAMD Logo" />}
                details={
                    <>
                        <div className="detail-item">
                            <span className="detail-label">Poids</span>
                            <span className="detail-value">{citizen.weight || "//"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Taille</span>
                            <span className="detail-value">{citizen.height || "//"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Sexe</span>
                            <span className="detail-value">{citizen.sex || "//"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Médecin traitant</span>
                            <span className="detail-value">//</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Mutuelle</span>
                            <span className="detail-value">Non renseigné</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Contact d&apos;urgence</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Allergies</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Antécédents</span>
                            <span className="detail-value">//</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Groupe sanguin</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Addictions</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Contre-indications</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Traitement(s) en cours</span>
                            <span className="detail-value">//</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Pathologie(s)</span>
                            <span className="detail-value">//</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Décédé</span>
                            <span className="detail-value"><span className="indicator indicator-red" /></span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Wanted</span>
                            <span className="detail-value"><span className="indicator indicator-red" /></span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Donneur d&apos;organe</span>
                            <span className="detail-value">//</span>
                        </div>
                    </>
                }
                actions={
                    <>
                        <Button disabled variant="default">Inscrire à la liste de greffe</Button>
                        <Button variant="default" onClick={() => setCreateIntervention(true)}>Ajouter une intervention</Button>
                        <Button variant="default">Ajouter une pathologie</Button>
                        <Button variant="default">Faire une demande d'analyse</Button>
                        <Button variant="default">Ajouter une visite médicale</Button>
                        <Button variant="default">Déclarer le décès</Button>
                    </>
                }
                content={
                    <>
                        <Tabs tabs={[
                        { title: "Interventions", content: 
                            <Interventions citizen={citizen}/>
                        },
                        { title: "Demande d'analyse", content: 
                            <div>Contenu onglet 2</div> 
                        },
                        { title: "Visite médicale", content: 
                            <div>Contenu onglet 3</div> 
                        },
                        { title: "Pathologies", content: 
                            <div>Contenu onglet 3</div> 
                        },
                        ]} />
                    </>
                }
            />
            <CreateIntervention citizen={citizen} onClose={() => setCreateIntervention(false)} isOpen={createIntervention}/>
        </>
    );
};

export default SamdCitizen;
