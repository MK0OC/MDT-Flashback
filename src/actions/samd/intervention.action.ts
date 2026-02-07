"use server";

import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export const createIntervention = async ({
    citizenId,
    data,
}: {
    citizenId: string;
    data: {
        clinicalExam: string;
        careProvided: string;
        checkup: string;
        ata: number;
    };
}) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { error: "Unauthorized", intervention: null };
        }

        const intervention = await prisma.interventions.create({
            data: {
                citizenId,
                clinicalExam: data.clinicalExam,
                careProvided: data.careProvided,
                checkup: data.checkup,
                ata: data.ata,
            },
        });

        return { error: null, intervention };
    } catch (error) {
        console.error("Error creating intervention:", error);
        return { error: "Erreur lors de la création de l'intervention.", intervention: null };
    }
}

export const getCitizenInterventions = async (citizenId: string) => {
    try {
        const reqHeaders = await headers();

        const session = await auth.api.getSession({
            headers: reqHeaders,
        });

        if (!session) {
            return { error: "Non autorisé.", interventions: [] };
        }

        const response = await fetch(`http://localhost:3000/api/samd/interventions/${citizenId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: reqHeaders.get("cookie") || "",
            },
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            return { error: data?.error || "Erreur lors de la récupération des interventions.", interventions: [] };
        }

        const interventions = await response.json();
        return { error: null, interventions };
    } catch (error) {
        console.error("Error fetching interventions:", error);
        return { error: "Erreur lors de la récupération des interventions.", interventions: [] };
    }
}