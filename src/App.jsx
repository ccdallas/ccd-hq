import { useState, useEffect, useCallback } from "react";
import OutreachTracker from "./OutreachTracker.jsx";

const C = {
  forest:"#1A3F22", olive:"#58761B", gold:"#D99201",
  burnt:"#905A01", cream:"#F5EDD6", paper:"#FFFDF7",
  ink:"#0E1E12", mist:"#E8F0E0", shadow:"rgba(26,63,34,0.18)",
};

const AFFIRMATIONS = [
  "I didn't leave healthcare. I learned to defend it. And the world is about to know my name.",
  "I am the Digital First Responder — the bridge between the clinical floor and the security operations center.",
  "God placed this calling on my life long before I understood it. I walk in it fully and without apology.",
  "I am not a non-traditional candidate. I am the candidate they didn't know they needed.",
  "Every closed door redirected me closer to my purpose. I trust the process.",
  "I protect patients from threats they never see coming. That is sacred work.",
  "My experience is not a detour. It is my competitive advantage.",
  "I am building something that will outlast me — for my family and every generation after.",
  "The red carpet on August 5th is not an arrival. It is a beginning.",
  "I am a woman of faith, a grandmother, a clinician, a defender. All of it counts. All of it matters.",
  "Remote, flexible, and fully compensated — the right role already exists and is looking for me.",
  "I do not shrink to fit job descriptions. I expand organizations to fit my vision.",
  "Caregiving and career excellence are not in conflict. I am proof that both can coexist.",
  "My mother's care is covered. My family is thriving. My work is meaningful. This is the life I built.",
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
  "I am the kind of woman who builds a lab, walks a red carpet, and shows up for her family — all in the same week.",
  "Every cert I earn, every scenario I build, every person I mentor — it compounds.",
  "I am a Digital First Responder. I assess. I contain. I treat. I recover. Always.",
];

const CAL_COLORS = {
  routine:C.olive, health:"#e05c5c", family:C.gold, growth:C.forest,
  finance:"#10b981", special:C.burnt, birthday:"#ec4899",
  wicys:"#7c3aed", paid:"#0ea5e9", study:"#1A3F22",
};

const BLACK_HAT = new Date("2026-08-05T09:00:00");
const STORE = "ccd_hq_v3";

// ── DYNAMIC CALENDAR ──────────────────────────────────────────────
function getDaySchedule(date) {
  const dow = date.getDay();
  const base = [
    { time:"6:30 AM", title:"Hot Tea ☕", cal:"routine" },
    { time:"7:30 AM", title:"Daily Affirmation 📖", cal:"routine" },
  ];
  const byDay = {
    0: [
      { time:"8:00 AM", title:"Security+ Core — Gibson/Messer 📚", cal:"study" },
      { time:"9:00 AM", title:"TryHackMe: HealthHackHer 💻", cal:"growth" },
      { time:"10:00 AM", title:"AWS Study Main Block ☁️", cal:"study" },
      { time:"11:30 AM", title:"Active Recall — Claude Quiz 🧠", cal:"study" },
      { time:"1:00 PM", title:"Security+ Deep Dive — GRC/Compliance", cal:"study" },
      { time:"3:00 PM", title:"Specialty — HCISPP Free Resources", cal:"study" },
      { time:"5:00 PM", title:"🏃 Cardio 30 min", cal:"health" },
      { time:"Evening", title:"DFR Lab or LinkedIn Content", cal:"growth" },
    ],
    1: [
      { time:"8:00 AM", title:"Security+ Core — Gibson/Messer 📚", cal:"study" },
      { time:"9:00 AM", title:"TryHackMe: HealthHackHer 💻", cal:"growth" },
      { time:"10:00 AM", title:"AWS Study Main Block ☁️", cal:"study" },
      { time:"11:30 AM", title:"Active Recall — Claude Quiz 🧠", cal:"study" },
      { time:"1:00 PM", title:"Security+ Deep Dive — GRC/Compliance", cal:"study" },
      { time:"3:00 PM", title:"Specialty — HCISPP Free Resources", cal:"study" },
      { time:"5:00 PM", title:"🏃 Cardio 30 min", cal:"health" },
      { time:"Evening", title:"DFR Lab or LinkedIn Content", cal:"growth" },
    ],
    2: [
      { time:"8:00 AM", title:"Security+ Core 📚", cal:"study" },
      { time:"9:00 AM", title:"AWS Early Block ☁️", cal:"study" },
      { time:"10:00 AM", title:"▣ WiCyS Office Hours", cal:"wicys" },
      { time:"11:00 AM", title:"AWS Main Block ☁️", cal:"study" },
      { time:"12:30 PM", title:"Active Recall 🧠", cal:"study" },
      { time:"1:00 PM", title:"▣ PAID CLIENTS 💼", cal:"paid" },
      { time:"5:00 PM", title:"💪 Strength 30 min", cal:"health" },
      { time:"Evening", title:"Security+ Deep Dive — Network/Crypto/Cloud", cal:"study" },
      { time:"Late", title:"DFR Lab or LinkedIn", cal:"growth" },
    ],
    3: [
      { time:"8:00 AM", title:"Security+ Core — Gibson/Messer 📚", cal:"study" },
      { time:"9:00 AM", title:"TryHackMe: HealthHackHer 💻", cal:"growth" },
      { time:"10:00 AM", title:"AWS Study Main Block ☁️", cal:"study" },
      { time:"11:30 AM", title:"Active Recall — Claude Quiz 🧠", cal:"study" },
      { time:"1:00 PM", title:"Security+ Deep Dive — GRC/Compliance", cal:"study" },
      { time:"3:00 PM", title:"Specialty — HCISPP Free Resources", cal:"study" },
      { time:"5:00 PM", title:"🏃 Cardio 30 min", cal:"health" },
      { time:"Evening", title:"DFR Lab or LinkedIn Content", cal:"growth" },
    ],
    4: [
      { time:"8:00 AM", title:"Security+ Core 📚", cal:"study" },
      { time:"9:00 AM", title:"AWS Early Block ☁️", cal:"study" },
      { time:"10:00 AM", title:"▣ WiCyS Office Hours", cal:"wicys" },
      { time:"11:00 AM", title:"AWS Main Block ☁️", cal:"study" },
      { time:"12:30 PM", title:"Active Recall 🧠", cal:"study" },
      { time:"1:00 PM", title:"▣ PAID CLIENTS 💼", cal:"paid" },
      { time:"5:00 PM", title:"💪 Strength 30 min", cal:"health" },
      { time:"Evening", title:"Security+ Deep Dive — IoMT/Healthcare", cal:"study" },
      { time:"Late", title:"DFR Lab or LinkedIn", cal:"growth" },
    ],
    5: [
      { time:"8:00 AM", title:"Security+ Core 📚", cal:"study" },
      { time:"9:00 AM", title:"TryHackMe: HealthHackHer 💻", cal:"growth" },
      { time:"10:00 AM", title:"AWS Study Main Block ☁️", cal:"study" },
      { time:"11:30 AM", title:"Active Recall 🧠", cal:"study" },
      { time:"1:00 PM", title:"Security+ Deep Dive — GRC/Compliance", cal:"study" },
      { time:"3:00 PM", title:"Specialty — HCISPP Free Resources", cal:"study" },
      { time:"5:00 PM", title:"🏃 Cardio 30 min", cal:"health" },
      { time:"Evening", title:"Outreach — 5 touches minimum 📨", cal:"growth" },
    ],
    6: [
      { time:"8:00 AM", title:"Security+ Core 📚", cal:"study" },
      { time:"10:00 AM", title:"AWS Study Block ☁️", cal:"study" },
      { time:"1:00 PM", title:"▣ WiCyS Study Hall / AMA", cal:"wicys" },
      { time:"2:00 PM", title:"G-Ma on the Field — content block 🏟️", cal:"growth" },
      { time:"5:00 PM", title:"💪 Strength 30 min", cal:"health" },
      { time:"Evening", title:"LinkedIn / TikTok content", cal:"growth" },
      { time:"9:30 PM", title:"LIGHTS OUT 🌙", cal:"routine" },
    ],
  };
  return [...base, ...(byDay[dow] || [])];
}

function getWeekDays() {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dow + 6) % 7));
  monday.setHours(0,0,0,0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isToday(date) {
  const now = new Date();
  return date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
}

function formatWeekRange(days) {
  const s = days[0].toLocaleDateString("en-US",{month:"short",day:"numeric"});
  const e = days[6].toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  return `${s} – ${e}`;
}

function TodayCalendar() {
  const schedule = getDaySchedule(new Date());
  const dayLabel = new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  return (
    <div>
      <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.olive,fontWeight:700,marginBottom:10}}>{dayLabel}</div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {schedule.map((ev,i) => (
          <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 9px",borderRadius:7,
            background:ev.cal==="paid"?"#eff9ff":ev.cal==="wicys"?"#f5f3ff":C.cream,
            borderLeft:`3px solid ${CAL_COLORS[ev.cal]||C.olive}`}}>
            <div style={{fontSize:10,color:C.olive,fontWeight:700,minWidth:64,paddingTop:1}}>{ev.time}</div>
            <div style={{fontSize:12,color:C.ink,lineHeight:1.4}}>{ev.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyCalendarGrid() {
  const days = getWeekDays();
  return (
    <div>
      <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.olive,fontWeight:700,marginBottom:12}}>
        Week of {formatWeekRange(days)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
        {days.map((day,i) => {
          const schedule = getDaySchedule(day);
          const today = isToday(day);
          const highlights = schedule.filter(e => e.cal !== "routine").slice(0,3);
          return (
            <div key={i} style={{
              background:today?`${C.forest}12`:C.cream,
              borderRadius:9,padding:"9px 7px",
              border:today?`2px solid ${C.forest}`:`1.5px solid ${C.mist}`
            }}>
              <div style={{fontSize:10,fontWeight:700,color:today?C.forest:C.olive,marginBottom:5}}>
                {day.toLocaleDateString("en-US",{weekday:"short"})} {day.getDate()}
              </div>
              {highlights.map((ev,j) => (
                <div key={j} style={{fontSize:9,padding:"2px 4px",borderRadius:3,marginBottom:2,
                  background:`${CAL_COLORS[ev.cal]||C.olive}20`,
                  color:CAL_COLORS[ev.cal]||C.olive,
                  fontWeight:600,lineHeight:1.3}}>
                  {ev.title.length>20?ev.title.slice(0,18)+"…":ev.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ── END DYNAMIC CALENDAR ──────────────────────────────────────────

const defaultData=()=>({
  weeklyFocus:"Land remote healthcare cyber role — 5 outreach touches minimum this week",
  weeklyGoals:["Send outreach to Optiv + ScanTech AI today","Complete ISA/IEC 62443 first module","Post G-Ma on the Field launch content"],
  tasks:[
    {id:1,text:"Send Philips intro via Aví D. — WARM PRIORITY",done:false},
    {id:2,text:"Log outreach in tracker — 5 minimum this week",done:false},
    {id:3,text:"Confirm Black Hat travel + hotel",done:false},
    {id:4,text:"File WOSB certification follow-up",done:false},
    {id:5,text:"Update DFR Lab sports tech bridge scenario",done:false},
  ],
  currentRead:"Security+ (Gibson/Messer) · AWS Cloud Practitioner · ISA/IEC 62443 Foundational",
  readStatus:"reading",
  weeklyWins:["G-Ma on the Field challenge launched","Outreach tracker live in CCD HQ"],
  reflection:"",
  habits:{
    exercise:{label:"Exercise (30 min)",icon:"🏃‍♀️",days:[false,false,false,false,false,false,false]},
    affirmation:{label:"Daily Affirmation",icon:"📖",days:[false,false,false,false,false,false,false]},
    secplus:{label:"Security+ Study",icon:"📚",days:[false,false,false,false,false,false,false]},
    aws:{label:"AWS Study",icon:"☁️",days:[false,false,false,false,false,false,false]},
    bedtime:{label:"Bedtime Routine (CPAP)",icon:"😴",days:[false,false,false,false,false,false,false]},
  },
  quarterlyGoals:{
    career:["Land FTE or contract remote role with benefits","Send 25 targeted org outreach messages","Black Hat red carpet Aug 5"],
    health:["Exercise 4x/week","CPAP compliance every night","O2 monitoring daily"],
    finance:["Purchase own health benefits if no FTE","Track every dollar Jun–Aug","Build 1-month emergency buffer"],
    personal:["Support Mom's dementia care transition","Milwaukee move post-Black Hat","Quality time with family"],
  },
  quarterlyWins:[],
  debtPaid:0,debtGoal:5000,
  savingsAmount:0,savingsGoal:3000,
  netWorth:0,
  accounts:{marcus:0,marcusGoal:5000,appleSavings:0,appleGoal:2000,rothIRA:0,rothGoal:7000,llcChecking:0,vanguard:0},
  monthlyReflection:{wins:"",challenge:"",grateful:"",learned:"",health:"",growth:"",different:"",intention:""},
  lifeVision:"To become the most recognized Digital First Responder in healthcare cybersecurity — protecting patients, empowering clinicians, and building generational wealth that blesses my family for decades.",
  nonNegotiables:["God First — always","Family is the mission","Health is wealth","Build something that outlasts me"],
  focusBuckets:[
    {title:"Wellness — Mind, Body & Soul",items:["Daily affirmation","30 min exercise","CPAP + O2 every night","Water goal daily"]},
    {title:"Wealth ERA",items:["Remote role with benefits","Federal sub-contracting pipeline","3-tier consulting services live","Savings buffer growing"]},
    {title:"Personal Power",items:["Black Hat red carpet Aug 5","WiCyS mentor cohort 3","HCISPP study plan","DFR Lab expanding"]},
    {title:"Legacy & Love",items:["Mom's care covered","Family thriving","WOSB certified","PhD deferred — not abandoned"]},
  ],
  bucketList:[
    {text:"Walk the Black Hat red carpet 🎬",done:true},
    {text:"Keynote a major cybersecurity conference",done:false},
    {text:"Publish a book on Digital First Response methodology",done:false},
    {text:"Travel to West Africa (Ghana / Senegal)",done:false},
    {text:"Own a home outright",done:false},
    {text:"Launch a healthcare cybersecurity nonprofit",done:false},
    {text:"Get on stage at DEF CON as a speaker",done:false},
    {text:"Retire my mother comfortably",done:false},
    {text:"See G-Ma on the Field become a recognized brand",done:false},
    {text:"Publish The G-Ma Playbook — sports tech security framework",done:false},
  ],
  visionBoard:[
    {emoji:"🏠",label:"Dream Home",desc:"Paid off. Peaceful. Space for family."},
    {emoji:"🎤",label:"Keynote Stage",desc:"DEF CON. Black Hat. TEDx."},
    {emoji:"✈️",label:"Ghana / Senegal",desc:"Heritage trip with the family."},
    {emoji:"📚",label:"Published Author",desc:"Digital First Responder: The Book"},
    {emoji:"💼",label:"Remote Dream Role",desc:"Healthcare Cyber SME. Benefits. Flexibility."},
    {emoji:"🎓",label:"PhD Complete",desc:"Capitol Technology University."},
    {emoji:"👑",label:"Generational Wealth",desc:"Building something that outlasts me."},
    {emoji:"🏥",label:"Nonprofit Launched",desc:"Healthcare Cybersecurity for underserved orgs."},
    {emoji:"🏟️",label:"G-Ma on the Field",desc:"The sports tech security brand nobody owned — until now."},
  ],
  ideasParking:[],
  savedBriefing:"",
  lastBriefingDate:"",
  gymLog:[],
});

function loadData(){
  try{const r=localStorage.getItem(STORE);if(r)return{...defaultData(),...JSON.parse(r)};}catch{}
  return defaultData();
}
function saveData(d){try{localStorage.setItem(STORE,JSON.stringify(d));}catch{}}

function useFadeIn(dep){
  const [v,setV]=useState(false);
  useEffect(()=>{setV(false);const t=setTimeout(()=>setV(true),40);return()=>clearTimeout(t);},[dep]);
  return v;
}

const card=(x={})=>({background:C.paper,border:`1.5px solid ${C.mist}`,borderRadius:14,padding:20,boxShadow:`0 2px 16px ${C.shadow}`,...x});
const ST={fontFamily:"'Playfair Display',Georgia,serif",fontSize:18,color:C.forest,fontWeight:700,marginBottom:14};
const LB={fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:C.olive,fontWeight:700,marginBottom:6,display:"block"};
const INP={width:"100%",padding:"8px 12px",border:`1.5px solid ${C.mist}`,borderRadius:8,fontFamily:"'Lora',Georgia,serif",fontSize:14,color:C.ink,background:C.cream,outline:"none",boxSizing:"border-box"};
const BTN=(bg=C.forest,x={})=>({background:bg,color:bg===C.cream?C.forest:"#fff",border:"none",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontSize:13,fontFamily:"'Lora',Georgia,serif",fontWeight:600,transition:"all 0.18s",...x});

const TABS=["🌿 Today","📅 Weekly","🌙 Monthly","🌾 Quarterly","🦅 Yearly","✅ Habits","🗺️ Vision Board","🪣 Bucket List","📊 Outreach"];

// ── COUNTDOWN ─────────────────────────────────────────────────────
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
      <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>🎬 BLACK HAT USA · SEMPERIS PREMIERE · AUGUST 5 2026</div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[["DAYS",t.d],["HRS",t.h],["MIN",t.m],["SEC",t.s]].map(([l,v])=>(
          <div key={l} style={{textAlign:"center",background:"rgba(217,146,1,0.12)",border:`1px solid ${C.gold}30`,borderRadius:10,padding:"10px 14px",minWidth:58}}>
            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:26,fontWeight:900,color:C.gold,lineHeight:1}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",color:"#a0b890",marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#a0b890",marginTop:10,fontStyle:"italic"}}>You are a Featured Defender. The red carpet is waiting. 🌹</div>
    </div>
  );
}

// ── AFFIRMATION ────────────────────────────────────────────────────
function Affirmation(){
  const base=Math.floor(Date.now()/86400000)%AFFIRMATIONS.length;
  const [idx,setIdx]=useState(base);
  const [op,setOp]=useState(1);
  const go=(dir)=>{setOp(0);setTimeout(()=>{setIdx(i=>(i+dir+AFFIRMATIONS.length)%AFFIRMATIONS.length);setOp(1);},280);};
  return(
    <div style={{background:`linear-gradient(135deg,${C.forest},#2d5c36)`,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.olive}40`}}>
      <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>✨ Today's Affirmation</div>
      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,color:C.cream,lineHeight:1.75,fontStyle:"italic",minHeight:68,opacity:op,transition:"opacity 0.28s"}}>"{AFFIRMATIONS[idx]}"</div>
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

// ── AI BRIEFING ────────────────────────────────────────────────────
function Briefing({data}){
  const days = Math.floor((BLACK_HAT - new Date()) / 86400000);
  const pending = data.tasks.filter(t => !t.done);
  const hour = new Date().getHours();
  const todayName = new Date().toLocaleDateString("en-US",{weekday:"long"});
  const dow = new Date().getDay();
  const isTueOrThu = [2,4].includes(dow);
  const isSat = dow === 6;

  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const faithLines = [
    "God placed this calling on your life long before you understood it.",
    "You are covered, protected, and walking in purpose.",
    "Every step forward is ordered. Trust the process.",
    "You didn't come this far to only come this far.",
    "The work you're doing today is building something that will outlast you.",
    "He who began a good work in you will carry it to completion.",
    "Your story is not finished. The best chapter is still being written.",
  ];
  const faithLine = faithLines[dow % faithLines.length];

  const mission = [];
  if (isTueOrThu) {
    mission.push("▣ WiCyS Office Hours 10–11am — show up fully");
    mission.push("▣ Paid client sessions 1–4pm — this is your funding engine");
  } else if (isSat) {
    mission.push("▣ WiCyS Study Hall 1–2pm — lead with generosity");
    mission.push("▣ G-Ma on the Field content block — document the journey");
  } else {
    mission.push("📚 Security+ core study block — Gibson/Messer + ExamCompass");
    mission.push("☁️ AWS main study block — stay consistent");
  }
  if (pending.length > 0) {
    mission.push(`✅ Priority task: ${pending[0].text}`);
  } else {
    mission.push("✅ All tasks clear — log 5 outreach touches today");
  }

  const radar = [];
  radar.push(`🎬 Black Hat red carpet — ${days} days away. You are a Featured Defender.`);
  if (days <= 30) radar.push("🔴 Final stretch to Black Hat — every action compounds now.");
  radar.push("🏟️ G-Ma on the Field — document something today, even one sentence.");
  if (isTueOrThu) radar.push("💼 Paid slots protected today — guard that time.");

  const wordOptions = [
    "You are not waiting for your moment — you are building it, one day at a time.",
    "The gap between clinical floors and the SOC exists because nobody like you stepped in yet. You stepped in.",
    "Every open door required a you that kept showing up. Keep showing up.",
    "The credential no certification can replicate is the one you already carry.",
    "I didn't leave healthcare. I learned to defend it. Say it like you mean it today.",
    "G-Ma on the Field isn't just a challenge. It's a declaration.",
    "The right role is looking for you while you're looking for it. Keep moving.",
  ];
  const wordToday = wordOptions[new Date().getDate() % wordOptions.length];

  return (
    <div style={{...card(), background:`linear-gradient(160deg,#0e1e12,${C.forest})`, border:`1px solid ${C.gold}30`, color:C.cream}}>
      <div style={{fontSize:10, letterSpacing:"0.25em", color:C.gold, textTransform:"uppercase", fontWeight:700, marginBottom:16}}>
        ☀️ Morning Briefing · {new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
      </div>

      <div style={{marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:10, letterSpacing:"0.15em", color:C.gold, textTransform:"uppercase", fontWeight:700, marginBottom:8}}>🌅 Good Morning</div>
        <div style={{fontFamily:"'Lora',Georgia,serif", fontSize:14, lineHeight:1.8, color:C.cream}}>
          {greeting}, Chaunda. {faithLine}
        </div>
      </div>

      <div style={{marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:10, letterSpacing:"0.15em", color:C.gold, textTransform:"uppercase", fontWeight:700, marginBottom:10}}>🎯 Today's Mission — {todayName}</div>
        {mission.map((m,i) => (
          <div key={i} style={{fontFamily:"'Lora',Georgia,serif", fontSize:13, color:C.cream, lineHeight:1.7, marginBottom:6, paddingLeft:8, borderLeft:`2px solid ${C.gold}60`}}>
            {m}
          </div>
        ))}
      </div>

      <div style={{marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:10, letterSpacing:"0.15em", color:C.gold, textTransform:"uppercase", fontWeight:700, marginBottom:10}}>📅 On Your Radar</div>
        {radar.map((r,i) => (
          <div key={i} style={{fontFamily:"'Lora',Georgia,serif", fontSize:13, color:"#a0b890", lineHeight:1.7, marginBottom:5}}>
            {r}
          </div>
        ))}
      </div>

      <div style={{marginBottom: pending.length > 0 ? 16 : 0}}>
        <div style={{fontSize:10, letterSpacing:"0.15em", color:C.gold, textTransform:"uppercase", fontWeight:700, marginBottom:8}}>💪 Your Word Today</div>
        <div style={{fontFamily:"'Playfair Display',Georgia,serif", fontSize:15, color:C.cream, lineHeight:1.75, fontStyle:"italic"}}>
          "{wordToday}"
        </div>
      </div>

      {pending.length > 0 && (
        <div style={{marginTop:16, padding:"10px 14px", borderRadius:8, background:"rgba(217,146,1,0.12)", border:`1px solid ${C.gold}30`}}>
          <div style={{fontSize:11, color:C.gold, fontWeight:700, marginBottom:6}}>⚡ {pending.length} task{pending.length>1?"s":""} pending</div>
          {pending.slice(0,3).map((t,i) => (
            <div key={i} style={{fontSize:12, color:"#a0b890", marginBottom:3}}>→ {t.text}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── HABIT TRACKER ──────────────────────────────────────────────────
function HabitTracker({data,update}){
  const weekDays = getWeekDays();
  const dayLabels = weekDays.map(d => d.toLocaleDateString("en-US",{weekday:"short"}).slice(0,2));
  const dayNums = weekDays.map(d => d.getDate());
  const todayIdx = weekDays.findIndex(d => isToday(d));

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
            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,fontWeight:700}}>Habit Tracker</div>
            <div style={{fontSize:12,opacity:0.75,marginTop:2}}>Week of {formatWeekRange(weekDays)} · {allChecks}/{totalChecks} completions</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:32,fontWeight:900,color:C.gold}}>{score}%</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em"}}>WEEKLY SCORE</div>
          </div>
        </div>
        <div style={{height:6,background:"rgba(255,255,255,0.15)",borderRadius:99,overflow:"hidden",marginTop:12}}>
          <div style={{height:"100%",width:`${score}%`,background:`linear-gradient(90deg,${C.gold},#f0b429)`,borderRadius:99,transition:"width 0.6s ease"}}/>
        </div>
      </div>

      <div style={card()}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#999",fontWeight:700,marginBottom:14}}>Daily Habits</div>
        <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
          <div style={{flex:1}}/>
          <div style={{display:"flex",gap:6,marginRight:4}}>
            {dayNums.map((d,i)=>(
              <div key={i} style={{width:34,height:34,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                background:i===todayIdx?C.forest:"transparent",
                border:i===todayIdx?`none`:`1.5px solid ${C.mist}`,
              }}>
                <div style={{fontSize:9,color:i===todayIdx?"#fff":"#aaa",letterSpacing:"0.05em"}}>{dayLabels[i]}</div>
                <div style={{fontSize:12,fontWeight:700,color:i===todayIdx?"#fff":C.ink}}>{d}</div>
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
                <div style={{fontSize:12,color:C.olive,fontWeight:700,minWidth:28,textAlign:"right"}}>{done}/7</div>
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

// ── MONEY ROUTER ──────────────────────────────────────────────────
function MoneyRouter({data,update}){
  const acc=data.accounts||{marcus:0,marcusGoal:5000,appleSavings:0,appleGoal:2000,rothIRA:0,rothGoal:7000,llcChecking:0,vanguard:0};
  const set=(key,val)=>update({accounts:{...acc,[key]:+val}});
  const tiers=[
    {tier:"T1",label:"Operating Base",icon:"🏦",color:C.ink,bg:"#e8f0e0",accounts:[{key:"llcChecking",label:"LLC Business Checking",goal:null,note:"Business income lands here first. Pay yourself from this."}],rule:"Bills, daily expenses, operating money"},
    {tier:"T2",label:"Protection",icon:"🛡️",color:"#0f6e56",bg:"#e1f5ee",accounts:[{key:"marcus",label:"Marcus High-Yield Savings",goal:"marcusGoal",note:"Emergency + job transition buffer. Fund this first."}],rule:"3 months expenses. Do not touch."},
    {tier:"T3",label:"Opportunity",icon:"✨",color:"#854f0b",bg:"#faeeda",accounts:[{key:"appleSavings",label:"Apple Card High-Yield Savings",goal:"appleGoal",note:"Black Hat · certs · conferences · family trips"}],rule:"Intentional spending that invests in you."},
    {tier:"T4",label:"Future You",icon:"🌱",color:"#533ab7",bg:"#eeedfe",accounts:[{key:"rothIRA",label:"Roth IRA · Navy Federal",goal:"rothGoal",note:"Even $50/mo builds the habit and keeps it alive"}],rule:"Consistent beats maximum. Start small."},
    {tier:"T5",label:"Wealth Building",icon:"📈",color:C.forest,bg:"#eaf3de",accounts:[{key:"vanguard",label:"Vanguard Individual Brokerage",goal:null,note:"Open it now. Fund after T2 & T4 are consistent."}],rule:"Index funds (VTI). Long-term. Hands off."},
  ];
  const totalAssets=(acc.marcus||0)+(acc.appleSavings||0)+(acc.rothIRA||0)+(acc.llcChecking||0)+(acc.vanguard||0);
  return(
    <div style={{...card(),gridColumn:"1/-1"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:20}}>
        <div>
          <div style={ST}>💵 Money Routing System</div>
          <div style={{fontSize:12,color:"#888",marginTop:-8,marginBottom:4}}>Every dollar has a job. Follow the tiers in order when income comes in.</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:C.olive,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700}}>Total across accounts</div>
          <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:26,fontWeight:900,color:C.forest}}>${totalAssets.toLocaleString()}</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {tiers.map((t,i)=>{
          const mainAcc=t.accounts[0];
          const v=acc[mainAcc.key]||0;
          const g=mainAcc.goal?acc[mainAcc.goal]||0:null;
          const p=g?Math.min((v/g)*100,100):null;
          return(
            <div key={i} style={{background:t.bg,borderRadius:10,padding:"14px 16px",border:`1.5px solid ${t.color}22`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                <div style={{background:t.color,color:"#fff",borderRadius:6,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:"0.1em",flexShrink:0}}>{t.tier}</div>
                <div style={{fontSize:14,fontWeight:700,color:t.color,fontFamily:"'Playfair Display',Georgia,serif"}}>{t.icon} {t.label}</div>
                <div style={{fontSize:11,color:"#777",marginLeft:"auto",fontStyle:"italic",textAlign:"right"}}>{t.rule}</div>
              </div>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:160}}>
                  <div style={{fontSize:12,fontWeight:600,color:t.color,marginBottom:2}}>{mainAcc.label}</div>
                  <div style={{fontSize:11,color:"#888",marginBottom:g?6:0}}>{mainAcc.note}</div>
                  {g&&(<div><div style={{height:5,background:"rgba(0,0,0,0.08)",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:t.color,borderRadius:99,transition:"width 0.5s",opacity:0.85}}/></div><div style={{fontSize:10,color:t.color,marginTop:3,fontWeight:700}}>${v.toLocaleString()} of ${g.toLocaleString()} goal · {Math.round(p||0)}%</div></div>)}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5,minWidth:150}}>
                  <input type="number" value={v||""} onChange={e=>set(mainAcc.key,e.target.value)} placeholder="Current balance $" style={{...INP,fontSize:12,background:"rgba(255,255,255,0.75)",border:`1.5px solid ${t.color}44`}}/>
                  {mainAcc.goal&&(<input type="number" value={acc[mainAcc.goal]||""} onChange={e=>set(mainAcc.goal,e.target.value)} placeholder="My goal $" style={{...INP,fontSize:11,background:"rgba(255,255,255,0.5)",border:`1.5px solid ${t.color}33`}}/>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:14,padding:"11px 14px",borderRadius:8,background:`${C.gold}18`,border:`1px solid ${C.gold}44`,fontSize:12,color:C.ink,lineHeight:1.8}}>
        <span style={{fontWeight:700,color:C.burnt}}>The one rule:</span> When income comes in — T2 protection first, then T3 opportunity, then T4 future. T5 opens after T2 and T4 are consistent. LLC checking runs parallel to everything personal.
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState(0);
  const [data,setData]=useState(loadData);
  const [newTask,setNewTask]=useState("");
  const [newWin,setNewWin]=useState("");
  const [newBucket,setNewBucket]=useState("");
  const [newIdea,setNewIdea]=useState("");
  const [newVision,setNewVision]=useState({emoji:"✨",label:"",desc:""});
  const [showVAdd,setShowVAdd]=useState(false);
  const visible=useFadeIn(tab);

  const update=useCallback((patch)=>{
    setData(prev=>{const next={...prev,...patch};saveData(next);return next;});
  },[]);

  const toggleTask=(id)=>update({tasks:data.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)});
  const addTask=()=>{if(!newTask.trim())return;update({tasks:[...data.tasks,{id:Date.now(),text:newTask,done:false}]});setNewTask("");};
  const addWin=()=>{if(!newWin.trim())return;update({weeklyWins:[...data.weeklyWins,newWin]});setNewWin("");};
  const toggleBucket=(i)=>{const b=[...data.bucketList];b[i]={...b[i],done:!b[i].done};update({bucketList:b});};
  const addBucketItem=()=>{if(!newBucket.trim())return;update({bucketList:[...data.bucketList,{text:newBucket,done:false}]});setNewBucket("");};
  const addIdea=()=>{if(!newIdea.trim())return;update({ideasParking:[...data.ideasParking,newIdea]});setNewIdea("");};
  const addVision=()=>{if(!newVision.label)return;update({visionBoard:[...data.visionBoard,{...newVision}]});setNewVision({emoji:"✨",label:"",desc:""});setShowVAdd(false);};
  const saveBriefing=(t,d)=>update({savedBriefing:t,lastBriefingDate:d});

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.forest} 0%,#0E2415 40%,#0a1a0d 100%)`,fontFamily:"'Lora',Georgia,serif",color:C.ink}}>

      {/* HEADER */}
      <div style={{padding:"20px 20px 0",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:6}}>
          <div>
            <div style={{fontSize:10,letterSpacing:"0.25em",color:C.gold,textTransform:"uppercase",fontWeight:700}}>Digital First Responder HQ</div>
            <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:26,color:C.cream,margin:"3px 0 2px",fontWeight:700,letterSpacing:"-0.02em"}}>Hey Chaunda ✦</h1>
            <div style={{fontSize:11,color:"#a0b890"}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["🎬","Aug 5","Black Hat"],["🎓","Cohort 3","WiCyS"],["🏟️","Active","G-Ma on Field"]].map(([em,d,l])=>(
              <div key={l} style={{background:"rgba(217,146,1,0.15)",border:`1px solid ${C.gold}40`,borderRadius:10,padding:"7px 12px",textAlign:"center"}}>
                <div style={{fontSize:15}}>{em}</div>
                <div style={{fontSize:12,color:C.gold,fontWeight:700}}>{d}</div>
                <div style={{fontSize:9,color:"#a0b890",letterSpacing:"0.05em"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:2,marginTop:16,overflowX:"auto",paddingBottom:2,scrollbarWidth:"none"}}>
          {TABS.map((t,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{
              padding:"8px 13px",borderRadius:"9px 9px 0 0",border:"none",cursor:"pointer",
              background:tab===i?C.paper:"rgba(255,255,255,0.06)",
              color:tab===i?C.forest:"#a0b890",
              fontFamily:"'Lora',Georgia,serif",fontSize:12,fontWeight:tab===i?700:400,
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
              <Briefing data={data}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <div style={card()}>
                  <div style={ST}>📅 Today's Schedule</div>
                  <TodayCalendar/>
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
              <div style={{...card({padding:"14px 20px"}),background:`linear-gradient(135deg,${C.forest},#2d5c36)`,border:"none",textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,color:C.cream,fontStyle:"italic"}}>
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
              <div style={card()}>
                <div style={ST}>📅 This Week</div>
                <WeeklyCalendarGrid/>
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
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700}}>June 2026 — Monthly Reflection</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Consistency beats intensity. What does this month say about you?</div>
              </div>
              {[["wins","🏆 Biggest Wins","What are you celebrating?"],["challenge","💪 Biggest Challenge","Be honest."],["grateful","🙏 Most Grateful For","What showed up?"],["learned","💡 Most Important Lesson","What shifted?"],["health","❤️ Your Health This Month","Body & mind."],["growth","🌱 Growth","What expanded?"],["different","🔄 Do Differently","No judgment."],["intention","🌅 Intention Next Month","One sentence."]].map(([key,title,ph])=>(
                <div key={key} style={card()}>
                  <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:14,color:C.forest,fontWeight:700,marginBottom:9}}>{title}</div>
                  <textarea value={data.monthlyReflection[key]||""} onChange={e=>update({monthlyReflection:{...data.monthlyReflection,[key]:e.target.value}})} rows={3} placeholder={ph} style={{...INP,resize:"vertical",lineHeight:1.7,fontSize:13}}/>
                </div>
              ))}
            </div>
          )}

          {/* QUARTERLY */}
          {tab===3&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...card(),gridColumn:"1/-1",background:`linear-gradient(120deg,${C.forest},${C.olive})`,color:"#fff",border:"none"}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700}}>Q3 2026 — Jul → Sep</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Black Hat red carpet. G-Ma on the Field. G-Ma Playbook ships Sep 12.</div>
              </div>
              {Object.entries(data.quarterlyGoals).map(([cat,goals])=>(
                <div key={cat} style={card()}>
                  <div style={ST}>{cat==="career"?"💼 Career":cat==="health"?"❤️ Health":cat==="finance"?"💰 Finance":"🌿 Personal"}</div>
                  {goals.map((g,i)=>(<div key={i} style={{padding:"6px 9px",borderRadius:6,background:C.cream,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:C.gold}}>◆</span>{g}</div>))}
                </div>
              ))}
              <MoneyRouter data={data} update={update}/>
              <div style={card()}>
                <div style={ST}>💰 Finances — Q3 2026</div>
                {[["Debt Paid Off","debtPaid","debtGoal","$"],["Savings Progress","savingsAmount","savingsGoal","$"]].map(([label,valKey,goalKey,sym])=>(
                  <div key={label} style={{marginBottom:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:13,fontWeight:600}}>{label}</span>
                      <span style={{fontSize:12,color:C.olive}}>{sym}{data[valKey].toLocaleString()} / {sym}{data[goalKey].toLocaleString()}</span>
                    </div>
                    <div style={{height:8,background:C.mist,borderRadius:99,overflow:"hidden",marginBottom:5}}>
                      <div style={{height:"100%",width:`${Math.min((data[valKey]/data[goalKey])*100,100)}%`,background:`linear-gradient(90deg,${C.olive},${C.gold})`,borderRadius:99,transition:"width 0.5s"}}/>
                    </div>
                    <input type="number" value={data[valKey]} onChange={e=>update({[valKey]:+e.target.value})} style={{...INP,fontSize:12}} placeholder="Enter amount…"/>
                  </div>
                ))}
                <div>
                  <span style={LB}>Net Worth (savings − debt)</span>
                  <div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',Georgia,serif",color:data.netWorth>=0?C.forest:"#e05c5c"}}>${data.netWorth.toLocaleString()}</div>
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
                <div style={ST}>🏆 Q3 Wins</div>
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
                <textarea value={data.lifeVision} onChange={e=>update({lifeVision:e.target.value})} rows={2} style={{...INP,background:"transparent",color:C.cream,border:"none",fontSize:16,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,lineHeight:1.55,padding:"4px 0",resize:"none",width:"100%"}}/>
              </div>
              <div style={card()}>
                <div style={ST}>🔒 Non-Negotiables</div>
                {data.nonNegotiables.map((n,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:C.cream,marginBottom:6,fontSize:13,display:"flex",alignItems:"center",gap:8}}><span style={{color:C.burnt,fontSize:15}}>✦</span>{n}</div>))}
              </div>
              <div style={card()}>
                <div style={ST}>🎯 2026 Focus</div>
                {["Land remote healthcare cyber role","Walk the Black Hat red carpet Aug 5","HCISPP certification Q4","WOSB certification complete","Support Mom's care transition","G-Ma on the Field — publish The Playbook Sep 12"].map((f,i)=>(
                  <div key={i} style={{padding:"6px 9px",borderRadius:6,background:C.cream,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:C.gold}}>→</span>{f}</div>
                ))}
              </div>
              {data.focusBuckets.map((bucket,i)=>(
                <div key={i} style={card()}>
                  <div style={ST}>{bucket.title}</div>
                  {bucket.items.map((item,j)=>(<div key={j} style={{padding:"6px 9px",borderRadius:6,background:C.cream,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:[C.olive,C.gold,C.burnt,C.forest][i%4]}}>◆</span>{item}</div>))}
                </div>
              ))}
              <div onClick={()=>{const t=prompt("Bucket title?");if(t)update({focusBuckets:[...data.focusBuckets,{title:t,items:[]}]});}} style={{...card({padding:"20px"}),cursor:"pointer",border:`2px dashed ${C.gold}`,background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:120,transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${C.gold}10`}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{fontSize:28,color:C.gold}}>+</div>
                <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>New Bucket</div>
              </div>
            </div>
          )}

          {tab===5&&<HabitTracker data={data} update={update}/>}

          {/* VISION BOARD */}
          {tab===6&&(
            <div>
              <div style={{...card(),background:`linear-gradient(135deg,${C.burnt},${C.gold})`,color:"#fff",border:"none",marginBottom:18}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700}}>✨ Vision Board — I Already Have This</div>
                <div style={{fontSize:13,opacity:0.85,marginTop:3}}>Not wishes. Declarations. Things you KNOW are coming.</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
                {data.visionBoard.map((item,i)=>(
                  <div key={i} style={{...card(),textAlign:"center",transition:"transform 0.2s,box-shadow 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px) scale(1.02)";e.currentTarget.style.boxShadow=`0 12px 32px ${C.shadow}`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 2px 16px ${C.shadow}`;}}
                  >
                    <div style={{fontSize:44,marginBottom:8}}>{item.emoji}</div>
                    <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,fontWeight:700,color:C.forest,marginBottom:5}}>{item.label}</div>
                    <div style={{fontSize:12,color:"#666",lineHeight:1.6,fontStyle:"italic"}}>{item.desc}</div>
                  </div>
                ))}
                <div onClick={()=>setShowVAdd(true)} style={{...card(),textAlign:"center",cursor:"pointer",border:`2px dashed ${C.gold}`,background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:150,transition:"all 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=`${C.gold}10`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{fontSize:28,color:C.gold}}>+</div>
                  <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>Add Vision Card</div>
                </div>
              </div>
              {showVAdd&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
                  <div style={{...card(),width:320,maxWidth:"90vw"}}>
                    <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,color:C.forest,fontWeight:700,marginBottom:14}}>Add Vision Card</div>
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
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700}}>🪣 Life Bucket List</div>
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

          {tab===8&&<OutreachTracker/>}

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.mist};}
        ::-webkit-scrollbar-thumb{background:${C.olive};border-radius:99px;}
        textarea:focus,input:focus{border-color:${C.gold}!important;box-shadow:0 0 0 3px ${C.gold}22;}
        button:hover{opacity:0.88;transform:translateY(-1px);}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @media(max-width:640px){h1{font-size:20px!important;}}
      `}</style>
    </div>
  );
}
