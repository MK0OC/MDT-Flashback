"use client";

import { useEffect, useState } from "react";
import { activateUser, deleteUser, getAllUsers } from "@/src/actions/users.action";
import Table from "@/src/components/ui/table/Table";
import Loader from "@/src/components/ui/loader/Loader";
import Button from "@/src/components/ui/button/Button";
import Select from "@/src/components/ui/select/Select";
import Input from "@/src/components/ui/input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/src/components/ui/popup/Popup";
import type { User } from "@/src/types/types"

const MDT_OPTIONS = [
  { label: "SAMD", value: "SAMD" },
  { label: "SAFD", value: "SAFD" },
  { label: "SASP", value: "SASP" },
  { label: "MCD", value: "MCD" },
  { label: "DOJ", value: "DOJ" },
];

const MdtAdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMdts, setSelectedMdts] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers().then((result) => {
      setUsers(result.users);
      setError(result.error);
      setLoading(false);

      const initial: Record<string, string[]> = {};
      result.users.forEach((u: User) => {
        initial[u.id] = u.mdtAccess ?? [];
      });
      setSelectedMdts(initial);
    });
  }, []);

  const handleActivate = async (userId: string) => {
    const mdts = selectedMdts[userId];
    if (!mdts || mdts.length === 0) return;

    const result = await activateUser(userId, mdts);
    if (!result.error) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "ACTIVE", mdtAccess: mdts } : u
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="mdt-admin-content">
        <span className="global-mdt-title">Liste des utilisateurs</span>
        <div className="mdt-admin-search-input">
          <Input label="Rechercher par nom, email ou MDT..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="mdt-admin-content">
      <span className="global-mdt-title">Liste des utilisateurs</span>
        <div className="mdt-admin-search-input">
          <Input label="Rechercher par nom, email ou MDT..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      <div className="mdt-admin-users-list">
        {!error ? (
          <Table header={["Nom", "Discord ID", "Email", "Statut", "Rôle", "MDT", "Actions"]}>
            {users.filter((user) => {
              const q = search.toLowerCase();
              return user.name.toLowerCase().includes(q)
                || user.email.toLowerCase().includes(q)
                || user.discordId?.includes(q)
                || user.mdtAccess.some((m) => m.toLowerCase().includes(q));
            }).map((user) => (
              <tr key={user.id} className={user.status === "PENDING" ? "mdt-admin-pending-user" : ""}>
                {deletingId === user.id ? (
                  <td colSpan={7}><Loader /></td>
                ) : (
                  <>  
                    <td>{user.name}</td>
                    <td>{user.discordId}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className="status-active">
                        {user.mdtAccess.join(", ")}
                      </span>
                    </td>
                    <td className="mdt-admin-table-action">
                      <FontAwesomeIcon className="mdt-admin-users-delete" icon={faTrash} cursor={"pointer"} onClick={() => setDeleteTargetId(user.id)}
                      />
                      <Select
                        options={MDT_OPTIONS}
                        value={selectedMdts[user.id] || []}
                        placeholder="Sélectionner les MDT..."
                        onChange={(values) =>
                          setSelectedMdts((prev) => ({ ...prev, [user.id]: values }))
                        }
                      />
                      {JSON.stringify(selectedMdts[user.id]?.slice().sort()) !== JSON.stringify(user.mdtAccess?.slice().sort()) && (
                        <Button variant="default" onClick={() => handleActivate(user.id)}>
                          Valider
                        </Button>
                     )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </Table>
        ) : (
          <p>{error}</p>
        )}
      </div>
      <Popup isOpen={!!deleteTargetId} onClose={() => setDeleteTargetId(null)} title="Confirmer la suppression">
        <p>Voulez-vous supprimer cet utilisateur ?</p>
        <Button variant="delete" onClick={async () => {
          if (!deleteTargetId) return;
          setDeleteTargetId(null);
          setDeletingId(deleteTargetId);
          await deleteUser(deleteTargetId);
          setUsers((prev) => prev.filter((u) => u.id !== deleteTargetId));
          setDeletingId(null);
        }}>
          Supprimer
        </Button>
      </Popup>
    </div>
  );
};

export default MdtAdminUsersPage;
