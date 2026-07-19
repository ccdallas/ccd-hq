import { useState, useEffect, useCallback, useRef } from "react";
import JobSearchTracker from "./JobSearchTracker.jsx";

// ── Brand spine v2 — Green / Amber / Crimson(pulse-only) / Cream / Slate ──
// Token names kept identical to v1 so every existing reference below
// (C.forest, C.gold, etc.) automatically inherits the new brand palette.
const C = {
  forest:"#1E5040",   // brand Green — identity: headers, nav, primary UI
  olive:"#2C6B52",    // Green tint — secondary accents, progress gradients
  gold:"#E0A83E",     // brand Amber — CTAs, highlights, hover states
  burnt:"#B9862A",    // Amber-deep — secondary CTA / pressed states
  cream:"#F3ECDD",    // brand Cream — backgrounds, negative space
  paper:"#FFFDF8",    // near-white card surface
  ink:"#3D4142",       // brand Slate — body text, secondary UI
  mist:"#E4DCC8",      // divider / tint derived from Cream
  crimson:"#8B1E24",  // brand Crimson — PULSE ONLY, never decorative
  shadow:"rgba(30,80,64,0.16)",
};

const AFFIRMATIONS = [
  "I didn't leave healthcare. I learned to defend it. And the world is about to know my name.",
  "I am the Digital First Responder — the bridge between the clinical floor and the security operations center.",
  "God placed this calling on my life long before I understood it. I walk in it fully and without apology.",
  "I am not a non-traditional candidate. I am the candidate they didn't know they needed.",
  "Every closed door redirected me closer to my purpose. I trust the process.",
  "I protect patients from threats they never see coming. That is sacred work.",
  "My 28 years are not a detour. They are my competitive advantage.",
  "I am building something that will outlast me — for my family, my family, my family, and every generation after.",
  "The red carpet on August 5th is not an arrival. It is a beginning.",
  "I am a woman of faith, a grandmother, a clinician, a defender. All of it counts. All of it matters.",
  "Remote, flexible, and fully compensated — the right role already exists and is looking for me.",
  "I do not shrink to fit job descriptions. I expand organizations to fit my vision.",
  "Caregiving and career excellence are not in conflict. I am proof that both can coexist.",
  "My mother's care is covered. My children are thriving. My work is meaningful. This is the life I built.",
  "I walk into every room — virtual or in-person — as the most prepared person there.",
  "Black Hat. DEF CON. WiCyS. FBI Citizens Academy. I move in rooms that matter.",
  "My expertise is rare. My story is powerful. My time is now.",
  "I am not waiting for permission. I am the permission.",
  "Every morning I wake up is another day to get closer to the life I declared.",
  "The Digital First Responder methodology is my intellectual property and my legacy.",
  "I am deeply rooted — like a forest — and I cannot be moved by uncertainty or delay.",
  "Milwaukee is a season of love and service. Atlanta is home. The remote world is my office.",
  "I answer to God first, family second, and mission always. Everything else follows.",
  "I log wins, not complaints. I build momentum, not excuses.",
  "The organization that hires me will wonder how they ever operated without me.",
  "I am healthy, protected, purposeful, and covered. This is my declaration.",
  "Setbacks are data. I analyze them, adjust, and keep moving forward.",
  "I am the kind of woman who builds a lab, walks a red carpet, and tucks in her grandkids — all in the same week.",
  "Every cert I earn, every scenario I build, every person I mentor — it compounds.",
  "I am a Digital First Responder. I assess. I contain. I treat. I recover. Always.",
];

const ROUTINE_DEFAULT = {
  Mon:[
    {time:"",title:"Morning Tea + Affirmation ☕📖",cal:"routine"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"Learning — HackTheBox / TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Tue:[
    {time:"",title:"Morning Tea + Affirmation ☕📖",cal:"routine"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"Learning — HackTheBox / TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Wed:[
    {time:"",title:"Morning Tea + Affirmation ☕📖",cal:"routine"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"Learning — HackTheBox / TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Thu:[
    {time:"",title:"Morning Tea + Affirmation ☕📖",cal:"routine"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"Learning — HackTheBox / TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Fri:[
    {time:"",title:"Morning Tea + Affirmation ☕📖",cal:"routine"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"Learning — HackTheBox / TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Sat:[
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  Sun:[
    {time:"6:00 PM",title:"Exercise 30 min 🏃‍♀️",cal:"health"},
    {time:"",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
};

// Real date helpers — everything below reads the ACTUAL current date,
// never a pinned snapshot, so Today/Weekly never go stale again.
function todayKey(){ return new Date().toLocaleDateString("en-US",{weekday:"short"}); }
function weekDates(){
  // Monday-start week containing today, as real Date objects.
  const now=new Date();
  const dow=now.getDay(); // 0=Sun..6=Sat
  const mondayOffset=dow===0?-6:1-dow;
  const monday=new Date(now);
  monday.setDate(now.getDate()+mondayOffset);
  return DAY_LABELS_7.map((_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d;});
}
function fmtShortDate(d){ return d.toLocaleDateString("en-US",{month:"short",day:"numeric"}); }

const CAL_COLORS={routine:C.olive,health:C.crimson,family:C.gold,growth:C.forest,finance:C.olive,special:C.ink,birthday:C.burnt};
const BLACK_HAT=new Date("2026-08-05T09:00:00");
const STORE="ccd_hq_v4";

const defaultData=()=>({
  weeklyFocus:"Land remote healthcare cyber role before Milwaukee move",
  weeklyGoals:["Send 5 Black Hat outreach messages","Complete WiCyS mentor onboarding Jun 8–9","AWS or TryHackMe every day"],
  tasks:[
    {id:1,text:"Send Philips intro via Aví D.",done:false},
    {id:2,text:"Update DFR Lab with new IoMT scenario",done:false},
    {id:3,text:"Confirm Black Hat travel + hotel",done:false},
    {id:4,text:"Pack & prep for Milwaukee mid-June",done:false},
    {id:5,text:"File WOSB certification follow-up",done:false},
  ],
  currentRead:"Microsoft SC-900 (voucher in hand) — Security+ shelved until income allows",
  readStatus:"reading",
  weeklyWins:["Advisory council → full outreach playbook built","DFR Lab live on GitHub Pages"],
  reflection:"",
  routine:defaultRoutine(),
  habits:{
    exercise:{label:"Exercise (30 min)",icon:"🏃‍♀️",days:[false,false,false,false,false,false,false]},
    affirmation:{label:"Daily Affirmation",icon:"📖",days:[false,false,false,false,false,false,false]},
    learning:{label:"AWS / TryHackMe",icon:"💻",days:[false,false,false,false,false,false,false]},
    water:{label:"Water Goal",icon:"💧",days:[false,false,false,false,false,false,false]},
    bedtime:{label:"Bedtime Routine (CPAP)",icon:"😴",days:[false,false,false,false,false,false,false]},
  },
  quarterlyGoals:{
    career:["Land FTE or contract remote role with benefits","Send 25 targeted org outreach messages","Black Hat red carpet Aug 5"],
    health:["Exercise 5x/week","CPAP compliance every night","O2 monitoring daily"],
    finance:["Purchase own health benefits if no FTE","Track every dollar Jun–Aug","Build 1-month emergency buffer"],
    personal:["Support Mom's dementia care transition","Milwaukee move mid-June","my family, my family & my family quality time"],
  },
  quarterlyWins:[],
  debtPaid:0, debtGoal:5000,
  savingsAmount:0, savingsGoal:3000,
  netWorth:0,
  monthlyReflection:{wins:"",challenge:"",grateful:"",learned:"",health:"",growth:"",different:"",intention:""},
  lifeVision:"To become the most recognized Digital First Responder in healthcare cybersecurity — protecting patients, empowering clinicians, and building generational wealth that blesses my family for decades.",
  nonNegotiables:["God First — always","Family is the mission","Health is wealth","Build something that outlasts me"],
  yearlyFocus:["Land remote healthcare cyber role","Walk the Black Hat red carpet","SC-900 certification","WOSB certification complete","Support Mom's care transition","Build DFR into recognizable IP"],
  focusBuckets:[
    {title:"Wellness — Mind, Body & Soul",items:["Daily affirmation","30 min exercise","CPAP + O2 every night","Water goal daily"]},
    {title:"Wealth ERA",items:["Remote role with benefits","Federal sub-contracting pipeline","3-tier consulting services live","Savings buffer growing"]},
    {title:"Personal Power",items:["Black Hat red carpet Aug 5","WiCyS mentor cohort 3","SC-900 study plan","DFR Lab expanding"]},
    {title:"Legacy & Love",items:["Mom's care covered","my family, my family & my family thriving","WOSB certified","PhD deferred — not abandoned"]},
  ],
  bucketList:[
    {text:"Walk the Black Hat red carpet 🎬",done:true},
    {text:"Keynote a major cybersecurity conference",done:false},
    {text:"Publish a book on Digital First Response methodology",done:false},
    {text:"Take my family to her first college campus tour",done:false},
    {text:"Travel to West Africa (Ghana / Senegal)",done:false},
    {text:"Own a home outright",done:false},
    {text:"See my family go viral for something he built",done:false},
    {text:"Launch a healthcare cybersecurity nonprofit",done:false},
    {text:"Get on stage at DEF CON as a speaker",done:false},
    {text:"Retire my mother comfortably",done:false},
  ],
  visionBoard:[
    {emoji:"🏠",label:"Dream Home",desc:"Paid off. Peaceful. Space for family."},
    {emoji:"🎤",label:"Keynote Stage",desc:"DEF CON. Black Hat. TEDx."},
    {emoji:"✈️",label:"Ghana / Senegal",desc:"Heritage trip with the grandkids."},
    {emoji:"📚",label:"Published Author",desc:"Digital First Responder: The Book"},
    {emoji:"💼",label:"Remote Dream Role",desc:"Healthcare Cyber SME. Benefits. Flexibility."},
    {emoji:"🎓",label:"PhD Complete",desc:"Capitol Technology University."},
    {emoji:"👑",label:"Generational Wealth",desc:"Building something that outlasts me."},
    {emoji:"🏥",label:"Nonprofit Launched",desc:"Healthcare Cybersecurity for underserved orgs."},
  ],
  ideasParking:[],
  savedBriefing:"",
  lastBriefingDate:"",
  gymLog:[],
  lifeSystems:defaultLifeSystems(),
  outreach:[],
  blackHatEvents:defaultBlackHatEvents(),
  claudeLog:[],
});

function defaultRoutine(){
  // Deep clone so each user's edits never mutate the shared template.
  return JSON.parse(JSON.stringify(ROUTINE_DEFAULT));
}

function defaultBlackHatEvents(){
  return [
    {id:1,name:"Midnight in the War Room — Semperis Premiere",date:"2026-08-05",location:"Black Hat USA, Las Vegas",status:"confirmed",notes:"Featured Defender · red carpet"},
    {id:2,name:"Guidepoint",date:"",location:"Black Hat USA",status:"confirmed",notes:""},
    {id:3,name:"GreyNoise NoiseFest",date:"",location:"Black Hat USA",status:"confirmed",notes:""},
    {id:4,name:"Arcova Cyber Lounge",date:"",location:"Black Hat USA",status:"confirmed",notes:""},
  ];
}

function defaultLifeSystems(){
  return{
    autoTransfers:[
      {id:1,label:"T1 → T2 · LLC Operating → Marcus (protection)",active:false},
      {id:2,label:"T2 → T3 · Marcus → Apple Card HYSA",active:false},
      {id:3,label:"T3 → T4 · Apple Card → Navy Federal Roth IRA",active:false},
      {id:4,label:"T4 → T5 · Navy Federal → Fidelity brokerage",active:false},
    ],
    subscriptions:[],
    lastAuditDate:"",
    meals:["","","","","","",""],
    groceryList:[],
    returns:[],
    exerciseSchedule:[
      {time:"6:00 PM",type:"30 min movement"},
      {time:"6:00 PM",type:"30 min movement"},
      {time:"6:00 PM",type:"30 min movement"},
      {time:"6:00 PM",type:"30 min movement"},
      {time:"6:00 PM",type:"30 min movement"},
      {time:"6:00 PM",type:"30 min movement"},
      {time:"",type:"Rest"},
    ],
  };
}

function loadData(){
  try{
    const r=localStorage.getItem(STORE);
    if(r){
      const saved=JSON.parse(r);
      // Deep-merge lifeSystems & routine specifically so new sub-fields
      // never get wiped out by an older saved shape.
      return{
        ...defaultData(),...saved,
        lifeSystems:{...defaultLifeSystems(),...(saved.lifeSystems||{})},
        routine:{...defaultRoutine(),...(saved.routine||{})},
      };
    }
  }catch{}
  return defaultData();
}
function saveData(d){try{localStorage.setItem(STORE,JSON.stringify(d));}catch{}}

// ── CROSS-DEVICE SYNC ───────────────────────────────────────────────────────────
// Talks to /api/store.js (Vercel Function + Blob storage). Local storage stays
// as the instant, offline-safe cache; the remote store is the source of truth
// that lets Mac / iPad / iPhone agree with each other.
const SYNC_KEY = import.meta.env.VITE_CCD_HQ_KEY || "";
async function fetchRemote(){
  if(!SYNC_KEY) return null;
  try{
    const res=await fetch(`/api/store?key=${encodeURIComponent(SYNC_KEY)}`);
    if(!res.ok) return null;
    const json=await res.json();
    return json.data||null;
  }catch{ return null; }
}
async function pushRemote(data){
  if(!SYNC_KEY) return false;
  try{
    const res=await fetch(`/api/store?key=${encodeURIComponent(SYNC_KEY)}`,{
      method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),
    });
    return res.ok;
  }catch{ return false; }
}

function useFadeIn(dep){
  const [v,setV]=useState(false);
  useEffect(()=>{setV(false);const t=setTimeout(()=>setV(true),40);return()=>clearTimeout(t);},[dep]);
  return v;
}

const card=(x={})=>({background:C.paper,border:`1.5px solid ${C.mist}`,borderRadius:14,padding:20,boxShadow:`0 2px 16px ${C.shadow}`,...x});
const ST={fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:C.forest,fontWeight:700,marginBottom:14};
const LB={fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:C.olive,fontWeight:700,marginBottom:6,display:"block",fontFamily:"'DM Mono',monospace"};
const INP={width:"100%",padding:"8px 12px",border:`1.5px solid ${C.mist}`,borderRadius:8,fontFamily:"'DM Sans',Helvetica,Arial,sans-serif",fontSize:14,color:C.ink,background:C.cream,outline:"none",boxSizing:"border-box"};
const BTN=(bg=C.forest,x={})=>({background:bg,color:bg===C.cream?C.forest:"#fff",border:"none",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',Helvetica,Arial,sans-serif",fontWeight:600,transition:"all 0.18s",...x});

const TABS=["🌿 Today","📅 Weekly","🌙 Monthly","🌾 Quarterly","🦅 Yearly","✅ Habits","🗺️ Vision Board","🪣 Bucket List","⚙️ Life Systems","💼 Jobs","🎯 Outreach","🎬 Black Hat"];
const DAY_LABELS_7=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
function Countdown(){
  const [t,setT]=useState({d:0,h:0,m:0,s:0});
  useEffect(()=>{
    const tick=()=>{
      const diff=BLACK_HAT-new Date();
      if(diff<=0)return;
      setT({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[]);
  return(
    <div style={{background:`linear-gradient(135deg,${C.ink},#1a3020)`,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gold}40`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:C.crimson,boxShadow:`0 0 0 0 ${C.crimson}80`,animation:"pulseDot 1.8s ease-out infinite",flexShrink:0}}/>
        <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700}}>🎬 BLACK HAT USA · SEMPERIS PREMIERE · AUGUST 5 2026</div>
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[["DAYS",t.d],["HRS",t.h],["MIN",t.m],["SEC",t.s]].map(([l,v])=>(
          <div key={l} style={{textAlign:"center",background:"rgba(217,146,1,0.12)",border:`1px solid ${C.gold}30`,borderRadius:10,padding:"10px 14px",minWidth:58}}>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,fontWeight:900,color:C.gold,lineHeight:1}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",color:"#a0b890",marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#a0b890",marginTop:10,fontStyle:"italic"}}>You are a Featured Defender. The red carpet is waiting. 🌹</div>
    </div>
  );
}

// ── AFFIRMATION ────────────────────────────────────────────────────────────────
function Affirmation(){
  const base=Math.floor(Date.now()/86400000)%AFFIRMATIONS.length;
  const [idx,setIdx]=useState(base);
  const [op,setOp]=useState(1);
  const go=(dir)=>{setOp(0);setTimeout(()=>{setIdx(i=>(i+dir+AFFIRMATIONS.length)%AFFIRMATIONS.length);setOp(1);},280);};
  return(
    <div style={{background:`linear-gradient(135deg,${C.forest},#2d5c36)`,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.olive}40`}}>
      <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>✨ Today's Affirmation</div>
      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,color:C.cream,lineHeight:1.75,fontStyle:"italic",minHeight:68,opacity:op,transition:"opacity 0.28s"}}>"{AFFIRMATIONS[idx]}"</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
        <span style={{fontSize:11,color:"#a0b890"}}>{idx+1}/{AFFIRMATIONS.length}</span>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>go(-1)} style={{...BTN("rgba(255,255,255,0.1)"),padding:"4px 12px",color:C.cream,fontSize:15}}>‹</button>
          <button onClick={()=>go(1)} style={{...BTN(C.gold),padding:"4px 12px",fontSize:15}}>›</button>
        </div>
      </div>
    </div>
  );
}

// ── AI BRIEFING ────────────────────────────────────────────────────────────────
function Briefing({data,onSave}){
  const [text,setText]=useState(data.savedBriefing||"");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const today=new Date().toDateString();
  const days=Math.floor((BLACK_HAT-new Date())/86400000);
  const pending=data.tasks.filter(t=>!t.done);

  const dayKey=todayKey();
  const todaysEvents=data.routine[dayKey]||[];
  const routineLine=todaysEvents.length
    ? todaysEvents.map(e=>`${e.time||"flexible"} ${e.title}`).join(", ")
    : "open day — no fixed routine logged";

  const gen=useCallback(async()=>{
    setLoading(true);setErr("");
    try{
      const prompt=`You are the personal AI assistant for Chaunda C. Dallas — healthcare cybersecurity strategist, Digital First Responder, grandmother, woman of faith. Generate her personalized morning briefing for today.

Context:
- 28 years clinical emergency medicine, now cybersecurity
- Featured Defender in Semperis "Midnight in the War Room" premiering Black Hat Aug 5 — ${days} days away
- WiCyS Technical Mentor, Cohort 3 (ongoing)
- Relocating to Milwaukee mid-July 2026 for mother's dementia care
- Grandson my family, granddaughter my family (7th grade multi-sport athlete)
- Weekly focus: "${data.weeklyFocus}"
- Pending tasks (${pending.length}): ${pending.map(t=>t.text).join(", ")||"all clear"}
- Currently studying: ${data.currentRead}
- Today's routine: ${routineLine}

Write her morning briefing in exactly 4 sections:
1. 🌅 GOOD MORNING — faith-forward personal greeting (2 sentences max)
2. 🎯 TODAY'S MISSION — top 3 specific priorities for today
3. 📅 ON YOUR RADAR — 2-3 upcoming milestones (Black Hat countdown, Milwaukee, WiCyS)
4. 💪 YOUR WORD TODAY — one powerful sentence that speaks to where she is right now

Tone: warm, direct, faith-informed, no fluff. Every word earns its place.`;

      const res=await fetch(`/api/briefing?key=${encodeURIComponent(SYNC_KEY)}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt}),
      });
      const json=await res.json();
      const t=json.content?.[0]?.text||"Unable to generate.";
      setText(t);onSave(t,today);
    }catch(e){setErr("Connection error. Try again.");}
    setLoading(false);
  },[data,days,pending]);

  return(
    <div style={{...card(),background:`linear-gradient(160deg,#0e1e12,${C.forest})`,border:`1px solid ${C.gold}30`,color:C.cream}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700}}>☀️ AI Morning Briefing</div>
          <div style={{fontSize:12,color:"#a0b890",marginTop:2}}>Powered by Claude · Personal to you</div>
        </div>
        <button onClick={gen} disabled={loading} style={{...BTN(C.gold),opacity:loading?0.7:1,display:"flex",alignItems:"center",gap:6}}>
          {loading?<><span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> Generating…</>:(text?"🔄 Regenerate":"✨ Generate My Briefing")}
        </button>
      </div>
      {err&&<div style={{background:"rgba(224,92,92,0.2)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#ffaaaa",marginBottom:12}}>{err}</div>}
      {!text&&!loading&&(
        <div style={{textAlign:"center",padding:"24px",opacity:0.5}}>
          <div style={{fontSize:28,marginBottom:6}}>☀️</div>
          <div style={{fontSize:13,fontStyle:"italic",color:"#a0b890"}}>Hit Generate to start your day with intention.</div>
        </div>
      )}
      {loading&&(
        <div style={{textAlign:"center",padding:"24px"}}>
          <div style={{display:"flex",justifyContent:"center",gap:6}}>
            {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:C.gold,animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
          </div>
          <div style={{fontSize:12,color:"#a0b890",marginTop:10,fontStyle:"italic"}}>Preparing your briefing…</div>
        </div>
      )}
      {text&&!loading&&<div style={{fontFamily:"'DM Sans',Helvetica,Arial,sans-serif",fontSize:14,lineHeight:1.85,color:C.cream,whiteSpace:"pre-wrap",borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:14}}>{text}</div>}
    </div>
  );
}

// ── HABIT TRACKER (Casey-style) ────────────────────────────────────────────────
function HabitTracker({data,update}){
  const dayLabels=["T","F","Sa","Su","M","T","W"];
  const todayIdx=0;
  const allChecks=Object.values(data.habits).reduce((a,h)=>a+h.days.filter(Boolean).length,0);
  const totalChecks=Object.keys(data.habits).length*7;
  const score=Math.round((allChecks/totalChecks)*100);

  const toggle=(habit,i)=>{
    const h={...data.habits,[habit]:{...data.habits[habit],days:[...data.habits[habit].days]}};
    h[habit].days[i]=!h[habit].days[i];
    update({habits:h});
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:20,maxWidth:800}}>
      <div style={{...card(),background:`linear-gradient(120deg,${C.olive},${C.forest})`,color:"#fff",border:"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:20,fontWeight:700}}>Habit Tracker</div>
            <div style={{fontSize:12,opacity:0.75,marginTop:2}}>Week of Jun 4 · {allChecks}/{totalChecks} completions</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:32,fontWeight:900,color:C.gold}}>{score}%</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em"}}>WEEKLY SCORE</div>
          </div>
        </div>
        <div style={{height:6,background:"rgba(255,255,255,0.15)",borderRadius:99,overflow:"hidden",marginTop:12}}>
          <div style={{height:"100%",width:`${score}%`,background:`linear-gradient(90deg,${C.gold},#f0b429)`,borderRadius:99,transition:"width 0.6s ease"}}/>
        </div>
      </div>

      <div style={card()}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#999",fontWeight:700,marginBottom:14}}>Daily Habits</div>
        {/* Date row */}
        <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
          <div style={{flex:1}}/>
          <div style={{display:"flex",gap:6,marginRight:4}}>
            {[4,5,6,7,8,9,10].map((d,i)=>(
              <div key={i} style={{width:34,height:34,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                background:i===0?C.forest:"transparent",
                border:i===0?`none`:`1.5px solid ${C.mist}`,
              }}>
                <div style={{fontSize:9,color:i===0?"#fff":"#aaa",letterSpacing:"0.05em"}}>{dayLabels[i]}</div>
                <div style={{fontSize:12,fontWeight:700,color:i===0?"#fff":C.ink}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        {Object.entries(data.habits).map(([key,habit])=>{
          const done=habit.days.filter(Boolean).length;
          return(
            <div key={key} style={{marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${C.mist}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:18}}>{habit.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,color:C.ink,fontWeight:600}}>{habit.label}</div>
                  <div style={{height:3,background:C.mist,borderRadius:99,overflow:"hidden",marginTop:4}}>
                    <div style={{height:"100%",width:`${(done/7)*100}%`,background:`linear-gradient(90deg,${C.olive},${C.gold})`,borderRadius:99,transition:"width 0.4s ease"}}/>
                  </div>
                </div>
                <div style={{fontSize:12,color:C.olive,fontWeight:700,minWidth:28,textAlign:"right"}}>{done}/5</div>
              </div>
              <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                {habit.days.map((checked,i)=>(
                  <div key={i} onClick={()=>toggle(key,i)} style={{
                    width:34,height:34,borderRadius:8,cursor:"pointer",
                    background:checked?`linear-gradient(135deg,${C.olive},${C.gold})`:"transparent",
                    border:`1.5px solid ${checked?C.olive:C.mist}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:14,transition:"all 0.18s",transform:checked?"scale(1.05)":"scale(1)",
                  }}>{checked&&<span style={{color:"#fff",fontSize:13,fontWeight:700}}>✓</span>}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── LIFE SYSTEMS ────────────────────────────────────────────────────────────────
function LifeSystems({data,update}){
  const ls=data.lifeSystems;
  const [subName,setSubName]=useState("");
  const [subAmt,setSubAmt]=useState("");
  const [retItem,setRetItem]=useState("");
  const [retStore,setRetStore]=useState("");
  const [retDeadline,setRetDeadline]=useState("");
  const [groceryItem,setGroceryItem]=useState("");

  const patch=(p)=>update({lifeSystems:{...ls,...p}});

  const toggleTransfer=(id)=>patch({autoTransfers:ls.autoTransfers.map(t=>t.id===id?{...t,active:!t.active}:t)});

  const addSub=()=>{
    if(!subName.trim())return;
    patch({subscriptions:[...ls.subscriptions,{id:Date.now(),name:subName,amount:+subAmt||0}]});
    setSubName("");setSubAmt("");
  };
  const removeSub=(id)=>patch({subscriptions:ls.subscriptions.filter(s=>s.id!==id)});
  const markAudited=()=>patch({lastAuditDate:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})});
  const monthlySubTotal=ls.subscriptions.reduce((a,s)=>a+(+s.amount||0),0);

  const setMeal=(i,val)=>{const m=[...ls.meals];m[i]=val;patch({meals:m});};

  const addGrocery=()=>{if(!groceryItem.trim())return;patch({groceryList:[...ls.groceryList,{id:Date.now(),text:groceryItem,checked:false}]});setGroceryItem("");};
  const toggleGrocery=(id)=>patch({groceryList:ls.groceryList.map(g=>g.id===id?{...g,checked:!g.checked}:g)});
  const clearChecked=()=>patch({groceryList:ls.groceryList.filter(g=>!g.checked)});

  const addReturn=()=>{
    if(!retItem.trim())return;
    patch({returns:[...ls.returns,{id:Date.now(),item:retItem,store:retStore,deadline:retDeadline,done:false}]});
    setRetItem("");setRetStore("");setRetDeadline("");
  };
  const toggleReturn=(id)=>patch({returns:ls.returns.map(r=>r.id===id?{...r,done:!r.done}:r)});
  const removeReturn=(id)=>patch({returns:ls.returns.filter(r=>r.id!==id)});

  const daysUntil=(dateStr)=>{
    if(!dateStr)return null;
    return Math.ceil((new Date(dateStr)-new Date(new Date().toDateString()))/86400000);
  };

  const sortedReturns=[...ls.returns].sort((a,b)=>{
    if(a.done!==b.done)return a.done?1:-1;
    return (a.deadline||"").localeCompare(b.deadline||"");
  });

  const setExercise=(i,key,val)=>{const arr=ls.exerciseSchedule.map((e,idx)=>idx===i?{...e,[key]:val}:e);patch({exerciseSchedule:arr});};

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{...card(),background:`linear-gradient(120deg,${C.forest},${C.olive})`,color:"#fff",border:"none"}}>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>⚙️ Life Systems</div>
        <div style={{fontSize:13,opacity:0.85,marginTop:3}}>The parts of life on autopilot — so the hours go to studying, building, and Black Hat prep.</div>
      </div>

      {/* MONEY AUTOMATION — full width */}
      <div style={card()}>
        <div style={ST}>💰 Money Automation</div>
        <span style={LB}>5-Tier Auto-Transfer Setup</span>
        <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:16}}>
          {ls.autoTransfers.map(t=>(
            <div key={t.id} onClick={()=>toggleTransfer(t.id)} style={{display:"flex",gap:9,alignItems:"center",cursor:"pointer",padding:"8px 10px",borderRadius:8,background:t.active?"#eef6ef":C.cream}}>
              <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${t.active?C.olive:C.gold}`,background:t.active?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {t.active&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
              </div>
              <span style={{fontSize:13,color:t.active?C.forest:C.ink,fontWeight:t.active?600:400}}>{t.label}</span>
              <span style={{marginLeft:"auto",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:t.active?C.olive:"#aaa",fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{t.active?"AUTOMATED":"MANUAL"}</span>
            </div>
          ))}
        </div>

        <span style={LB}>Subscription Audit</span>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
          <span style={{fontSize:12,color:"#777"}}>Last audit: {ls.lastAuditDate||"Never"}</span>
          <button onClick={markAudited} style={{...BTN(C.cream),color:C.forest,border:`1.5px solid ${C.mist}`,fontSize:11}}>Mark Audited Today</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:9}}>
          {ls.subscriptions.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:7,background:C.cream}}>
              <span style={{fontSize:12,flex:1,color:C.ink}}>{s.name}</span>
              <span style={{fontSize:12,color:C.olive,fontWeight:700}}>${(+s.amount).toFixed(2)}/mo</span>
              <span onClick={()=>removeSub(s.id)} style={{cursor:"pointer",color:"#bbb",fontSize:14,padding:"0 4px"}}>✕</span>
            </div>
          ))}
          {ls.subscriptions.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>No subscriptions logged yet.</div>}
        </div>
        <div style={{display:"flex",gap:6,marginBottom:8}}>
          <input value={subName} onChange={e=>setSubName(e.target.value)} placeholder="Subscription name…" style={{...INP,flex:2,fontSize:12}}/>
          <input value={subAmt} onChange={e=>setSubAmt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()} type="number" placeholder="$/mo" style={{...INP,flex:1,fontSize:12}}/>
          <button onClick={addSub} style={BTN(C.forest)}>+</button>
        </div>
        {ls.subscriptions.length>0&&<div style={{fontSize:12,color:C.forest,fontWeight:700,textAlign:"right"}}>Monthly total: ${monthlySubTotal.toFixed(2)}</div>}
      </div>

      {/* MEAL ROTATION · GROCERY LIST · EXERCISE SCHEDULE — 3-up, wraps on mobile */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>

        <div style={card()}>
          <div style={ST}>🍽️ Meal Rotation</div>
          <span style={LB}>Fixed 7-Day Cycle — Kill the Daily Decision</span>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {DAY_LABELS_7.map((d,i)=>(
              <div key={d} style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:11,color:C.olive,fontWeight:700,minWidth:34,fontFamily:"'DM Mono',monospace"}}>{d}</span>
                <input value={ls.meals[i]} onChange={e=>setMeal(i,e.target.value)} placeholder="Meal…" style={{...INP,fontSize:12,padding:"6px 10px"}}/>
              </div>
            ))}
          </div>
        </div>

        <div style={card()}>
          <div style={ST}>🛒 Grocery List</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10,maxHeight:220,overflowY:"auto"}}>
            {ls.groceryList.map(g=>(
              <div key={g.id} onClick={()=>toggleGrocery(g.id)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"6px 9px",borderRadius:7,background:g.checked?"#edf7ed":C.cream}}>
                <div style={{width:16,height:16,borderRadius:5,border:`2px solid ${g.checked?C.olive:C.gold}`,background:g.checked?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {g.checked&&<span style={{color:"#fff",fontSize:10}}>✓</span>}
                </div>
                <span style={{fontSize:12,color:g.checked?"#888":C.ink,textDecoration:g.checked?"line-through":"none"}}>{g.text}</span>
              </div>
            ))}
            {ls.groceryList.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>List is empty — add your staples below.</div>}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>
            <input value={groceryItem} onChange={e=>setGroceryItem(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addGrocery()} placeholder="Add item…" style={{...INP,flex:1,fontSize:12}}/>
            <button onClick={addGrocery} style={BTN(C.forest)}>+</button>
          </div>
          {ls.groceryList.some(g=>g.checked)&&<button onClick={clearChecked} style={{...BTN(C.cream),color:C.forest,border:`1.5px solid ${C.mist}`,fontSize:11,width:"100%"}}>Clear Checked</button>}
        </div>

        <div style={card()}>
          <div style={ST}>🏃‍♀️ Exercise Schedule</div>
          <span style={LB}>Fixed Weekly Block — No Daily Negotiation</span>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {DAY_LABELS_7.map((d,i)=>(
              <div key={d} style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:11,color:C.olive,fontWeight:700,minWidth:34,fontFamily:"'DM Mono',monospace"}}>{d}</span>
                <input value={ls.exerciseSchedule[i].time} onChange={e=>setExercise(i,"time",e.target.value)} placeholder="Time…" style={{...INP,fontSize:12,padding:"6px 8px",flex:0.9}}/>
                <input value={ls.exerciseSchedule[i].type} onChange={e=>setExercise(i,"type",e.target.value)} placeholder="Type / Rest…" style={{...INP,fontSize:12,padding:"6px 8px",flex:1.3}}/>
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:"#999",marginTop:9,fontStyle:"italic"}}>Daily completion still lives in ✅ Habits — this is just the weekly template.</div>
        </div>

      </div>

      {/* RETURNS TRACKER — full width */}
      <div style={card()}>
        <div style={ST}>📦 Returns Tracker</div>
        <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:12}}>
          {sortedReturns.map(r=>{
            const dLeft=daysUntil(r.deadline);
            const overdue=!r.done&&dLeft!==null&&dLeft<0;
            const soon=!r.done&&dLeft!==null&&dLeft>=0&&dLeft<=3;
            return(
              <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,background:r.done?"#edf7ed":C.cream,borderLeft:`3px solid ${r.done?C.olive:overdue?C.crimson:soon?C.gold:C.mist}`}}>
                <div onClick={()=>toggleReturn(r.id)} style={{width:18,height:18,borderRadius:5,border:`2px solid ${r.done?C.olive:C.gold}`,background:r.done?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                  {r.done&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
                </div>
                <div style={{flex:1}}>
                  <span style={{fontSize:13,color:r.done?"#888":C.ink,textDecoration:r.done?"line-through":"none",fontWeight:600}}>{r.item}</span>
                  {r.store&&<span style={{fontSize:11,color:"#999"}}> · {r.store}</span>}
                </div>
                {r.deadline&&!r.done&&(
                  <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:overdue?C.crimson:soon?C.burnt:C.olive,fontFamily:"'DM Mono',monospace"}}>
                    {overdue?"OVERDUE":dLeft===0?"DUE TODAY":`${dLeft}D LEFT`}
                  </span>
                )}
                <span onClick={()=>removeReturn(r.id)} style={{cursor:"pointer",color:"#bbb",fontSize:14,padding:"0 4px"}}>✕</span>
              </div>
            );
          })}
          {ls.returns.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>Bin's empty — nothing pending return.</div>}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <input value={retItem} onChange={e=>setRetItem(e.target.value)} placeholder="Item…" style={{...INP,flex:2,fontSize:12,minWidth:120}}/>
          <input value={retStore} onChange={e=>setRetStore(e.target.value)} placeholder="Store…" style={{...INP,flex:1,fontSize:12,minWidth:90}}/>
          <input value={retDeadline} onChange={e=>setRetDeadline(e.target.value)} type="date" style={{...INP,flex:1,fontSize:12,minWidth:130}}/>
          <button onClick={addReturn} style={BTN(C.forest)}>+</button>
        </div>
      </div>

    </div>
  );
}

// ── ROUTINE EDITOR (shared source of truth for Today + Weekly) ─────────────────
function RoutineEditor({data,update}){
  const dates=weekDates();
  const tKey=todayKey();
  const addEvent=(day)=>update({routine:{...data.routine,[day]:[...data.routine[day],{time:"",title:"",cal:"routine"}]}});
  const updateEvent=(day,idx,key,val)=>{
    const list=data.routine[day].map((e,i)=>i===idx?{...e,[key]:val}:e);
    update({routine:{...data.routine,[day]:list}});
  };
  const removeEvent=(day,idx)=>update({routine:{...data.routine,[day]:data.routine[day].filter((_,i)=>i!==idx)}});

  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
      {DAY_LABELS_7.map((day,i)=>(
        <div key={day} style={{...card({padding:14}),background:day===tKey?`${C.forest}0d`:C.paper,border:day===tKey?`2px solid ${C.forest}`:`1.5px solid ${C.mist}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
            <span style={{fontSize:13,fontWeight:700,color:C.forest,fontFamily:"'DM Mono',monospace"}}>{day}{day===tKey?" · today":""}</span>
            <span style={{fontSize:11,color:"#999"}}>{fmtShortDate(dates[i])}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:8}}>
            {data.routine[day].map((ev,idx)=>(
              <div key={idx} style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                <input value={ev.time} onChange={e=>updateEvent(day,idx,"time",e.target.value)} placeholder="Time" style={{...INP,fontSize:11,padding:"5px 7px",flex:"0.8 1 60px"}}/>
                <input value={ev.title} onChange={e=>updateEvent(day,idx,"title",e.target.value)} placeholder="What…" style={{...INP,fontSize:11,padding:"5px 7px",flex:"1.6 1 100px"}}/>
                <select value={ev.cal} onChange={e=>updateEvent(day,idx,"cal",e.target.value)} style={{...INP,fontSize:10,padding:"5px 3px",flex:"0.9 1 70px"}}>
                  {Object.keys(CAL_COLORS).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <span onClick={()=>removeEvent(day,idx)} style={{cursor:"pointer",color:"#bbb",fontSize:13}}>✕</span>
              </div>
            ))}
            {data.routine[day].length===0&&<div style={{fontSize:11,color:"#999",fontStyle:"italic"}}>Nothing set.</div>}
          </div>
          <button onClick={()=>addEvent(day)} style={{...BTN(C.cream),color:C.forest,border:`1.5px solid ${C.mist}`,fontSize:11,width:"100%"}}>+ Add</button>
        </div>
      ))}
    </div>
  );
}

function ClaudeLog({data,update}){
  const [entry,setEntry]=useState("");
  const add=()=>{
    if(!entry.trim())return;
    const today=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
    update({claudeLog:[{date:today,text:entry},...data.claudeLog]});
    setEntry("");
  };
  const copyLatest=()=>{
    if(data.claudeLog.length===0)return;
    navigator.clipboard.writeText(`Continuing from ${data.claudeLog[0].date}: ${data.claudeLog[0].text}`);
  };
  return(
    <div style={card()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={ST}>🧵 Continue With Claude</div>
        {data.claudeLog.length>0&&<button onClick={copyLatest} style={{...BTN(C.cream),color:C.forest,border:`1.5px solid ${C.mist}`,fontSize:11}}>📋 Copy Latest</button>}
      </div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        <input value={entry} onChange={e=>setEntry(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="Where'd you leave off? What's next?" style={{...INP,flex:1,fontSize:13}}/>
        <button onClick={add} style={BTN(C.forest)}>+</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:180,overflowY:"auto"}}>
        {data.claudeLog.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>Log your last Claude session here so the next chat picks up instantly.</div>}
        {data.claudeLog.map((e,i)=>(
          <div key={i} style={{padding:"7px 10px",borderRadius:7,background:C.cream,fontSize:12,borderLeft:`3px solid ${C.gold}`}}>
            <span style={{color:C.olive,fontWeight:700}}>{e.date}</span> — {e.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState(0);
  const [data,setData]=useState(loadData);
  const [newTask,setNewTask]=useState("");
  const [newWin,setNewWin]=useState("");
  const [newBucket,setNewBucket]=useState("");
  const [newIdea,setNewIdea]=useState("");
  const [newVision,setNewVision]=useState({emoji:"✨",label:"",desc:""});
  const [newOutreach,setNewOutreach]=useState({company:"",lane:"Healthcare SME",contact:"",status:"Not Started"});
  const [newEvent,setNewEvent]=useState({name:"",date:"",location:"",status:"tentative",notes:""});
  const [showVAdd,setShowVAdd]=useState(false);
  const [syncStatus,setSyncStatus]=useState(SYNC_KEY?"checking":"local-only");
  const didMount=useRef(false);
  const visible=useFadeIn(tab);

  const update=useCallback((patch)=>{
    setData(prev=>{const next={...prev,...patch};saveData(next);return next;});
  },[]);

  // Pull the remote copy once on load — whichever device opens first this
  // session adopts the shared state instead of a stale local snapshot.
  useEffect(()=>{
    if(!SYNC_KEY) return;
    let cancelled=false;
    (async()=>{
      const remote=await fetchRemote();
      if(cancelled) return;
      if(remote){
        const merged={...defaultData(),...remote,lifeSystems:{...defaultLifeSystems(),...(remote.lifeSystems||{})},routine:{...defaultRoutine(),...(remote.routine||{})}};
        setData(merged);saveData(merged);
        setSyncStatus("synced");
      }else{
        setSyncStatus("local-only");
      }
    })();
    return ()=>{cancelled=true;};
  },[]);

  // Push local changes to the shared store, debounced so typing doesn't
  // fire a request per keystroke.
  useEffect(()=>{
    if(!SYNC_KEY) return;
    if(!didMount.current){didMount.current=true;return;}
    setSyncStatus("syncing");
    const t=setTimeout(async()=>{
      const ok=await pushRemote(data);
      setSyncStatus(ok?"synced":"offline");
    },1200);
    return ()=>clearTimeout(t);
  },[data]);

  const toggleTask=(id)=>update({tasks:data.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)});
  const addTask=()=>{if(!newTask.trim())return;update({tasks:[...data.tasks,{id:Date.now(),text:newTask,done:false}]});setNewTask("");};
  const addWin=()=>{if(!newWin.trim())return;update({weeklyWins:[...data.weeklyWins,newWin]});setNewWin("");};
  const toggleBucket=(i)=>{const b=[...data.bucketList];b[i]={...b[i],done:!b[i].done};update({bucketList:b});};
  const addBucketItem=()=>{if(!newBucket.trim())return;update({bucketList:[...data.bucketList,{text:newBucket,done:false}]});setNewBucket("");};
  const addIdea=()=>{if(!newIdea.trim())return;update({ideasParking:[...data.ideasParking,newIdea]});setNewIdea("");};
  const addVision=()=>{if(!newVision.label)return;update({visionBoard:[...data.visionBoard,{...newVision}]});setNewVision({emoji:"✨",label:"",desc:""});setShowVAdd(false);};
  const saveBriefing=(t,d)=>update({savedBriefing:t,lastBriefingDate:d});

  const addOutreach=()=>{
    if(!newOutreach.company.trim())return;
    update({outreach:[...data.outreach,{id:Date.now(),...newOutreach,lastTouch:""}]});
    setNewOutreach({company:"",lane:"Healthcare SME",contact:"",status:"Not Started"});
  };
  const updateOutreach=(id,key,val)=>update({outreach:data.outreach.map(o=>o.id===id?{...o,[key]:val}:o)});
  const removeOutreach=(id)=>update({outreach:data.outreach.filter(o=>o.id!==id)});

  const addEvent=()=>{
    if(!newEvent.name.trim())return;
    update({blackHatEvents:[...data.blackHatEvents,{id:Date.now(),...newEvent}]});
    setNewEvent({name:"",date:"",location:"",status:"tentative",notes:""});
  };
  const updateEvent=(id,key,val)=>update({blackHatEvents:data.blackHatEvents.map(e=>e.id===id?{...e,[key]:val}:e)});
  const removeEvent=(id)=>update({blackHatEvents:data.blackHatEvents.filter(e=>e.id!==id)});

  const SYNC_LABEL={checking:"⏳ Checking sync…",syncing:"⏳ Saving…",synced:"☁️ Synced",offline:"⚠️ Offline — saved locally","local-only":"📴 Local only — sync not configured"};

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.forest} 0%,#0E2415 40%,#0a1a0d 100%)`,fontFamily:"'DM Sans',Helvetica,Arial,sans-serif",color:C.ink}}>

      {/* HEADER */}
      <div style={{padding:"20px 20px 0",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:6}}>
          <div>
            <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700}}>Digital First Responder HQ</div>
            <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,color:C.cream,margin:"3px 0 2px",fontWeight:700,letterSpacing:"-0.02em"}}>Hey Chaunda ✦</h1>
            <div style={{fontSize:11,color:"#a0b890"}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
            <div style={{fontSize:10,color:syncStatus==="synced"?"#8fd19e":syncStatus==="offline"?"#e0a83e":"#a0b890",marginTop:4,fontFamily:"'DM Mono',monospace"}}>{SYNC_LABEL[syncStatus]}</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["🎬","Aug 5","Black Hat"],["🎓","Cohort 3","WiCyS"],["✈️","Mid-Jul","Milwaukee"]].map(([em,d,l])=>(
              <div key={l} style={{background:"rgba(217,146,1,0.15)",border:`1px solid ${C.gold}40`,borderRadius:10,padding:"7px 12px",textAlign:"center"}}>
                <div style={{fontSize:15}}>{em}</div>
                <div style={{fontSize:12,color:C.gold,fontWeight:700}}>{d}</div>
                <div style={{fontSize:9,color:"#a0b890",letterSpacing:"0.05em"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:2,marginTop:16,overflowX:"auto",paddingBottom:2,scrollbarWidth:"none"}}>
          {TABS.map((t,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{
              padding:"8px 13px",borderRadius:"9px 9px 0 0",border:"none",cursor:"pointer",
              background:tab===i?C.paper:"rgba(255,255,255,0.06)",
              color:tab===i?C.forest:"#a0b890",
              fontFamily:"'DM Sans',Helvetica,Arial,sans-serif",fontSize:12,fontWeight:tab===i?700:400,
              transition:"all 0.18s",whiteSpace:"nowrap",flexShrink:0,
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{background:C.mist,minHeight:"calc(100vh - 150px)",paddingBottom:60}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"22px 18px",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(12px)",transition:"all 0.32s cubic-bezier(0.4,0,0.2,1)"}}>

          {/* TODAY */}
          {tab===0&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <Countdown/>
                <Affirmation/>
              </div>
               <Briefing data={data} onSave={saveBriefing}/>
              <ClaudeLog data={data} update={update}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <div style={card()}>
                  <div style={ST}>📅 Today's Calendar</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {(data.routine[todayKey()]||[]).map((ev,i)=>(
                      <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 9px",borderRadius:7,background:C.cream,borderLeft:`3px solid ${CAL_COLORS[ev.cal]||C.olive}`}}>
                        <div style={{fontSize:10,color:C.olive,fontWeight:700,minWidth:60}}>{ev.time||"—"}</div>
                        <div style={{fontSize:12,color:C.ink}}>{ev.title}</div>
                      </div>
                    ))}
                    {(data.routine[todayKey()]||[]).length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>Nothing scheduled today.</div>}
                  </div>
                  <div style={{fontSize:10,color:"#999",marginTop:8,fontStyle:"italic"}}>✎ Edit any day's routine from the Weekly tab.</div>
                </div>
                <div style={card()}>
                  <div style={ST}>✅ Tasks</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:12}}>
                    {data.tasks.map(t=>(
                      <div key={t.id} onClick={()=>toggleTask(t.id)} style={{display:"flex",gap:8,alignItems:"center",cursor:"pointer",padding:"7px 9px",borderRadius:7,background:t.done?"#edf7ed":C.cream,transition:"all 0.15s"}}>
                        <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${t.done?C.olive:C.gold}`,background:t.done?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                          {t.done&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
                        </div>
                        <span style={{fontSize:12,color:t.done?"#888":C.ink,textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Add task…" style={{...INP,flex:1,fontSize:13}}/>
                    <button onClick={addTask} style={BTN(C.forest)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WEEKLY */}
          {tab===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              {/* Rotating quote bar — Casey style */}
              <div style={{...card({padding:"14px 20px"}),background:`linear-gradient(135deg,${C.forest},#2d5c36)`,border:"none",textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,color:C.cream,fontStyle:"italic"}}>
                  "{AFFIRMATIONS[Math.floor(Date.now()/86400000)%AFFIRMATIONS.length]}"
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <div style={card()}>
                  <div style={ST}>🎯 Weekly Focus</div>
                  <input value={data.weeklyFocus} onChange={e=>update({weeklyFocus:e.target.value})} style={INP}/>
                  <div style={{marginTop:14}}>
                    <span style={LB}>Goals This Week</span>
                    {data.weeklyGoals.map((g,i)=>(
                      <div key={i} style={{padding:"6px 10px",borderRadius:7,background:C.cream,marginBottom:5,fontSize:13,display:"flex",alignItems:"center",gap:8}}>
                        <span style={{color:C.gold}}>→</span>{g}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={card()}>
                  <div style={ST}>📚 Currently Studying</div>
                  <input value={data.currentRead} onChange={e=>update({currentRead:e.target.value})} style={INP}/>
                  <div style={{display:"flex",gap:6,marginTop:10}}>
                    {["reading","paused","completed"].map(s=>(
                      <button key={s} onClick={()=>update({readStatus:s})} style={{...BTN(data.readStatus===s?C.forest:C.cream),color:data.readStatus===s?"#fff":C.forest,border:`1.5px solid ${C.forest}`,flex:1,fontSize:11,textTransform:"capitalize"}}>{s}</button>
                    ))}
                  </div>
                  <div style={{marginTop:14}}>
                    <span style={LB}>Wins This Week 🏆</span>
                    {data.weeklyWins.map((w,i)=>(<div key={i} style={{padding:"5px 9px",borderRadius:6,background:"#f0faf0",marginBottom:5,fontSize:12,borderLeft:`3px solid ${C.olive}`}}>🎉 {w}</div>))}
                    <div style={{display:"flex",gap:6,marginTop:7}}>
                      <input value={newWin} onChange={e=>setNewWin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addWin()} placeholder="Log a win…" style={{...INP,flex:1,fontSize:12}}/>
                      <button onClick={addWin} style={BTN(C.gold)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Weekly routine — the single editable source of truth for Today + Weekly */}
              <div style={card()}>
                <div style={ST}>📆 Weekly Routine — {fmtShortDate(weekDates()[0])}–{fmtShortDate(weekDates()[6])}</div>
                <div style={{fontSize:11,color:"#999",marginBottom:12,fontStyle:"italic"}}>This is a recurring template, not a one-off calendar — edit any day, any time. Today's tab always pulls from here.</div>
                <RoutineEditor data={data} update={update}/>
              </div>
              <div style={card()}>
                <div style={ST}>💭 Reflection</div>
                <textarea value={data.reflection} onChange={e=>update({reflection:e.target.value})} rows={4} placeholder="What's on your mind? Gratitude, wins, thoughts…" style={{...INP,resize:"vertical",lineHeight:1.7}}/>
              </div>
            </div>
          )}

          {/* MONTHLY */}
          {tab===2&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...card(),gridColumn:"1/-1",background:`linear-gradient(120deg,${C.burnt},${C.gold})`,color:"#fff",border:"none"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>June 2026 — Monthly Reflection</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Consistency beats intensity. What does this month say about you?</div>
              </div>
              {[["wins","🏆 Biggest Wins","What are you celebrating?"],["challenge","💪 Biggest Challenge","Be honest."],["grateful","🙏 Most Grateful For","What showed up?"],["learned","💡 Most Important Lesson","What shifted?"],["health","❤️ Your Health This Month","Body & mind."],["growth","🌱 Growth","What expanded?"],["different","🔄 Do Differently","No judgment."],["intention","🌅 Intention Next Month","One sentence."]].map(([key,title,ph])=>(
                <div key={key} style={card()}>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:14,color:C.forest,fontWeight:700,marginBottom:9}}>{title}</div>
                  <textarea value={data.monthlyReflection[key]||""} onChange={e=>update({monthlyReflection:{...data.monthlyReflection,[key]:e.target.value}})} rows={3} placeholder={ph} style={{...INP,resize:"vertical",lineHeight:1.7,fontSize:13}}/>
                </div>
              ))}
            </div>
          )}

          {/* QUARTERLY */}
          {tab===3&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...card(),gridColumn:"1/-1",background:`linear-gradient(120deg,${C.forest},${C.olive})`,color:"#fff",border:"none"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>Q2 2026 — Apr → Jun</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Black Hat season. Pre-sell runway. Milwaukee transition. Build the pipeline.</div>
              </div>
              {Object.entries(data.quarterlyGoals).map(([cat,goals])=>(
                <div key={cat} style={card()}>
                  <div style={ST}>{cat==="career"?"💼 Career":cat==="health"?"❤️ Health":cat==="finance"?"💰 Finance":"🌿 Personal"}</div>
                  {goals.map((g,i)=>(<div key={i} style={{padding:"6px 9px",borderRadius:6,background:C.cream,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:C.gold}}>◆</span>{g}</div>))}
                </div>
              ))}
              {/* Finances — dollar amounts (Casey style) */}
              <div style={card()}>
                <div style={ST}>💰 Finances — Q2 2026</div>
                {[
                  ["Debt Paid Off","debtPaid","debtGoal","$"],
                  ["Savings Progress","savingsAmount","savingsGoal","$"],
                ].map(([label,valKey,goalKey,sym])=>(
                  <div key={label} style={{marginBottom:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:13,fontWeight:600}}>{label}</span>
                      <span style={{fontSize:12,color:C.olive}}>{sym}{data[valKey].toLocaleString()} / {sym}{data[goalKey].toLocaleString()}</span>
                    </div>
                    <div style={{height:8,background:C.mist,borderRadius:99,overflow:"hidden",marginBottom:5}}>
                      <div style={{height:"100%",width:`${Math.min((data[valKey]/data[goalKey])*100,100)}%`,background:`linear-gradient(90deg,${C.olive},${C.gold})`,borderRadius:99,transition:"width 0.5s"}}/>
                    </div>
                    <input type="number" value={data[valKey]} onChange={e=>update({[valKey]:+e.target.value})} style={{...INP,fontSize:12}} placeholder={`Enter amount…`}/>
                  </div>
                ))}
                <div>
                  <span style={LB}>Net Worth (savings − debt)</span>
                  <div style={{fontSize:22,fontWeight:700,fontFamily:"'Cormorant Garamond',Georgia,serif",color:data.netWorth>=0?C.forest:"#e05c5c"}}>${data.netWorth.toLocaleString()}</div>
                  <input type="number" value={data.netWorth} onChange={e=>update({netWorth:+e.target.value})} style={{...INP,fontSize:12,marginTop:6}} placeholder="Net worth…"/>
                </div>
              </div>
              <div style={card()}>
                <div style={ST}>💡 Ideas Parking Lot</div>
                {data.ideasParking.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic",marginBottom:10}}>Drop ideas here so you don't lose them…</div>}
                {data.ideasParking.map((idea,i)=>(<div key={i} style={{padding:"6px 9px",borderRadius:6,background:"#fffbeb",marginBottom:5,fontSize:12,borderLeft:`3px solid ${C.gold}`}}>💡 {idea}</div>))}
                <div style={{display:"flex",gap:6,marginTop:8}}>
                  <input value={newIdea} onChange={e=>setNewIdea(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addIdea()} placeholder="Park an idea…" style={{...INP,flex:1,fontSize:12}}/>
                  <button onClick={addIdea} style={BTN(C.gold)}>+</button>
                </div>
              </div>
              <div style={{...card(),gridColumn:"1/-1"}}>
                <div style={ST}>🏆 Q2 Wins</div>
                {data.quarterlyWins.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic",marginBottom:8}}>No wins logged yet — start celebrating your progress.</div>}
                {data.quarterlyWins.map((w,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:"#f0faf0",marginBottom:6,fontSize:13,borderLeft:`3px solid ${C.olive}`}}>🎉 {w}</div>))}
                <input placeholder="Log a quarterly win… (Enter)" style={INP} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){update({quarterlyWins:[...data.quarterlyWins,e.target.value]});e.target.value="";}}}/>
              </div>
            </div>
          )}

          {/* YEARLY */}
          {tab===4&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...card(),gridColumn:"1/-1",background:`linear-gradient(135deg,#0E1E12,${C.forest})`,color:C.cream,border:"none"}}>
                <div style={{fontSize:10,letterSpacing:"0.2em",color:C.gold,textTransform:"uppercase",marginBottom:6}}>Life Vision 2026</div>
                <textarea value={data.lifeVision} onChange={e=>update({lifeVision:e.target.value})} rows={2} style={{...INP,background:"transparent",color:C.cream,border:"none",fontSize:16,fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:700,lineHeight:1.55,padding:"4px 0",resize:"none",width:"100%"}}/>
              </div>
              <div style={card()}>
                <div style={ST}>🔒 Non-Negotiables</div>
                {data.nonNegotiables.map((n,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:C.cream,marginBottom:6,fontSize:13,display:"flex",alignItems:"center",gap:8}}><span style={{color:C.burnt,fontSize:15}}>✦</span>{n}</div>))}
              </div>
              <div style={card()}>
                <div style={ST}>🎯 2026 Focus</div>
                {data.yearlyFocus.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                    <span style={{color:C.gold}}>→</span>
                    <input value={f} onChange={e=>{const arr=[...data.yearlyFocus];arr[i]=e.target.value;update({yearlyFocus:arr});}} style={{...INP,padding:"6px 9px",fontSize:12,background:C.cream}}/>
                    <span onClick={()=>update({yearlyFocus:data.yearlyFocus.filter((_,idx)=>idx!==i)})} style={{cursor:"pointer",color:"#bbb",fontSize:13}}>✕</span>
                  </div>
                ))}
                <button onClick={()=>update({yearlyFocus:[...data.yearlyFocus,""]})} style={{...BTN(C.cream),color:C.forest,border:`1.5px solid ${C.mist}`,fontSize:11,width:"100%",marginTop:4}}>+ Add Focus</button>
              </div>
              {data.focusBuckets.map((bucket,i)=>(
                <div key={i} style={card()}>
                  <div style={ST}>{bucket.title}</div>
                  {bucket.items.map((item,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                      <span style={{color:[C.olive,C.gold,C.burnt,C.forest][i%4]}}>◆</span>
                      <input value={item} onChange={e=>{
                        const buckets=[...data.focusBuckets];
                        const items=[...buckets[i].items];items[j]=e.target.value;
                        buckets[i]={...buckets[i],items};
                        update({focusBuckets:buckets});
                      }} style={{...INP,padding:"6px 9px",fontSize:12,background:C.cream}}/>
                    </div>
                  ))}
                </div>
              ))}
              {/* + New Bucket button (Casey style) */}
              <div onClick={()=>{const t=prompt("Bucket title?");if(t)update({focusBuckets:[...data.focusBuckets,{title:t,items:[]}]});}} style={{...card({padding:"20px"}),cursor:"pointer",border:`2px dashed ${C.gold}`,background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:120,transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${C.gold}10`}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{fontSize:28,color:C.gold}}>+</div>
                <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>New Bucket</div>
              </div>
            </div>
          )}

          {/* HABITS */}
          {tab===5&&<HabitTracker data={data} update={update}/>}

          {/* VISION BOARD */}
          {tab===6&&(
            <div>
              <div style={{...card(),background:`linear-gradient(135deg,${C.burnt},${C.gold})`,color:"#fff",border:"none",marginBottom:18}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>✨ Vision Board — I Already Have This</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Not wishes. Declarations. Things you KNOW are coming.</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
                {data.visionBoard.map((item,i)=>(
                  <div key={i} style={{...card(),textAlign:"center",transition:"transform 0.2s,box-shadow 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px) scale(1.02)";e.currentTarget.style.boxShadow=`0 12px 32px ${C.shadow}`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 2px 16px ${C.shadow}`;}}
                  >
                    <div style={{fontSize:44,marginBottom:8}}>{item.emoji}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,fontWeight:700,color:C.forest,marginBottom:5}}>{item.label}</div>
                    <div style={{fontSize:12,color:"#666",lineHeight:1.6,fontStyle:"italic"}}>{item.desc}</div>
                  </div>
                ))}
                <div onClick={()=>setShowVAdd(true)} style={{...card(),textAlign:"center",cursor:"pointer",border:`2px dashed ${C.gold}`,background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:150,transition:"all 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=`${C.gold}10`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  <div style={{fontSize:28,color:C.gold}}>+</div>
                  <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>Add Vision Card</div>
                </div>
              </div>
              {showVAdd&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
                  <div style={{...card(),width:320,maxWidth:"90vw"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,color:C.forest,fontWeight:700,marginBottom:14}}>Add Vision Card</div>
                    <span style={LB}>Emoji</span><input value={newVision.emoji} onChange={e=>setNewVision({...newVision,emoji:e.target.value})} style={{...INP,marginBottom:9}}/>
                    <span style={LB}>Title</span><input value={newVision.label} onChange={e=>setNewVision({...newVision,label:e.target.value})} style={{...INP,marginBottom:9}} placeholder="Dream Car"/>
                    <span style={LB}>Declaration</span><input value={newVision.desc} onChange={e=>setNewVision({...newVision,desc:e.target.value})} style={{...INP,marginBottom:14}} placeholder="It's already mine because…"/>
                    <div style={{display:"flex",gap:7}}>
                      <button onClick={addVision} style={{...BTN(C.forest),flex:1}}>Add to Board</button>
                      <button onClick={()=>setShowVAdd(false)} style={{...BTN(C.cream),flex:1,color:C.forest,border:`1.5px solid ${C.mist}`}}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BUCKET LIST */}
          {tab===7&&(
            <div style={{maxWidth:680}}>
              <div style={{...card(),background:`linear-gradient(120deg,${C.forest},#2a5a35)`,color:C.cream,border:"none",marginBottom:18}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>🪣 Life Bucket List</div>
                <div style={{fontSize:12,opacity:0.8,marginTop:3}}>Things to do before you kick the bucket. Check them off as you LIVE.</div>
                <div style={{fontSize:13,color:C.gold,marginTop:7,fontWeight:700}}>{data.bucketList.filter(b=>b.done).length} / {data.bucketList.length} complete</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:14}}>
                {data.bucketList.map((item,i)=>(
                  <div key={i} onClick={()=>toggleBucket(i)} style={{...card({padding:"13px 16px"}),display:"flex",alignItems:"center",gap:12,cursor:"pointer",background:item.done?"linear-gradient(120deg,#f0faf0,#e8f5e8)":C.paper,borderLeft:`4px solid ${item.done?C.olive:C.gold}`,transition:"all 0.18s"}}>
                    <div style={{width:24,height:24,borderRadius:7,border:`2px solid ${item.done?C.olive:C.gold}`,background:item.done?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.18s"}}>
                      {item.done&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
                    </div>
                    <span style={{fontSize:14,color:item.done?"#888":C.ink,textDecoration:item.done?"line-through":"none",lineHeight:1.5}}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:6}}>
                <input value={newBucket} onChange={e=>setNewBucket(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addBucketItem()} placeholder="Add a bucket list item…" style={{...INP,flex:1}}/>
                <button onClick={addBucketItem} style={BTN(C.gold)}>+</button>
              </div>
            </div>
          )}

          {/* LIFE SYSTEMS */}
          {tab===8&&<LifeSystems data={data} update={update}/>}

          {/* JOB SEARCH TRACKER */}
          {tab===9&&<JobSearchTracker/>}

          {/* OUTREACH */}
          {tab===10&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <div style={{...card(),background:`linear-gradient(120deg,${C.forest},${C.olive})`,color:"#fff",border:"none"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:700}}>🎯 Outreach Tracker</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Ten real conversations beat a hundred applications. Track every target org, by lane.</div>
                <div style={{fontSize:13,color:C.gold,marginTop:7,fontWeight:700}}>{data.outreach.length} tracked · {data.outreach.filter(o=>o.status!=="Not Started"&&o.status!=="Closed").length} active</div>
              </div>
              <div style={card()}>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  {data.outreach.map(o=>(
                    <div key={o.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:8,background:C.cream,flexWrap:"wrap"}}>
                      <div style={{flex:"1.4 1 140px",fontSize:13,fontWeight:600,color:C.ink}}>{o.company}</div>
                      <div style={{flex:"1 1 110px",fontSize:11,color:C.olive,fontFamily:"'DM Mono',monospace"}}>{o.lane}</div>
                      <input value={o.contact} onChange={e=>updateOutreach(o.id,"contact",e.target.value)} placeholder="Contact…" style={{...INP,flex:"1 1 100px",fontSize:11,padding:"5px 8px"}}/>
                      <select value={o.status} onChange={e=>updateOutreach(o.id,"status",e.target.value)} style={{...INP,flex:"0.9 1 110px",fontSize:11,padding:"5px 6px"}}>
                        {["Not Started","Contacted","Responded","Interview","Offer","Closed"].map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                      <input type="date" value={o.lastTouch} onChange={e=>updateOutreach(o.id,"lastTouch",e.target.value)} style={{...INP,flex:"0.9 1 120px",fontSize:11,padding:"5px 6px"}}/>
                      <span onClick={()=>removeOutreach(o.id)} style={{cursor:"pointer",color:"#bbb",fontSize:14,padding:"0 4px"}}>✕</span>
                    </div>
                  ))}
                  {data.outreach.length===0&&<div style={{fontSize:12,color:"#999",fontStyle:"italic"}}>No target orgs logged yet — add your first below.</div>}
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <input value={newOutreach.company} onChange={e=>setNewOutreach({...newOutreach,company:e.target.value})} placeholder="Company…" style={{...INP,flex:"1.4 1 140px",fontSize:12}}/>
                  <select value={newOutreach.lane} onChange={e=>setNewOutreach({...newOutreach,lane:e.target.value})} style={{...INP,flex:"1 1 110px",fontSize:12}}>
                    {["Healthcare SME","AI Red Team","Sports Tech / G-Ma"].map(l=><option key={l} value={l}>{l}</option>)}
                  </select>
                  <input value={newOutreach.contact} onChange={e=>setNewOutreach({...newOutreach,contact:e.target.value})} placeholder="Contact…" style={{...INP,flex:"1 1 100px",fontSize:12}}/>
                  <button onClick={addOutreach} style={BTN(C.forest)}>+</button>
                </div>
              </div>
            </div>
          )}

          {/* BLACK HAT */}
          {tab===11&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <Countdown/>
              <div style={card()}>
                <div style={ST}>🎬 Confirmed & Tentative Events</div>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  {data.blackHatEvents.map(ev=>(
                    <div key={ev.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:8,background:C.cream,borderLeft:`3px solid ${ev.status==="confirmed"?C.olive:C.gold}`,flexWrap:"wrap"}}>
                      <input value={ev.name} onChange={e=>updateEvent(ev.id,"name",e.target.value)} style={{...INP,flex:"1.6 1 150px",fontSize:12,fontWeight:600}}/>
                      <input type="date" value={ev.date} onChange={e=>updateEvent(ev.id,"date",e.target.value)} style={{...INP,flex:"0.9 1 120px",fontSize:11}}/>
                      <input value={ev.location} onChange={e=>updateEvent(ev.id,"location",e.target.value)} placeholder="Location…" style={{...INP,flex:"1 1 120px",fontSize:11}}/>
                      <select value={ev.status} onChange={e=>updateEvent(ev.id,"status",e.target.value)} style={{...INP,flex:"0.8 1 100px",fontSize:11}}>
                        <option value="confirmed">Confirmed</option>
                        <option value="tentative">Tentative</option>
                      </select>
                      <span onClick={()=>removeEvent(ev.id)} style={{cursor:"pointer",color:"#bbb",fontSize:14,padding:"0 4px"}}>✕</span>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <input value={newEvent.name} onChange={e=>setNewEvent({...newEvent,name:e.target.value})} placeholder="Event name…" style={{...INP,flex:"1.6 1 150px",fontSize:12}}/>
                  <input type="date" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})} style={{...INP,flex:"0.9 1 120px",fontSize:12}}/>
                  <input value={newEvent.location} onChange={e=>setNewEvent({...newEvent,location:e.target.value})} placeholder="Location…" style={{...INP,flex:"1 1 120px",fontSize:12}}/>
                  <button onClick={addEvent} style={BTN(C.forest)}>+</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.mist};}
        ::-webkit-scrollbar-thumb{background:${C.olive};border-radius:99px;}
        textarea:focus,input:focus{border-color:${C.gold}!important;box-shadow:0 0 0 3px ${C.gold}22;}
        button:hover{opacity:0.88;transform:translateY(-1px);}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulseDot{0%{box-shadow:0 0 0 0 ${C.crimson}80;}70%{box-shadow:0 0 0 8px ${C.crimson}00;}100%{box-shadow:0 0 0 0 ${C.crimson}00;}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @media(max-width:640px){
          h1{font-size:20px!important;}
          .grid-2{grid-template-columns:1fr!important;}
        }
      `}</style>
    </div>
  );
}
