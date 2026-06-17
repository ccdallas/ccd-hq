import { useState, useEffect } from "react";

const C = {
  forest:"#1A3F22", olive:"#58761B", gold:"#D99201",
  burnt:"#905A01", cream:"#F5EDD6", paper:"#FFFDF7",
  ink:"#0E1E12", mist:"#E8F0E0", shadow:"rgba(26,63,34,0.18)",
};

const STORE = "ccd_outreach_v1";

const STATUS = {
  sent:      { label:"Sent",           color:"#3b82f6", bg:"#eff6ff" },
  followup:  { label:"Follow-up",      color:"#f59e0b", bg:"#fffbeb" },
  reply:     { label:"Reply ✓",        color:"#10b981", bg:"#f0fdf4" },
  interview: { label:"Interview 🎯",   color:"#8b5cf6", bg:"#f5f3ff" },
  no:        { label:"No response",    color:"#9ca3af", bg:"#f9fafb" },
};

const NEXT = {
  sent:      "Follow up in 5 days",
  followup:  "Send follow-up NOW",
  reply:     "Respond within 24hrs",
  interview: "Prep — confirm details",
  no:        "Try alternate contact",
};

const TARGETS = [
  "Fortified Health Security","Claroty","Armis","Cynerio",
  "Optum","Leidos Health","Booz Allen","Nordic Consulting",
  "Clearwater","Corvus Insurance","Coalition Insurance",
  "Optiv","ScanTech AI","Insight Global","TEKsystems",
  "Apex","CyberCoders","Philips (Aví D. — WARM)"
];

const defaultEntries = () => ([
  { id: 1, org:"Optiv Security", contact:"CISO / Events Team", platform:"LinkedIn", lane:"hc", status:"sent", date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}), note:"Met at Hacker Summer Camp pool party. Black Hat hook used.", ts: Date.now() },
  { id: 2, org:"ScanTech AI Systems", contact:"Hiring Manager", platform:"Email", lane:"st", status:"sent", date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}), note:"City of Atlanta FIFA partner. DFR framework angle.", ts: Date.now() },
]);

function loadEntries() {
  try {
    const r = localStorage.getItem(STORE);
    if (r) return JSON.parse(r);
  } catch {}
  return defaultEntries();
}

function save(entries) {
  try { localStorage.setItem(STORE, JSON.stringify(entries)); } catch {}
}

const INP = {
  padding:"7px 10px", border:`1.5px solid ${C.mist}`,
  borderRadius:7, fontFamily:"'Lora',Georgia,serif",
  fontSize:12, color:C.ink, background:C.cream,
  outline:"none", width:"100%", boxSizing:"border-box",
};

export default function OutreachTracker() {
  const [entries, setEntries] = useState(loadEntries);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ org:"", contact:"", platform:"LinkedIn", lane:"hc", status:"sent", note:"" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => { save(entries); }, [entries]);

  const thisWeek = () => {
    const start = new Date(); start.setDate(start.getDate() - start.getDay()); start.setHours(0,0,0,0);
    return entries.filter(e => new Date(e.ts) >= start).length;
  };

  const filtered = entries.filter(e => {
    if (filter === "all") return true;
    if (filter === "hc") return e.lane === "hc" || e.lane === "both";
    if (filter === "st") return e.lane === "st" || e.lane === "both";
    return e.status === filter;
  });

  const addOrUpdate = () => {
    if (!form.org.trim()) return;
    const today = new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
    if (editId) {
      setEntries(prev => prev.map(e => e.id === editId ? {...e,...form} : e));
      setEditId(null);
    } else {
      setEntries(prev => [{ id: Date.now(), ...form, date: today, ts: Date.now() }, ...prev]);
    }
    setForm({ org:"", contact:"", platform:"LinkedIn", lane:"hc", status:"sent", note:"" });
    setShowForm(false);
  };

  const remove = id => setEntries(prev => prev.filter(e => e.id !== id));

  const edit = (e) => {
    setForm({ org:e.org, contact:e.contact, platform:e.platform, lane:e.lane, status:e.status, note:e.note||"" });
    setEditId(e.id); setShowForm(true);
  };

  const updateStatus = (id, status) => setEntries(prev => prev.map(e => e.id === id ? {...e, status} : e));

  const weekGoal = 5;
  const weekCount = thisWeek();
  const weekPct = Math.min((weekCount / weekGoal) * 100, 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      {/* Header metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        {[
          ["Total Touches", entries.length, C.forest],
          ["This Week", `${weekCount}/${weekGoal}`, weekCount >= weekGoal ? C.olive : C.burnt],
          ["Replies", entries.filter(e=>e.status==="reply").length, "#10b981"],
          ["Interviews", entries.filter(e=>e.status==="interview").length, "#8b5cf6"],
        ].map(([label, val, color]) => (
          <div key={label} style={{ background:C.paper, border:`1.5px solid ${C.mist}`, borderRadius:12, padding:"14px 16px", boxShadow:`0 2px 10px ${C.shadow}` }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:24, fontWeight:900, color }}>{val}</div>
            <div style={{ fontSize:11, color:"#888", marginTop:2, letterSpacing:"0.05em" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Weekly goal bar */}
      <div style={{ background:C.paper, border:`1.5px solid ${C.mist}`, borderRadius:12, padding:"14px 16px", boxShadow:`0 2px 10px ${C.shadow}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ fontSize:12, fontWeight:700, color:C.ink }}>Weekly Outreach Goal — 5 touches minimum</span>
          <span style={{ fontSize:11, color: weekCount >= weekGoal ? C.olive : C.burnt, fontWeight:700 }}>{weekCount >= weekGoal ? "✓ GOAL MET" : `${weekGoal - weekCount} to go`}</span>
        </div>
        <div style={{ height:7, background:C.mist, borderRadius:99, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${weekPct}%`, background:`linear-gradient(90deg,${C.olive},${C.gold})`, borderRadius:99, transition:"width 0.5s" }}/>
        </div>
      </div>

      {/* Filters + Add button */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
        {[["all","All"],["sent","Sent"],["followup","Follow-up"],["reply","Replies"],["interview","Interviews"],["hc","Healthcare"],["st","Sports Tech"]].map(([key,label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding:"5px 13px", borderRadius:20, border: filter===key ? "none" : `1.5px solid ${C.mist}`,
            background: filter===key ? C.forest : C.paper,
            color: filter===key ? "#fff" : "#888",
            fontSize:11, fontWeight: filter===key ? 700 : 400,
            cursor:"pointer", fontFamily:"'Lora',Georgia,serif", transition:"all 0.15s",
          }}>{label}</button>
        ))}
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ org:"", contact:"", platform:"LinkedIn", lane:"hc", status:"sent", note:"" }); }}
          style={{ marginLeft:"auto", padding:"7px 16px", background:C.gold, color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Lora',Georgia,serif" }}>
          {showForm && !editId ? "✕ Cancel" : "+ Log Outreach"}
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div style={{ background:C.paper, border:`1.5px solid ${C.gold}44`, borderRadius:12, padding:18, boxShadow:`0 4px 20px ${C.shadow}` }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:15, color:C.forest, fontWeight:700, marginBottom:14 }}>
            {editId ? "Edit Entry" : "Log New Outreach"}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Organization *</label>
              <input list="org-list" value={form.org} onChange={e => setForm({...form, org:e.target.value})} placeholder="Fortified Health Security" style={INP}/>
              <datalist id="org-list">{TARGETS.map(t => <option key={t} value={t}/>)}</datalist>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Contact / Role</label>
              <input value={form.contact} onChange={e => setForm({...form, contact:e.target.value})} placeholder="CISO / Hiring Mgr / Recruiter" style={INP}/>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Platform</label>
              <select value={form.platform} onChange={e => setForm({...form, platform:e.target.value})} style={INP}>
                {["LinkedIn","Email","Job Board","Referral","Recruiter","Phone"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Lane</label>
              <select value={form.lane} onChange={e => setForm({...form, lane:e.target.value})} style={INP}>
                <option value="hc">Healthcare Cyber</option>
                <option value="st">Sports Tech</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Status</label>
              <select value={form.status} onChange={e => setForm({...form, status:e.target.value})} style={INP}>
                {Object.entries(STATUS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.olive, fontWeight:700, display:"block", marginBottom:4 }}>Note</label>
              <input value={form.note} onChange={e => setForm({...form, note:e.target.value})} placeholder="Context, hook used, next step…" style={INP}/>
            </div>
          </div>
          <button onClick={addOrUpdate} style={{ padding:"9px 24px", background:C.forest, color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Lora',Georgia,serif" }}>
            {editId ? "Save Changes" : "Add Entry ↗"}
          </button>
        </div>
      )}

      {/* Entries */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"40px 20px", color:"#999", fontSize:13, fontStyle:"italic" }}>
            No entries yet. Start with Optiv and ScanTech AI — messages are ready.
          </div>
        )}
        {filtered.map(e => {
          const s = STATUS[e.status];
          return (
            <div key={e.id} style={{ background:C.paper, border:`1.5px solid ${C.mist}`, borderRadius:12, padding:"14px 16px", boxShadow:`0 2px 8px ${C.shadow}`, borderLeft:`4px solid ${s.color}` }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12, flexWrap:"wrap" }}>
                <div style={{ flex:1, minWidth:160 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                    <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:14, fontWeight:700, color:C.ink }}>{e.org}</span>
                    <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:s.bg, color:s.color, fontWeight:700 }}>{s.label}</span>
                    <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background: e.lane==="st" ? "#e1f5ee" : e.lane==="both" ? "#faeeda" : "#faece7", color: e.lane==="st" ? "#085041" : e.lane==="both" ? C.burnt : "#712B13", fontWeight:600 }}>
                      {e.lane==="hc" ? "Healthcare" : e.lane==="st" ? "Sports Tech" : "Both"}
                    </span>
                  </div>
                  <div style={{ fontSize:12, color:"#777", marginBottom:e.note?4:0 }}>
                    {e.contact && <span>{e.contact} · </span>}
                    <span>{e.platform}</span>
                    <span style={{ marginLeft:6, color:"#bbb" }}>· {e.date}</span>
                  </div>
                  {e.note && <div style={{ fontSize:11, color:"#888", fontStyle:"italic" }}>💬 {e.note}</div>}
                  <div style={{ fontSize:11, color:s.color, fontWeight:600, marginTop:5 }}>→ {NEXT[e.status]}</div>
                </div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap", alignItems:"center" }}>
                  {/* Quick status update */}
                  <select value={e.status} onChange={ev => updateStatus(e.id, ev.target.value)}
                    style={{ ...INP, width:"auto", fontSize:11, padding:"4px 8px", background:s.bg, color:s.color, border:`1.5px solid ${s.color}44`, fontWeight:700 }}>
                    {Object.entries(STATUS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                  <button onClick={() => edit(e)} style={{ background:C.cream, border:`1.5px solid ${C.mist}`, borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:11, color:C.olive, fontWeight:700 }}>Edit</button>
                  <button onClick={() => remove(e.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#ccc", fontSize:16, padding:"2px 4px" }}>✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Target list */}
      <div style={{ background:C.paper, border:`1.5px solid ${C.mist}`, borderRadius:12, padding:"14px 16px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.forest, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Priority Target List</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {TARGETS.map(t => {
            const logged = entries.some(e => e.org.toLowerCase().includes(t.toLowerCase().split("(")[0].trim()));
            return (
              <span key={t} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background: logged ? "#f0fdf4" : C.cream, color: logged ? C.olive : "#888", border:`1.5px solid ${logged ? C.olive+"44" : C.mist}`, fontWeight: logged ? 700 : 400 }}>
                {logged ? "✓ " : ""}{t}
              </span>
            );
          })}
        </div>
        <div style={{ fontSize:10, color:"#aaa", marginTop:8 }}>Targets turn green when you log outreach to them.</div>
      </div>
    </div>
  );
}
