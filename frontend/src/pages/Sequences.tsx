// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search } from "lucide-react";
// import StatusBadge from "@/components/shared/StatusBadge";
// import ToggleSwitch from "@/components/shared/ToggleSwitch";
// import PaginationBar from "@/components/shared/PaginationBar";
// import api from "@/services/api";

// interface Sequence {
//   _id: string;
//   name: string;
//   channel: string;
//   createdBy: string;
//   category: string;
//   status: string;
//   active: boolean;
//   attempted: number;
//   sent: string;
//   delivered: string;
// }

// const Sequences = () => {
//   const navigate = useNavigate();
//   const [sequences, setSequences] = useState<Sequence[]>([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     api.get("/sequences").then((r) => setSequences(r.data)).catch(() => {});
//   }, []);

//   const toggleActive = async (seq: Sequence) => {
//     try {
//       await api.patch(`/sequences/${seq._id}`, { active: !seq.active });
//       setSequences((prev) => prev.map((s) => (s._id === seq._id ? { ...s, active: !s.active } : s)));
//     } catch {}
//   };

//   const filtered = sequences.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-5">
//         <h1 className="text-xl font-semibold text-foreground">WhatsApp Sequences</h1>
//         <div className="flex items-center gap-3">
//           <StatusBadge status="Good" />
//           <button className="text-xs text-crm-blue hover:underline">Notifications Limit</button>
//           <button onClick={() => navigate("/sequences/new")} className="bg-crm-blue text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-crm-blue-dark transition-colors">
//             Create Sequence
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 mb-4">
//         <div className="relative">
//           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//           <input className="border border-crm-border rounded-lg pl-9 pr-4 py-2 text-sm w-[280px]" placeholder="Search sequences..." value={search} onChange={(e) => setSearch(e.target.value)} />
//         </div>
//         {["Status", "Category", "Created by", "Date Sent Live", "Type"].map((f) => (
//           <select key={f} className="border border-crm-border rounded-lg px-3 py-2 text-xs text-muted-foreground">
//             <option>{f}</option>
//           </select>
//         ))}
//       </div>

//       <div className="bg-card rounded-xl border border-crm-border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-crm-border bg-muted/50">
//               <th className="text-left p-3 font-medium text-muted-foreground">ON/OFF</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Sequence Name</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Channel</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Created By</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Attempted</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Sent</th>
//               <th className="text-left p-3 font-medium text-muted-foreground">Delivered</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr><td colSpan={9} className="text-center py-16 text-muted-foreground">No sequences yet.</td></tr>
//             ) : (
//               filtered.slice((page - 1) * 20, page * 20).map((s) => (
//                 <tr key={s._id} className="border-b border-crm-border hover:bg-muted/30">
//                   <td className="p-3"><ToggleSwitch checked={s.active} onChange={() => toggleActive(s)} /></td>
//                   <td className="p-3 font-medium text-foreground">{s.name}</td>
//                   <td className="p-3 text-muted-foreground">{s.channel}</td>
//                   <td className="p-3 text-muted-foreground">{s.createdBy}</td>
//                   <td className="p-3 text-muted-foreground">{s.category}</td>
//                   <td className="p-3"><StatusBadge status={s.status} /></td>
//                   <td className="p-3 text-muted-foreground">{s.attempted}</td>
//                   <td className="p-3 text-muted-foreground">{s.sent}</td>
//                   <td className="p-3 text-muted-foreground">{s.delivered}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <PaginationBar total={filtered.length} page={page} perPage={20} onChange={setPage} />
//     </div>
//   );
// };

// export default Sequences;




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import PaginationBar from "@/components/shared/PaginationBar";
import api from "@/services/api";

interface Sequence {
  _id: string;
  name: string;
  channel: string;
  createdBy: string;
  category: string;
  status: string;
  active: boolean;
  attempted: number;
  sent: string;
  delivered: string;
}

const Sequences = () => {
  const navigate = useNavigate();
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Fetch all sequences on mount ──────────────────────────────────
  useEffect(() => {
    setLoading(true);
    api
      .get("/sequences")
      .then((r) => setSequences(r.data))
      .catch((err) => {
        console.error("Failed to load sequences:", err);
        setError("Could not load sequences. Is the backend running?");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Toggle active / inactive ──────────────────────────────────────
  const toggleActive = async (seq: Sequence) => {
    // Optimistic update — flip immediately in UI
    setSequences((prev) =>
      prev.map((s) => (s._id === seq._id ? { ...s, active: !s.active } : s))
    );
    try {
      await api.patch(`/sequences/${seq._id}`, { active: !seq.active });
    } catch (err) {
      console.error("Toggle failed:", err);
      // Revert if the API call failed
      setSequences((prev) =>
        prev.map((s) => (s._id === seq._id ? { ...s, active: seq.active } : s))
      );
    }
  };

  // ── Delete a sequence ─────────────────────────────────────────────
  const deleteSequence = async (id: string) => {
    if (!confirm("Delete this sequence?")) return;
    try {
      await api.delete(`/sequences/${id}`);
      setSequences((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete sequence.");
    }
  };

  // ── Filter + paginate ─────────────────────────────────────────────
  const filtered = sequences.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * 20, page * 20);

  // Reset to page 1 whenever search changes
  useEffect(() => setPage(1), [search]);

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-foreground">
          WhatsApp Sequences
        </h1>
        <div className="flex items-center gap-3">
          <StatusBadge status="Good" />
          <button className="text-xs text-crm-blue hover:underline">
            Notifications Limit
          </button>
          <button
            onClick={() => navigate("/sequences/new")}
            className="bg-crm-blue text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-crm-blue-dark transition-colors"
          >
            Create Sequence
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            className="border border-crm-border rounded-lg pl-9 pr-4 py-2 text-sm w-[280px]"
            placeholder="Search sequences..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {["Status", "Category", "Created by", "Date Sent Live", "Type"].map(
          (f) => (
            <select
              key={f}
              className="border border-crm-border rounded-lg px-3 py-2 text-xs text-muted-foreground"
            >
              <option>{f}</option>
            </select>
          )
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-xl border border-crm-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-crm-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">
                ON/OFF
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Sequence Name
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Channel
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Created By
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Category
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Attempted
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Sent
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Delivered
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-16 text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-16 text-muted-foreground"
                >
                  {search ? "No sequences match your search." : "No sequences yet."}
                </td>
              </tr>
            ) : (
              paginated.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-crm-border hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3">
                    <ToggleSwitch
                      checked={s.active}
                      onChange={() => toggleActive(s)}
                    />
                  </td>
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-muted-foreground">
                    {s.channel || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {s.createdBy || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {s.category || "—"}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {s.attempted ?? 0}
                  </td>
                  <td className="p-3 text-muted-foreground">{s.sent ?? "0"}</td>
                  <td className="p-3 text-muted-foreground">
                    {s.delivered ?? "0"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteSequence(s._id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationBar
        total={filtered.length}
        page={page}
        perPage={20}
        onChange={setPage}
      />
    </div>
  );
};

export default Sequences;