"use server";

import { prisma } from "@/src/lib/prisma";
import { BloodType } from "@/prisma/generated/prisma/client";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

const createCitizen = async (data: {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    weight: string;
    height: string;
    sex: string;
    birthdate: Date;
}) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { error: "Non autorisé.", citizen: null };
        }

        const citizen = await prisma.citizen.create({
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phonenumber: data.phonenumber,
                weight: data.weight,
                height: data.height,
                sex: data.sex,
                birthdate: data.birthdate
            }
        });

        return { error: null, citizen };
    } catch (error) {
        console.error("Error creating citizen:", error);
        return { error: "Erreur lors de la création du citizen.", citizen: null };
    }
}

const getAllCitizens = async () => {
    try {
        const reqHeaders = await headers();

        const session = await auth.api.getSession({
            headers: reqHeaders,
        });

        if (!session) {
            return { error: "Non autorisé.", citizens: [] };
        }

        const response = await fetch(`http://localhost:3000/api/citizens`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: reqHeaders.get("cookie") || "",
            },
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            return { error: data?.error || "Erreur lors de la récupération des citizens.", citizens: [] };
        }

        const citizens = await response.json();
        return { error: null, citizens };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { error: "Erreur lors de la récupération des citizens.", citizens: [] };
    }
};

export { createCitizen, getAllCitizens };