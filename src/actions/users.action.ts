"use server";

import { headers } from "next/headers";

const getAllUsers = async () => {
    try {
        const reqHeaders = await headers();
        const response = await fetch(`http://localhost:3000/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: reqHeaders.get("cookie") || "",
            },
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            return { error: data?.error || "Erreur lors de la récupération des utilisateurs.", users: [] };
        }

        const users = await response.json();
        return { error: null, users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { error: "Erreur lors de la récupération des utilisateurs.", users: [] };
    }
};

const deleteUser = async (userId: string) => {
    try {
        const reqHeaders = await headers();
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                cookie: reqHeaders.get("cookie") || "",
            },
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            return { error: data?.error || "Erreur lors de la suppression de l'utilisateur." };
        }
        return { error: null };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { error: "Erreur lors de la suppression de l'utilisateur." };
    }
};

const activateUser = async (userId: string, mdtAccess: string[]) => {
    try {
        const reqHeaders = await headers();
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: reqHeaders.get("cookie") || "",
            },
            body: JSON.stringify({ mdtAccess }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            return { error: data?.error || "Erreur lors de l'activation de l'utilisateur." };
        }

        return { error: null };
    } catch (error) {
        console.error("Error activating user:", error);
        return { error: "Erreur lors de l'activation de l'utilisateur." };
    }
};

export { getAllUsers, deleteUser, activateUser };
