"use client";

import type { Citizen } from "@/src/types/types";
import type { ReactNode } from "react";
import Button from "../../ui/button/Button";
import "@/src/components/citizens/details/CitizenDetails.scss";

const CitizenDetails = ({ citizen, logo, details, actions, content }: {
    citizen: Citizen;
    logo: ReactNode;
    details: ReactNode;
    actions: ReactNode;
    content?: ReactNode;
}) => {
    return (
        <div className="citizen-details">
            <div className="citizen-details-header">
                <div className="citizen-details-header-details">
                    <span className="citizen-details-header-title">{`${citizen.firstname} ${citizen.lastname} <${citizen.email}>`}</span>
                    <span>Né(é) le : {new Date(citizen.birthdate).toLocaleDateString("fr-FR")}</span>
                    <span>N°Téléphone : {citizen.phonenumber}</span>
                    <span>Recensé(e) le : {new Date(citizen.createdAt).toLocaleDateString("fr-FR")} à {new Date(citizen.createdAt).toLocaleTimeString("fr-FR").slice(0, 5)}</span>
                </div>
                <div className="citizen-details-header-actions">
                    <Button>Edit</Button>
                </div>
            </div>
            <div className="citizen-details-content">
                <div>{logo}</div>
                {details && <div className="citizen-details-content-details">{details}</div>}
            </div>
            <div className="citizen-details-body">
                <div className="citizen-details-body-actions">
                    {actions}
                </div>
                <div className="citizen-details-body-content">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CitizenDetails;
