import { useCallback, useEffect, useMemo, useState } from "react";
import { cloudStatusLabel, loadJobEntries, saveJobEntries } from "../../cloudState.js";

const STATUSES = [
  "Applied",
  "Follow-up Sent",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
  "Closed",
];

const OPEN_STATUSES = ["Applied", "Follow-up Sent", "Phone Screen", "Interview"];

const TARGETS = [
  "Fortified Health Security",
  "Clearwater",
  "Optiv",
  "Booz Allen",
  "Nordic Consulting",
  "Coalition Insurance",
  "Corvus Insurance",
  "Philips",
  "Leidos Health",
  "Armis",
  "Claroty",
  "Cynerio",
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const da = new Date(`${a}T00:00:00`);
  const db = new Date(`${b}T00:00:00`);
  return Math.round((db - da) / 86400000);
}

function urgency(entry) {
  if (!OPEN_STATUSES.includes(entry.status)) return "none";
  const diff = daysBetween(todayStr(), entry.followUpDeadline);
  if (diff < 0) return "overdue";
  if (diff <= 3) return "soon";
  return "ok";
}

function buildEmail(entry) {
  const hm = entry.hiringManager?.trim() ? entry.hiringManager.trim().split(" ")[0] : "there";
  const hook = entry.keyHook?.trim() ? ` ${entry.keyHook.trim()}` : "";
  const n = entry.followUpCount || 0;

  if (n === 0) {
    return {
      subject: `Following up - ${entry.role} at ${entry.company}`,
      body: `Hi ${hm},

I applied for the ${entry.role} role at ${entry.company} on ${entry.dateApplied} and wanted to follow up while it's still fresh.${hook}

I bring 28+ years of frontline clinical operations experience alongside hands-on healthcare cybersecurity work. That combination gives me a risk-reduction lens on this role that is hard to find elsewhere.

Happy to answer any questions or share more detail whenever useful. I appreciate you taking a look.

Best,
Chaunda C. Dallas, MSIT
chaundacdallas.com`,
      note: "First follow-up. Warm, specific, low-pressure.",
    };
  }

  if (n === 1) {
    return {
      subject: `Still interested - ${entry.role} at ${entry.company}`,
      body: `Hi ${hm},

Circling back one more time on the ${entry.role} role at ${entry.company}. Still very interested if the timeline has shifted. No worries either way, and I appreciate the consideration.

Best,
Chaunda`,
      note: "Second follow-up. Short and gracious.",
    };
  }

  return {
    subject: `Closing the loop - ${entry.role} at ${entry.company}`,
    body: `Hi ${hm},

I know priorities shift, so I will keep this brief. I wanted to close the loop on the ${entry.role} role. If it has moved on, no hard feelings at all, and I would welcome staying connected for future openings at ${entry.company}.

Best,
Chaunda`,
    note: "Final touch. After this, move the role to Closed unless they reply.",
  };
}

function dateLabel(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Field({ label, children }) {
  return (
    <label className="jobs-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function JobSearchTracker() {
  const [entries, setEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [emailFor, setEmailFor] = useState(null);
  const [emailDraft, setEmailDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("active");
  const [form, setForm] = useState({
    company: "",
    role: "",
    hiringManager: "",
    dateApplied: todayStr(),
    status: "Applied",
    keyHook: "",
  });

  useEffect(() => {
    let mounted = true;
    loadJobEntries().then((next) => {
      if (mounted) {
        setEntries(next);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback((next) => {
    setEntries(next);
    saveJobEntries(next);
  }, []);

  const metrics = useMemo(() => {
    const active = entries.filter((e) => OPEN_STATUSES.includes(e.status));
    return {
      active: active.length,
      overdue: entries.filter((e) => urgency(e) === "overdue").length,
      interviews: entries.filter((e) => e.status === "Interview" || e.status === "Phone Screen").length,
      offers: entries.filter((e) => e.status === "Offer").length,
    };
  }, [entries]);

  const sorted = useMemo(() => {
    const rank = { overdue: 0, soon: 1, ok: 2, none: 3 };
    return [...entries]
      .filter((entry) => {
        if (filter === "active") return OPEN_STATUSES.includes(entry.status);
        if (filter === "attention") return ["overdue", "soon"].includes(urgency(entry));
        if (filter === "closed") return !OPEN_STATUSES.includes(entry.status);
        return true;
      })
      .sort((a, b) => {
        const ua = urgency(a);
        const ub = urgency(b);
        if (rank[ua] !== rank[ub]) return rank[ua] - rank[ub];
        return a.followUpDeadline < b.followUpDeadline ? -1 : 1;
      });
  }, [entries, filter]);

  const addEntry = () => {
    if (!form.company.trim() || !form.role.trim()) return;
    const entry = {
      id: Date.now(),
      company: form.company.trim(),
      role: form.role.trim(),
      hiringManager: form.hiringManager.trim(),
      dateApplied: form.dateApplied,
      status: form.status,
      followUpDeadline: addDays(form.dateApplied, 10),
      followUpCount: 0,
      keyHook: form.keyHook.trim(),
    };
    persist([entry, ...entries]);
    setForm({ company: "", role: "", hiringManager: "", dateApplied: todayStr(), status: "Applied", keyHook: "" });
    setShowForm(false);
  };

  const updateEntry = (id, patch) => {
    persist(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const removeEntry = (id) => {
    persist(entries.filter((e) => e.id !== id));
  };

  const markFollowUpSent = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    updateEntry(id, {
      followUpCount: (entry.followUpCount || 0) + 1,
      followUpDeadline: addDays(todayStr(), 14),
      status: entry.status === "Applied" ? "Follow-up Sent" : entry.status,
    });
  };

  const openEmail = (entry) => {
    setEmailFor(entry.id);
    setEmailDraft(buildEmail(entry));
    setCopied(false);
  };

  const emailEntry = entries.find((e) => e.id === emailFor);

  if (!loaded) {
    return <div className="jobs-loading">Loading job command center...</div>;
  }

  return (
    <div className="jobs-shell">
      <section className="jobs-hero">
        <div>
          <div className="jobs-kicker">Career Pipeline</div>
          <h2>Remote healthcare cyber roles, tracked like a mission board.</h2>
          <p>
            Log every application, surface overdue follow-ups, and generate polished email drafts without losing the thread.
          </p>
        </div>
        <div className="jobs-sync-pill">{cloudStatusLabel()}</div>
      </section>

      <section className="jobs-metrics">
        {[
          ["Active", metrics.active],
          ["Needs follow-up", metrics.overdue],
          ["Screens + interviews", metrics.interviews],
          ["Offers", metrics.offers],
        ].map(([label, value]) => (
          <div key={label} className="jobs-metric">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="jobs-toolbar">
        <div className="jobs-filters">
          {[
            ["active", "Active"],
            ["attention", "Attention"],
            ["all", "All"],
            ["closed", "Closed"],
          ].map(([key, label]) => (
            <button key={key} className={filter === key ? "is-active" : ""} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
        <button className="jobs-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "Log application"}
        </button>
      </section>

      {showForm && (
        <section className="jobs-form">
          <Field label="Company">
            <input list="job-targets" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Fortified Health Security" />
            <datalist id="job-targets">{TARGETS.map((target) => <option key={target} value={target} />)}</datalist>
          </Field>
          <Field label="Role">
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Senior GRC Consultant" />
          </Field>
          <Field label="Hiring manager">
            <input value={form.hiringManager} onChange={(e) => setForm({ ...form, hiringManager: e.target.value })} placeholder="Optional" />
          </Field>
          <Field label="Date applied">
            <input type="date" value={form.dateApplied} onChange={(e) => setForm({ ...form, dateApplied: e.target.value })} />
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </Field>
          <Field label="Specific hook">
            <input value={form.keyHook} onChange={(e) => setForm({ ...form, keyHook: e.target.value })} placeholder="HITRUST, IoMT, patient safety, GRC..." />
          </Field>
          <button className="jobs-primary jobs-save" onClick={addEntry}>Save entry</button>
        </section>
      )}

      <section className="jobs-list">
        {sorted.length === 0 && (
          <div className="jobs-empty">No applications in this view yet. Your next targeted role belongs here.</div>
        )}

        {sorted.map((entry) => {
          const state = urgency(entry);
          return (
            <article key={entry.id} className={`job-card is-${state}`}>
              <div className="job-main">
                <div className="job-title-row">
                  <h3>{entry.company}</h3>
                  <span>{entry.status}</span>
                </div>
                <p>{entry.role}</p>
                <div className="job-meta">
                  <span>Applied {dateLabel(entry.dateApplied)}</span>
                  {entry.hiringManager && <span>{entry.hiringManager}</span>}
                  {entry.followUpCount > 0 && <span>{entry.followUpCount} follow-up{entry.followUpCount > 1 ? "s" : ""}</span>}
                </div>
              </div>

              <div className="job-controls">
                <select value={entry.status} onChange={(e) => updateEntry(entry.id, { status: e.target.value })}>
                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <label>
                  Follow up
                  <input type="date" value={entry.followUpDeadline} onChange={(e) => updateEntry(entry.id, { followUpDeadline: e.target.value })} />
                </label>
              </div>

              <div className="job-actions">
                <button onClick={() => openEmail(entry)}>Draft email</button>
                <button onClick={() => markFollowUpSent(entry.id)}>Mark sent</button>
                <button className="danger" onClick={() => removeEntry(entry.id)}>Remove</button>
              </div>
            </article>
          );
        })}
      </section>

      {emailEntry && emailDraft && (
        <div className="jobs-modal" onClick={() => setEmailFor(null)}>
          <div className="jobs-dialog" onClick={(event) => event.stopPropagation()}>
            <div className="jobs-dialog-head">
              <div>
                <h3>{emailEntry.company}</h3>
                <p>{emailDraft.note}</p>
              </div>
              <button onClick={() => setEmailFor(null)}>Close</button>
            </div>

            <Field label="Subject">
              <input value={emailDraft.subject} onChange={(e) => setEmailDraft({ ...emailDraft, subject: e.target.value })} />
            </Field>
            <Field label="Body">
              <textarea value={emailDraft.body} onChange={(e) => setEmailDraft({ ...emailDraft, body: e.target.value })} />
            </Field>
            <button
              className="jobs-primary"
              onClick={async () => {
                await navigator.clipboard.writeText(`Subject: ${emailDraft.subject}\n\n${emailDraft.body}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
