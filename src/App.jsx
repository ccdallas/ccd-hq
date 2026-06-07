import { useState, useEffect, useCallback } from "react";

const C = {
  bg:"#070a0f",surface:"#0d1117",surface2:"#131920",surface3:"#1a2332",border:"#1e2d3d",
  cyan:"#00e5ff",cyanDim:"rgba(0,229,255,0.08)",cyanGlow:"rgba(0,229,255,0.25)",
  gold:"#D99201",goldDim:"rgba(217,146,1,0.1)",goldGlow:"rgba(217,146,1,0.3)",
  amber:"#ff9900",amberDim:"rgba(255,153,0,0.08)",magenta:"#ff0080",magDim:"rgba(255,0,128,0.08)",
  green:"#00ff88",greenDim:"rgba(0,255,136,0.08)",red:"#ff3355",
  text:"#e2e8f0",textDim:"#8899aa",textMute:"#445566",shadow:"rgba(0,229,255,0.12)",purple:"#a78bfa",
};

const AFFIRMATIONS=[
  "I didn't leave healthcare. I learned to defend it. AND THE WORLD IS ABOUT TO KNOW MY NAME.",
  "I am the Digital First Responder — the bridge between the clinical floor and the security operations center. NO ONE ELSE HAS THIS.",
  "God placed this calling on my life long before I understood it. I walk in it FULLY and WITHOUT APOLOGY.",
  "I am not a non-traditional candidate. I AM THE CANDIDATE THEY DIDN'T KNOW THEY NEEDED.",
  "Every closed door REDIRECTED me closer to my purpose. The detours were the direction.",
  "I protect patients from threats they never see coming. THAT IS SACRED WORK. That is my work.",
  "My 28 years are not a detour. They are my COMPETITIVE ADVANTAGE. Nobody can replicate what I built.",
  "I am building something that will OUTLAST ME — for my family, my family, my family, and every generation after.",
  "The red carpet on August 5th is not an arrival. IT IS A BEGINNING. The world is watching.",
  "I am a woman of faith, a grandmother, a clinician, a DEFENDER. All of it counts. ALL OF IT MATTERS.",
  "Remote, flexible, and fully compensated — the right role ALREADY EXISTS and is looking for me.",
  "I do not shrink to fit job descriptions. I EXPAND ORGANIZATIONS to fit my vision.",
  "Caregiving and career excellence are not in conflict. I AM PROOF that both can coexist.",
  "My mother's care is covered. My children are thriving. My work is meaningful. THIS IS THE LIFE I BUILT.",
  "I walk into every room — virtual or in-person — as THE MOST PREPARED PERSON THERE. Full stop.",
  "Black Hat. DEF CON. WiCyS. FBI Citizens Academy. I MOVE IN ROOMS THAT MATTER.",
  "My expertise is rare. My story is powerful. MY TIME IS NOW. Not later. NOW.",
  "I am not waiting for permission. I AM THE PERMISSION.",
  "Every morning I wake up is another day to get closer to the life I DECLARED over myself.",
  "The Digital First Responder methodology is MY INTELLECTUAL PROPERTY and my legacy.",
  "I cannot be moved by uncertainty or delay. I AM ROOTED IN PURPOSE. Watch me move.",
  "Milwaukee is a season of love and service. Atlanta is home. THE REMOTE WORLD IS MY OFFICE.",
  "I answer to God first, family second, and mission always. EVERYTHING ELSE FOLLOWS.",
  "I log wins, not complaints. I BUILD MOMENTUM, not excuses. Every single day.",
  "The organization that hires me will wonder HOW THEY EVER OPERATED WITHOUT ME.",
  "I am healthy, protected, purposeful, and covered. THIS IS MY DECLARATION. I speak it. I own it.",
  "Setbacks are DATA. I analyze them, adjust, and KEEP MOVING FORWARD. Always forward.",
  "I build labs, walk red carpets, and tuck in my grandkids — ALL IN THE SAME WEEK. That is my life.",
  "Every cert I earn, every scenario I build, every person I mentor — IT COMPOUNDS. The work compounds.",
  "I am a Digital First Responder. I assess. I contain. I treat. I recover. ALWAYS.",
];

const WEEK_EVENTS={
  "Thu Jun 4":[
    {time:"6:30 AM",title:"Hot Tea #1 ☕",cal:"routine"},
    {time:"7:30 AM",title:"Daily Affirmation + Tea 📖",cal:"routine"},
    {time:"3:30 PM",title:"Digest + Light Walk 🚶‍♀️",cal:"health"},
    {time:"3:45 PM",title:"Grandkids Pickup 👧🏽",cal:"family"},
    {time:"4:00 PM",title:"LEARNING — AWS/TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
    {time:"9:30 PM",title:"Bedtime Routine (CPAP) 😴",cal:"health"},
  ],
  "Fri Jun 5":[
    {time:"All Day",title:"💸 Ignite Payday",cal:"finance"},
    {time:"6:30 AM",title:"Hot Tea #1 ☕",cal:"routine"},
    {time:"4:00 PM",title:"LEARNING — AWS/TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
  ],
  "Sat Jun 6":[
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
    {time:"9:30 PM",title:"LIGHTS OUT 🌙",cal:"routine"},
  ],
  "Sun Jun 7":[
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
    {time:"9:30 PM",title:"LIGHTS OUT 🌙",cal:"routine"},
  ],
  "Mon Jun 8":[
    {time:"6:30 AM",title:"Hot Tea #1 ☕",cal:"routine"},
    {time:"8:00 AM",title:"WiCyS Mentor Cohort 3 Begins 🎓",cal:"special"},
    {time:"4:00 PM",title:"LEARNING — AWS/TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
  ],
  "Tue Jun 9":[
    {time:"6:30 AM",title:"Hot Tea #1 ☕",cal:"routine"},
    {time:"4:00 PM",title:"LEARNING — AWS/TryHackMe 💻",cal:"growth"},
    {time:"6:00 PM",title:"EXERCISE 30 min 🏃‍♀️",cal:"health"},
  ],
  "Wed Jun 10":[
    {time:"6:30 AM",title:"Hot Tea #1 ☕",cal:"routine"},
    {time:"6:00 PM",title:"FBI Atlanta Citizens Academy 🏛️",cal:"special"},
    {time:"🎂",title:"Lexi's 33rd Birthday",cal:"birthday"},
  ],
};

const CAL_COLORS={routine:C.textMute,health:C.red,family:C.gold,growth:C.cyan,finance:C.green,special:C.amber,birthday:C.magenta};
const BLACK_HAT=new Date("2026-08-05T09:00:00");
const EXAM_DATE=new Date("2026-06-28T08:00:00");
const STORE="ccd_hq_v4";

const defaultData=()=>({
  weeklyFocus:"Land remote healthcare cyber role before Milwaukee move",
  weeklyGoals:["Send 5 Black Hat outreach messages","Complete WiCyS mentor onboarding Jun 8-9","AWS or TryHackMe every day"],
  tasks:[
    {id:1,text:"Send Philips intro via Avi D.",done:false},
    {id:2,text:"Update DFR Lab with new IoMT scenario",done:false},
    {id:3,text:"Confirm Black Hat travel + hotel",done:false},
    {id:4,text:"Pack and prep for Milwaukee early July",done:false},
    {id:5,text:"File WOSB certification follow-up",done:false},
  ],
  currentRead:"HCISPP Study Guide + ISA/IEC 62443 Foundational",
  readStatus:"reading",
  weeklyWins:["Advisory council full outreach playbook built","DFR Lab live on GitHub Pages"],
  reflection:"",
  habits:{
    exercise:{label:"Exercise (30 min)",icon:"🏃‍♀️",days:[false,false,false,false,false,false,false]},
    affirmation:{label:"Daily Affirmation",icon:"⚡",days:[false,false,false,false,false,false,false]},
    learning:{label:"AWS / TryHackMe",icon:"💻",days:[false,false,false,false,false,false,false]},
    water:{label:"Water Goal",icon:"💧",days:[false,false,false,false,false,false,false]},
    bedtime:{label:"Bedtime Routine (CPAP)",icon:"😴",days:[false,false,false,false,false,false,false]},
  },
  quarterlyGoals:{
    career:["Land FTE or contract remote role with benefits","Send 25 targeted org outreach messages","Black Hat red carpet Aug 5"],
    health:["Exercise 5x/week","CPAP compliance every night","O2 monitoring daily"],
    finance:["Purchase own health benefits if no FTE","Track every dollar Jun-Aug","Build 1-month emergency buffer"],
    personal:["Support Mom's dementia care transition","Milwaukee move early July","my family, my family and my family quality time"],
  },
  quarterlyWins:[],
  debtPaid:0,debtGoal:5000,savingsAmount:0,savingsGoal:3000,netWorth:0,
  creditScore:550,creditGoal:800,
  creditActions:[
    {id:1,text:"Pull all 3 free reports from AnnualCreditReport.com",done:false,priority:"high"},
    {id:2,text:"Dispute any errors on Equifax, Experian, TransUnion",done:false,priority:"high"},
    {id:3,text:"Get a secured credit card (Capital One Platinum or Discover it)",done:false,priority:"high"},
    {id:4,text:"Set all bills to autopay — no more late payments",done:false,priority:"high"},
    {id:5,text:"Pay down collection accounts under $500 first (quick wins)",done:false,priority:"medium"},
    {id:6,text:"Request goodwill deletion letters for paid collections",done:false,priority:"medium"},
    {id:7,text:"Keep utilization under 10% on any new cards",done:false,priority:"medium"},
    {id:8,text:"Do NOT close old accounts — length of history matters",done:false,priority:"low"},
    {id:9,text:"Add yourself as authorized user on a trusted account",done:false,priority:"low"},
    {id:10,text:"Monitor score monthly via Credit Karma or Experian app",done:false,priority:"low"},
  ],
  creditNotes:"",
  monthlyReflection:{wins:"",challenge:"",grateful:"",learned:"",health:"",growth:"",different:"",intention:""},
  lifeVision:"To become the most recognized Digital First Responder in healthcare cybersecurity — protecting patients, empowering clinicians, and building generational wealth that blesses my family for decades.",
  nonNegotiables:["God First — always","Family is the mission","Health is wealth","Build something that outlasts me"],
  focusBuckets:[
    {title:"Wellness — Mind, Body and Soul",items:["Daily affirmation","30 min exercise","CPAP + O2 every night","Water goal daily"]},
    {title:"Wealth ERA",items:["Remote role with benefits","Federal sub-contracting pipeline","3-tier consulting services live","Savings buffer growing"]},
    {title:"Personal Power",items:["Black Hat red carpet Aug 5","WiCyS mentor cohort 3","HCISPP study plan","DFR Lab expanding"]},
    {title:"Legacy and Love",items:["Mom's care covered","my family, my family and my family thriving","WOSB certified","PhD deferred — not abandoned"]},
  ],
  bucketList:[
    {text:"Walk the Black Hat red carpet 🎬",done:true},
    {text:"Keynote a major cybersecurity conference",done:false},
    {text:"Publish my ER book — the sign-in notes, wild names and floor stories from the early 2000s 📖",done:false},
    {text:"Publish a book on Digital First Response methodology",done:false},
    {text:"Take my family to her first college campus tour",done:false},
    {text:"Travel to West Africa (Ghana / Senegal)",done:false},
    {text:"Own a home outright",done:false},
    {text:"See my family go viral for something he built",done:false},
    {text:"Launch a healthcare cybersecurity nonprofit",done:false},
    {text:"Get on stage at DEF CON as a speaker",done:false},
    {text:"Retire my mother comfortably",done:false},
    {text:"Help finance Lexi's education 🎓",done:false},
    {text:"Reach an 800 credit score — reclaim what's mine 💳",done:false},
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
    {emoji:"📖",label:"ER Book Published",desc:"The stories from the floor — the early 2000s, unfiltered."},
    {emoji:"🎓",label:"Lexi's Degree",desc:"Help my daughter get her education. Legacy investment."},
    {emoji:"💳",label:"800 Credit Score",desc:"Reclaimed. Rebuilt. MINE again."},
  ],
  ideasParking:[],savedBriefing:"",lastBriefingDate:"",gymLog:[],
});

function loadData(){
  try{const r=localStorage.getItem(STORE);if(r)return{...defaultData(),...JSON.parse(r)};}catch{}
  try{const r=localStorage.getItem("ccd_hq_v3");if(r){const d={...defaultData(),...JSON.parse(r)};localStorage.setItem(STORE,JSON.stringify(d));return d;}}catch{}
  return defaultData();
}
function saveData(d){try{localStorage.setItem(STORE,JSON.stringify(d));}catch{}}

function useFadeIn(dep){
  const [v,setV]=useState(false);
  useEffect(()=>{setV(false);const t=setTimeout(()=>setV(true),40);return()=>clearTimeout(t);},[dep]);
  return v;
}

const card=(x={})=>({background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20,boxShadow:"0 4px 24px rgba(0,0,0,0.4)",...x});
const glowCard=(color,x={})=>({...card(),border:`1px solid ${color}33`,boxShadow:`0 0 0 1px ${color}11, 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 ${color}11`,...x});

const ST={fontFamily:"system-ui,sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cyan,fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:6};
const LB={fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:C.textMute,fontWeight:700,marginBottom:6,display:"block"};
const INP={width:"100%",padding:"9px 13px",border:`1px solid ${C.border}`,borderRadius:8,fontFamily:"system-ui,monospace",fontSize:13,color:C.text,background:C.surface2,outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"};

const TABS=["⚡ TODAY","📡 WEEKLY","🌙 MONTHLY","◆ QUARTERLY","🦅 YEARLY","✅ HABITS","🗺️ VISION","🎯 BUCKET","📚 STUDY","💳 CREDIT"];

function Countdown(){
  const [t,setT]=useState({d:0,h:0,m:0,s:0});
  useEffect(()=>{
    const tick=()=>{const diff=BLACK_HAT-new Date();if(diff<=0)return;setT({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});};
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[]);
  return(
    <div style={{...glowCard(C.cyan),background:`linear-gradient(135deg,${C.surface} 0%,#0a1520 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.cyan},transparent)`}}/>
      <div style={{fontSize:9,letterSpacing:"0.3em",color:C.cyan,textTransform:"uppercase",fontWeight:700,marginBottom:12}}>🎬 BLACK HAT USA · SEMPERIS PREMIERE · AUGUST 5 2026</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {[["DAYS",t.d],["HRS",t.h],["MIN",t.m],["SEC",t.s]].map(([l,v])=>(
          <div key={l} style={{textAlign:"center",background:`${C.cyan}08`,border:`1px solid ${C.cyan}22`,borderRadius:8,padding:"10px 12px",minWidth:54,flex:1}}>
            <div style={{fontFamily:"monospace",fontSize:28,fontWeight:900,color:C.cyan,lineHeight:1}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:8,letterSpacing:"0.2em",color:C.textMute,marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,color:C.textDim,marginTop:10,fontStyle:"italic",borderTop:`1px solid ${C.border}`,paddingTop:9}}>You are a Featured Defender. The red carpet is waiting. 🌹</div>
    </div>
  );
}

function Affirmation(){
  const base=Math.floor(Date.now()/86400000)%AFFIRMATIONS.length;
  const [idx,setIdx]=useState(base);
  const [op,setOp]=useState(1);
  const go=(dir)=>{setOp(0);setTimeout(()=>{setIdx(i=>(i+dir+AFFIRMATIONS.length)%AFFIRMATIONS.length);setOp(1);},280);};
  return(
    <div style={{...glowCard(C.gold),background:`linear-gradient(135deg,${C.surface} 0%,#150f00 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
      <div style={{fontSize:9,letterSpacing:"0.3em",color:C.gold,textTransform:"uppercase",fontWeight:700,marginBottom:12}}>⚡ TODAY'S DECLARATION</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:14,color:C.text,lineHeight:1.85,fontStyle:"italic",minHeight:80,opacity:op,transition:"opacity 0.28s"}}>
        "{AFFIRMATIONS[idx]}"
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:9}}>
        <span style={{fontSize:10,color:C.textMute,fontFamily:"monospace"}}>{idx+1}/{AFFIRMATIONS.length}</span>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>go(-1)} style={{background:"transparent",color:C.textDim,border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:13}}>prev</button>
          <button onClick={()=>go(1)} style={{background:C.gold,color:"#000",border:"none",borderRadius:8,padding:"5px 14px",cursor:"pointer",fontSize:13,fontWeight:900}}>next</button>
        </div>
      </div>
    </div>
  );
}

function Briefing({data,onSave}){
  const [text,setText]=useState(data.savedBriefing||"");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const today=new Date().toDateString();
  const days=Math.floor((BLACK_HAT-new Date())/86400000);
  const examDays=Math.max(0,Math.ceil((EXAM_DATE-new Date())/86400000));
  const pending=data.tasks.filter(t=>!t.done);

  const gen=useCallback(async()=>{
    setLoading(true);setErr("");setText("");
    try{
      const prompt=`You are the personal AI command system for Chaunda C. Dallas — healthcare cybersecurity strategist, Digital First Responder, grandmother, woman of faith.\n\nContext:\n- 28 years clinical emergency medicine, now cybersecurity strategist\n- Featured Defender in Semperis "Midnight in the War Room" premiering Black Hat Aug 5 — ${days} days away\n- WiCyS Technical Mentor Cohort 3 starts Jun 8-9\n- Relocating to Milwaukee early July for mother's dementia care\n- Security+ exam in ${examDays} days (target June 28), also studying AWS Cloud Practitioner\n- Weekly focus: "${data.weeklyFocus}"\n- Pending tasks: ${pending.map(t=>t.text).join(", ")||"all clear"}\n\nWrite her morning briefing in exactly 4 sections:\n1. GOOD MORNING, DEFENDER — bold, faith-forward greeting (2 sentences)\n2. TODAY'S MISSION — top 3 specific priorities as commands\n3. ON YOUR RADAR — 2-3 upcoming milestones as facts\n4. YOUR WORD TODAY — one sentence so powerful she would put it on a banner\n\nTone: zero fluff. War room energy. Faith-informed. Direct.`;

      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]}),
      });
      if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e?.error?.message||`HTTP ${res.status}`);}
      const json=await res.json();
      const t=(json.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n")||"Unable to generate.";
      setText(t);onSave(t,today);
    }catch(e){setErr(`Error: ${e.message}`);}
    setLoading(false);
  },[data,days,examDays,pending,today]);

  return(
    <div style={{...glowCard(C.cyan),background:`linear-gradient(160deg,${C.surface} 0%,#050d14 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.cyan},${C.gold},${C.cyan})`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:9,letterSpacing:"0.3em",color:C.cyan,textTransform:"uppercase",fontWeight:700}}>AI MORNING BRIEFING</div>
          <div style={{fontSize:11,color:C.textMute,marginTop:2}}>{data.lastBriefingDate?`Last: ${data.lastBriefingDate}`:"Tap generate for your briefing"}</div>
        </div>
        <button onClick={gen} disabled={loading} style={{background:loading?"transparent":`linear-gradient(135deg,${C.cyan},#0099bb)`,color:loading?C.textDim:"#000",border:loading?`1px solid ${C.border}`:"none",borderRadius:8,padding:"8px 16px",cursor:loading?"not-allowed":"pointer",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
          {loading?"Generating...":text?"Regenerate":"Generate Briefing"}
        </button>
      </div>
      {err&&<div style={{background:"rgba(255,51,85,0.1)",border:"1px solid rgba(255,51,85,0.3)",borderRadius:8,padding:"10px 14px",fontSize:12,color:C.red,marginBottom:12}}>{err}</div>}
      {!text&&!loading&&!err&&<div style={{textAlign:"center",padding:"28px",opacity:0.4}}><div style={{fontSize:32,marginBottom:8}}>⚡</div><div style={{fontSize:12,color:C.textMute}}>AWAITING INITIALIZATION</div></div>}
      {loading&&<div style={{textAlign:"center",padding:"28px"}}><div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.cyan,animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div><div style={{fontSize:10,color:C.textMute}}>Compiling your briefing...</div></div>}
      {text&&!loading&&<div style={{fontFamily:"monospace",fontSize:13,lineHeight:1.9,color:C.text,whiteSpace:"pre-wrap",borderTop:`1px solid ${C.border}`,paddingTop:14}}>{text}</div>}
    </div>
  );
}

function HabitTracker({data,update}){
  const dayLabels=["T","F","Sa","Su","M","T","W"];
  const allChecks=Object.values(data.habits).reduce((a,h)=>a+h.days.filter(Boolean).length,0);
  const totalChecks=Object.keys(data.habits).length*7;
  const score=Math.round((allChecks/totalChecks)*100);
  const scoreColor=score>=80?C.green:score>=50?C.cyan:score>=30?C.gold:C.red;
  const toggle=(habit,i)=>{const h={...data.habits,[habit]:{...data.habits[habit],days:[...data.habits[habit].days]}};h[habit].days[i]=!h[habit].days[i];update({habits:h});};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20,maxWidth:800}}>
      <div style={{...glowCard(scoreColor),position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${scoreColor},transparent)`}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:9,letterSpacing:"0.3em",color:scoreColor,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>HABIT TRACKER</div><div style={{fontSize:13,color:C.textDim}}>Week of Jun 4 · {allChecks}/{totalChecks} completions</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:"monospace",fontSize:40,fontWeight:900,color:scoreColor,lineHeight:1}}>{score}%</div><div style={{fontSize:9,color:C.textMute,letterSpacing:"0.15em"}}>WEEKLY SCORE</div></div>
        </div>
        <div style={{height:4,background:C.surface3,borderRadius:99,overflow:"hidden",marginTop:14}}>
          <div style={{height:"100%",width:`${score}%`,background:`linear-gradient(90deg,${scoreColor},${scoreColor}aa)`,borderRadius:99,transition:"width 0.8s ease"}}/>
        </div>
      </div>
      <div style={card()}>
        <div style={ST}><span>◆</span> Daily Habits</div>
        <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
          <div style={{flex:1}}/>
          <div style={{display:"flex",gap:5}}>
            {[4,5,6,7,8,9,10].map((d,i)=>(
              <div key={i} style={{width:34,height:34,borderRadius:7,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:i===0?`${C.cyan}15`:"transparent",border:i===0?`1px solid ${C.cyan}44`:`1px solid ${C.border}`}}>
                <div style={{fontSize:8,color:i===0?C.cyan:C.textMute}}>{dayLabels[i]}</div>
                <div style={{fontSize:11,fontWeight:700,color:i===0?C.cyan:C.textDim}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        {Object.entries(data.habits).map(([key,habit])=>{
          const done=habit.days.filter(Boolean).length;
          return(
            <div key={key} style={{marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:18}}>{habit.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,color:C.text,fontWeight:600}}>{habit.label}</div>
                  <div style={{height:3,background:C.surface3,borderRadius:99,overflow:"hidden",marginTop:4}}><div style={{height:"100%",width:`${(done/7)*100}%`,background:`linear-gradient(90deg,${C.cyan},${C.gold})`,borderRadius:99,transition:"width 0.4s ease"}}/></div>
                </div>
                <div style={{fontSize:11,color:C.cyan,fontWeight:700,minWidth:28,textAlign:"right",fontFamily:"monospace"}}>{done}/7</div>
              </div>
              <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                {habit.days.map((checked,i)=>(
                  <div key={i} onClick={()=>toggle(key,i)} style={{width:34,height:34,borderRadius:7,cursor:"pointer",background:checked?`${C.cyan}22`:"transparent",border:`1px solid ${checked?C.cyan:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.18s"}}>
                    {checked&&<span style={{color:C.cyan,fontSize:14,fontWeight:900}}>✓</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CreditTab({data,update}){
  const score=data.creditScore||550;
  const goal=data.creditGoal||800;
  const pct=Math.min(100,Math.max(0,((score-300)/(goal-300))*100));
  const scoreColor=score>=740?C.green:score>=670?C.cyan:score>=580?C.gold:C.red;
  const [newAction,setNewAction]=useState("");
  const toggleAction=(id)=>{const updated=(data.creditActions||[]).map(a=>a.id===id?{...a,done:!a.done}:a);update({creditActions:updated});};
  const addAction=()=>{if(!newAction.trim())return;update({creditActions:[...(data.creditActions||[]),{id:Date.now(),text:newAction,done:false,priority:"medium"}]});setNewAction("");};

  const PHASES=[
    {phase:"NOW — Days 1-30",color:C.red,icon:"🚨",steps:["Pull all 3 reports FREE at AnnualCreditReport.com","Dispute every error in writing — inaccuracies can drop score 50-100 pts","Open a secured credit card ($200-500 deposit) — Capital One Platinum or Discover it","Set ALL existing bills to autopay — one late payment = 30-60 point drop","List every collection account with balance and date"]},
    {phase:"PHASE 2 — Months 2-6",color:C.amber,icon:"⚡",steps:["Pay collections under $500 first for quick wins","Send goodwill deletion letters to creditors after paying","Keep credit card utilization UNDER 10% — not 30%, TEN percent","Do NOT close old accounts — age of credit history = 15% of your score","Consider a credit-builder loan from a credit union (Self or local CU)"]},
    {phase:"PHASE 3 — Months 6-18",color:C.green,icon:"🏆",steps:["Request credit limit increase on secured card after 6 months on-time","Graduate from secured to unsecured card — max 1 new account per year","Once score hits 670+, apply for rewards card but treat it like a debit card","Monitor monthly via Experian app (free) — dispute anything new immediately","At 740+ you qualify for most mortgages and best loan rates"]},
  ];

  const MYTHS=[
    {myth:"Checking your own credit hurts your score",fact:"FALSE — soft inquiries never affect your score. Check freely."},
    {myth:"You need to carry a balance to build credit",fact:"FALSE — pay in full every month. Balances cost you interest and raise utilization."},
    {myth:"Closing old cards you don't use helps",fact:"FALSE — closing accounts reduces available credit and lowers account age."},
    {myth:"Collections that are old don't matter",fact:"PARTIALLY TRUE — after 7 years they fall off. You can negotiate removal sooner."},
    {myth:"You can pay someone to fix your credit fast",fact:"FALSE — anything a credit repair company does, you can do FREE yourself."},
  ];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{...glowCard(scoreColor),background:`linear-gradient(135deg,${C.surface},#0a0500)`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.red},${C.gold},${C.green})`}}/>
        <div style={{fontSize:9,letterSpacing:"0.3em",color:scoreColor,textTransform:"uppercase",fontWeight:700,marginBottom:6}}>💳 CREDIT REBUILD COMMAND CENTER</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:20,color:C.text,fontWeight:700,marginBottom:4}}>740 once. 800 next. No shortcuts — just strategy.</div>
        <div style={{fontSize:12,color:C.textDim}}>You know what an 800 feels like. You are going back — and this time it is permanent.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        <div style={{...glowCard(scoreColor),textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
          <div style={{fontSize:9,letterSpacing:"0.2em",color:scoreColor,fontWeight:700,marginBottom:8}}>CURRENT SCORE</div>
          <div style={{fontFamily:"monospace",fontSize:64,fontWeight:900,color:scoreColor,lineHeight:1}}>{score}</div>
          <div style={{fontSize:11,color:C.textMute,marginTop:4}}>Target: {goal}</div>
          <input type="range" min={300} max={850} value={score} onChange={e=>update({creditScore:+e.target.value})} style={{width:"100%",marginTop:14,accentColor:scoreColor}}/>
          <input type="number" min={300} max={850} value={score} onChange={e=>update({creditScore:+e.target.value})} style={{...INP,textAlign:"center",marginTop:8,fontSize:14,fontWeight:700}}/>
        </div>
        <div style={card()}>
          <div style={ST}><span>◆</span> Score Roadmap</div>
          {[{range:"300-579",lo:300,hi:579,label:"Poor — Limited options",color:C.red},{range:"580-669",lo:580,hi:669,label:"Fair — Building phase",color:C.amber},{range:"670-739",lo:670,hi:739,label:"Good — Most approvals",color:C.gold},{range:"740-799",lo:740,hi:799,label:"Very Good — Great rates",color:C.cyan},{range:"800-850",lo:800,hi:850,label:"Exceptional — THE GOAL",color:C.green}].map(({range,lo,hi,label,color})=>{
            const active=score>=lo&&score<=hi;
            return(
              <div key={range} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",borderRadius:7,marginBottom:4,background:active?`${color}15`:"transparent",border:`1px solid ${active?color+"44":C.border}`,transition:"all 0.2s"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0}}/>
                <div style={{fontSize:11,fontFamily:"monospace",color:active?color:C.textMute,fontWeight:active?700:400,minWidth:80}}>{range}</div>
                <div style={{fontSize:12,color:active?C.text:C.textMute}}>{label}</div>
                {active&&<div style={{marginLeft:"auto",fontSize:9,color:color,fontWeight:700}}>YOU ARE HERE</div>}
              </div>
            );
          })}
          <div style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.textMute,marginBottom:5}}><span>Progress to {goal}</span><span style={{color:scoreColor}}>{Math.round(pct)}%</span></div>
            <div style={{height:6,background:C.surface3,borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.red},${C.gold},${C.green})`,borderRadius:99,transition:"width 0.8s ease"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.textMute,marginTop:3}}><span>300</span><span style={{color:scoreColor,fontWeight:700}}>{score}</span><span>850</span></div>
          </div>
        </div>
      </div>
      {PHASES.map((p,i)=>(
        <div key={i} style={{...glowCard(p.color),position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{fontSize:20}}>{p.icon}</span><div style={{fontSize:11,fontWeight:700,color:p.color,letterSpacing:"0.1em",textTransform:"uppercase"}}>{p.phase}</div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {p.steps.map((step,j)=>(<div key={j} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 10px",borderRadius:7,background:C.surface2,border:`1px solid ${C.border}`}}><span style={{color:p.color,flexShrink:0,fontFamily:"monospace",marginTop:1}}>→</span><span style={{fontSize:12,color:C.textDim,lineHeight:1.5}}>{step}</span></div>))}
          </div>
        </div>
      ))}
      <div style={card()}>
        <div style={ST}><span>◆</span> Action Checklist</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
          {(data.creditActions||[]).map(action=>{
            const pc=action.priority==="high"?C.red:action.priority==="medium"?C.amber:C.textMute;
            return(
              <div key={action.id} onClick={()=>toggleAction(action.id)} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"9px 12px",borderRadius:8,background:action.done?`${C.green}08`:C.surface2,border:`1px solid ${action.done?C.green+"33":C.border}`,borderLeft:`3px solid ${action.done?C.green:pc}`,transition:"all 0.15s"}}>
                <div style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${action.done?C.green:C.border}`,background:action.done?`${C.green}22`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {action.done&&<span style={{color:C.green,fontSize:11,fontWeight:900}}>✓</span>}
                </div>
                <span style={{fontSize:12,color:action.done?C.textMute:C.text,textDecoration:action.done?"line-through":"none",flex:1}}>{action.text}</span>
                <span style={{fontSize:9,color:pc,fontWeight:700,textTransform:"uppercase",flexShrink:0}}>{action.priority}</span>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:6}}>
          <input value={newAction} onChange={e=>setNewAction(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addAction()} placeholder="Add credit action..." style={{...INP,flex:1}}/>
          <button onClick={addAction} style={{background:C.green,color:"#000",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontWeight:900,fontSize:14}}>+</button>
        </div>
      </div>
      <div style={card()}>
        <div style={ST}><span>◆</span> Credit Myth Busters</div>
        {MYTHS.map((mf,i)=>(<div key={i} style={{marginBottom:10,padding:"10px 14px",borderRadius:8,background:C.surface2,border:`1px solid ${C.border}`}}><div style={{fontSize:12,color:C.red,fontWeight:700,marginBottom:3}}>MYTH: {mf.myth}</div><div style={{fontSize:12,color:C.green}}>FACT: {mf.fact}</div></div>))}
      </div>
      <div style={card()}>
        <div style={ST}><span>◆</span> Notes and Tracker</div>
        <textarea value={data.creditNotes||""} onChange={e=>update({creditNotes:e.target.value})} rows={4} placeholder="Track disputes filed, accounts negotiated, letters sent..." style={{...INP,resize:"vertical",lineHeight:1.7}}/>
      </div>
      <div style={{...glowCard(C.magenta),position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.magenta},${C.gold})`}}/>
        <div style={{fontSize:9,letterSpacing:"0.3em",color:C.magenta,fontWeight:700,marginBottom:6}}>🎓 LEXI'S EDUCATION FUND — LEGACY INVESTMENT</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:16,color:C.text,fontWeight:700,marginBottom:8}}>Help Finance Your Daughter's Future</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{icon:"📋",title:"FAFSA First",desc:"Even at 33, Lexi should file FAFSA every year. Pell Grants are free money — no repayment. Income-based."},
            {icon:"🏫",title:"Community College Route",desc:"2 years CC + 2 years university cuts costs 40-60%. Credits transfer. Same degree outcome."},
            {icon:"💰",title:"529 Plan",desc:"A 529 education savings plan grows tax-free. Even $50/month adds up. Georgia Path2College 529 is solid."},
            {icon:"🤝",title:"Employer Tuition",desc:"Many healthcare orgs offer tuition assistance for dependents. Ask HR once you land that role."},
          ].map(({icon,title,desc})=>(<div key={title} style={{padding:12,borderRadius:8,background:C.surface2,border:`1px solid ${C.border}`}}><div style={{fontSize:18,marginBottom:5}}>{icon}</div><div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:3}}>{title}</div><div style={{fontSize:11,color:C.textMute,lineHeight:1.5}}>{desc}</div></div>))}
        </div>
        <div style={{marginTop:12,padding:"10px 14px",borderRadius:8,background:`${C.magenta}08`,border:`1px solid ${C.magenta}22`,fontSize:12,color:C.textDim,lineHeight:1.7}}>
          <span style={{color:C.magenta,fontWeight:700}}>Strategy: </span>
          Fix YOUR credit first (6-12 months). A strong score gives you access to better rates on any co-signer loans. The 800 goal and Lexi's education are sequential, not competing. Rebuild the foundation, then build the legacy on top of it.
        </div>
      </div>
    </div>
  );
}

function StudyTab(){
  const [examDays,setExamDays]=useState(0);
  useEffect(()=>{setExamDays(Math.max(0,Math.ceil((EXAM_DATE-new Date())/86400000)));},[]);
  const SCHEDULE=[
    {time:"8:00-9:00",tag:"SEC+",tagColor:C.cyan,title:"Security+ Core Block",desc:"1 Gibson chapter + Professor Messer video + 5 ExamCompass questions. Explain the concept back before moving on."},
    {time:"9:00-9:30",tag:"LAB",tagColor:C.green,title:"TryHackMe: HealthHackHer (4x/week)",desc:"Pre-Security path · Network Fundamentals · OSINT. Skip Tue/Thu — replace with AWS Skill Builder."},
    {time:"9:30-10:00",tag:"BREAK",tagColor:C.textMute,title:"Hard Stop — Move Your Body",desc:"Walk, stretch, water. No screens. Spaced repetition requires rest intervals."},
    {time:"10:00-11:30",tag:"AWS",tagColor:C.amber,title:"AWS Cloud Practitioner Block",desc:"AWS Skill Builder CLF-C02 modules in order. Cloud Concepts → Security → Technology → Billing."},
    {time:"11:30-12:00",tag:"AI QUIZ",tagColor:C.purple,title:"Active Recall with Claude",desc:"Paste today's topics → ask Claude for 10 scenario-based exam questions. Flag misses in Apple Notes."},
    {time:"12:00-1:00",tag:"LUNCH",tagColor:C.textMute,title:"Real Lunch — Full Break",desc:"No passive study. Your brain files away morning material during downtime."},
    {time:"1:00-2:30",tag:"SEC+",tagColor:C.cyan,title:"Security+ Deep Dive (Rotating Domain)",desc:"Mon/Wed: GRC + compliance. Tue/Thu: Network security, cryptography. Fri: Threats, vulnerabilities, IR."},
    {time:"3:00-4:30",tag:"ROTATING",tagColor:C.gold,title:"Afternoon Specialty Block",desc:"Mon/Wed: HCISPP resources. Tue/Thu: AWS Skill Builder. Fri: IEC 62443. Weekend: Practice exams."},
    {time:"Evening",tag:"OPTIONAL",tagColor:C.textMute,title:"DFR Lab OR LinkedIn (never both)",desc:"Alternating nights only. If exhausted, skip entirely. Rest is part of the system."},
  ];
  const PHASES=[
    {num:"PHASE 1",days:"Days 1-7",dates:"Jun 7-13",title:"FOUNDATION",color:C.cyan,items:["SEC+ Domains 1-2: General Security + Threats","AWS: Cloud Concepts + Economics (Module 1-2)","Daily 10-question Claude quiz each cert","Flag weak areas in Apple Notes #sec-misses","ExamCompass baseline score by Day 5"]},
    {num:"PHASE 2",days:"Days 8-14",dates:"Jun 14-20",title:"DEPTH",color:C.amber,items:["SEC+ Domains 3-4: Architecture + Implementation","AWS: Security, Compliance + Technology (S3, EC2, IAM)","TryHackMe: Network Fundamentals rooms","First full Sec+ practice exam — mine it for gaps","Map HCISPP overlap: where does Sec+ content apply?"]},
    {num:"PHASE 3",days:"Days 15-21",dates:"Jun 21-27",title:"SIMULATION",color:C.green,items:["SEC+ Domains 4-5: Operations + GRC","AWS: Billing + full CLF-C02 practice exam","Daily timed 30-question mixed practice","PBQ (Performance-Based Question) drills","Day 20: light review only. Day 21: rest and sleep."]},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{...glowCard(C.cyan),background:`linear-gradient(135deg,${C.surface},#020810)`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.cyan},${C.amber},${C.green})`}}/>
        <div style={{fontSize:9,letterSpacing:"0.3em",color:C.cyan,textTransform:"uppercase",fontWeight:700,marginBottom:6}}>STUDY COMMAND CENTER</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:20,color:C.text,fontWeight:700,marginBottom:4}}>21-Day Dual Cert Sprint</div>
        <div style={{fontSize:12,color:C.textDim}}>CompTIA Security+ SY0-701 · AWS Cloud Practitioner CLF-C02</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{...glowCard(C.cyan),position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:C.cyan}}/>
          <div style={{fontSize:9,letterSpacing:"0.2em",color:C.cyan,fontWeight:700,marginBottom:6}}>SECURITY+ SY0-701</div>
          <div style={{display:"flex",alignItems:"baseline",gap:6}}><span style={{fontFamily:"monospace",fontSize:44,fontWeight:900,color:C.cyan,lineHeight:1}}>{examDays}</span><span style={{fontSize:12,color:C.textDim}}>days</span></div>
          <div style={{fontSize:11,color:C.textMute,marginTop:4}}>Target exam: June 28, 2026</div>
        </div>
        <div style={{...glowCard(C.amber),position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:C.amber}}/>
          <div style={{fontSize:9,letterSpacing:"0.2em",color:C.amber,fontWeight:700,marginBottom:6}}>AWS CLOUD PRACTITIONER</div>
          <div style={{display:"flex",alignItems:"baseline",gap:6}}><span style={{fontFamily:"monospace",fontSize:44,fontWeight:900,color:C.amber,lineHeight:1}}>{examDays}</span><span style={{fontSize:12,color:C.textDim}}>days</span></div>
          <div style={{fontSize:11,color:C.textMute,marginTop:4}}>Parallel sprint — same 21-day window</div>
        </div>
      </div>
      <div style={card()}>
        <div style={ST}><span>◆</span> Daily Schedule — Mon-Fri</div>
        <div style={{border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
          {SCHEDULE.map((s,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"90px auto 1fr",borderBottom:i<SCHEDULE.length-1?`1px solid ${C.border}`:"none"}}>
              <div style={{background:C.surface2,padding:"12px 14px",display:"flex",alignItems:"center",fontFamily:"monospace",fontSize:10,color:C.textMute,borderRight:`1px solid ${C.border}`}}>{s.time}</div>
              <div style={{padding:"12px 10px",display:"flex",alignItems:"center",borderRight:`1px solid ${C.border}`}}><span style={{fontSize:9,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",padding:"3px 7px",borderRadius:4,background:`${s.tagColor}15`,color:s.tagColor,border:`1px solid ${s.tagColor}33`,whiteSpace:"nowrap"}}>{s.tag}</span></div>
              <div style={{padding:"12px 14px"}}><div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:2}}>{s.title}</div><div style={{fontSize:11,color:C.textMute,lineHeight:1.5}}>{s.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {PHASES.map((p,i)=>(
          <div key={i} style={{...glowCard(p.color),position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
            <div style={{fontSize:9,letterSpacing:"0.2em",color:p.color,fontWeight:700,marginBottom:2}}>{p.num} · {p.days}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,color:C.text,marginBottom:2}}>{p.title}</div>
            <div style={{fontSize:10,color:C.textMute,fontFamily:"monospace",marginBottom:10}}>{p.dates}</div>
            {p.items.map((item,j)=>(<div key={j} style={{fontSize:11,color:C.textDim,padding:"5px 0",borderTop:`1px solid ${C.border}`,display:"flex",gap:7,alignItems:"flex-start",lineHeight:1.4}}><span style={{color:p.color,flexShrink:0}}>→</span>{item}</div>))}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[
          {icon:"🎯",title:"Active Recall Quizzing",color:C.cyan,desc:"After each chapter, ask Claude for 10 scenario-based SY0-701 questions. Wrong answers get a mini-lesson immediately.",prompt:"I just finished Security+ Domain 2 on malware types. Give me 10 scenario-based questions. After I answer, explain what I got wrong."},
          {icon:"🏥",title:"Healthcare Context Anchoring",color:C.green,desc:"Your 28 years of clinical context is a cheat code. Translate every concept into a healthcare or IoMT scenario.",prompt:"Explain authentication vs authorization using an Epic EMR login scenario in an ER setting."},
          {icon:"🔁",title:"Feynman Technique Loop",color:C.amber,desc:"Explain a concept to Claude as if teaching a new ER tech. Claude identifies gaps. Highest-ROI study method.",prompt:"I'll explain PKI like I'm teaching a new ER tech. Interrupt me if I get anything wrong."},
          {icon:"📋",title:"Gap Tracking System",color:C.purple,desc:"Every missed question goes into Apple Notes under #sec-misses or #aws-misses. Morning warm-up = yesterday's misses.",prompt:"Quiz me on these specific weak areas before I start today's new material: [paste list]"},
        ].map((m,i)=>(
          <div key={i} style={{...glowCard(m.color)}}>
            <div style={{fontSize:22,marginBottom:8}}>{m.icon}</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>{m.title}</div>
            <div style={{fontSize:11,color:C.textMute,lineHeight:1.6,marginBottom:10}}>{m.desc}</div>
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderLeft:`3px solid ${m.color}`,borderRadius:6,padding:"9px 12px",fontFamily:"monospace",fontSize:10,color:m.color,lineHeight:1.6}}>{m.prompt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState(0);
  const [data,setData]=useState(loadData);
  const [newTask,setNewTask]=useState("");
  const [newWin,setNewWin]=useState("");
  const [newBucket,setNewBucket]=useState("");
  const [newIdea,setNewIdea]=useState("");
  const [newVision,setNewVision]=useState({emoji:"⚡",label:"",desc:""});
  const [showVAdd,setShowVAdd]=useState(false);
  const visible=useFadeIn(tab);

  const update=useCallback((patch)=>{setData(prev=>{const next={...prev,...patch};saveData(next);return next;});},[]);
  const toggleTask=(id)=>update({tasks:data.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)});
  const addTask=()=>{if(!newTask.trim())return;update({tasks:[...data.tasks,{id:Date.now(),text:newTask,done:false}]});setNewTask("");};
  const addWin=()=>{if(!newWin.trim())return;update({weeklyWins:[...data.weeklyWins,newWin]});setNewWin("");};
  const toggleBucket=(i)=>{const b=[...data.bucketList];b[i]={...b[i],done:!b[i].done};update({bucketList:b});};
  const addBucketItem=()=>{if(!newBucket.trim())return;update({bucketList:[...data.bucketList,{text:newBucket,done:false}]});setNewBucket("");};
  const addIdea=()=>{if(!newIdea.trim())return;update({ideasParking:[...data.ideasParking,newIdea]});setNewIdea("");};
  const addVision=()=>{if(!newVision.label)return;update({visionBoard:[...data.visionBoard,{...newVision}]});setNewVision({emoji:"⚡",label:"",desc:""});setShowVAdd(false);};
  const saveBriefing=(t,d)=>update({savedBriefing:t,lastBriefingDate:d});
  const today="Thu Jun 4";

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif",color:C.text,position:"relative"}}>
      <div style={{position:"fixed",inset:0,backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,backgroundSize:"40px 40px",opacity:0.25,pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:600,height:200,background:`radial-gradient(ellipse at top,${C.cyan}08,transparent 70%)`,pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1,padding:"20px 20px 0",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:6}}>
          <div>
            <div style={{fontSize:9,letterSpacing:"0.35em",color:C.cyan,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>DIGITAL FIRST RESPONDER HQ</div>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:28,color:C.text,margin:"3px 0 4px",fontWeight:900}}>CHAUNDA C. DALLAS</h1>
            <div style={{fontSize:10,color:C.textMute,fontFamily:"monospace"}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase()}</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["🎬","AUG 5","BLACK HAT",C.cyan],["🎓","JUN 8","WiCyS",C.gold],["✈️","EARLY JUL","MILWAUKEE",C.amber],["💳","800","CREDIT GOAL",C.green]].map(([em,d,l,color])=>(
              <div key={l} style={{background:C.surface,border:`1px solid ${color}33`,borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
                <div style={{fontSize:14}}>{em}</div>
                <div style={{fontSize:11,color:color,fontWeight:700,fontFamily:"monospace"}}>{d}</div>
                <div style={{fontSize:8,color:C.textMute,letterSpacing:"0.1em"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:1,marginTop:18,overflowX:"auto",paddingBottom:2,scrollbarWidth:"none"}}>
          {TABS.map((t,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{padding:"9px 14px",borderRadius:"8px 8px 0 0",border:`1px solid ${tab===i?C.cyan+"44":C.border}`,borderBottom:"none",cursor:"pointer",background:tab===i?C.surface:`${C.surface}88`,color:tab===i?C.cyan:C.textMute,fontFamily:"system-ui,monospace",fontSize:11,fontWeight:tab===i?700:400,letterSpacing:"0.05em",transition:"all 0.18s",whiteSpace:"nowrap",flexShrink:0}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{position:"relative",zIndex:1,background:C.surface,minHeight:"calc(100vh - 140px)",borderTop:`1px solid ${C.border}`,paddingBottom:60}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"22px 18px",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(10px)",transition:"all 0.3s ease"}}>

          {tab===0&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}><Countdown/><Affirmation/></div>
              <Briefing data={data} onSave={saveBriefing}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <div style={card()}>
                  <div style={ST}><span>◆</span> Today's Calendar</div>
                  {WEEK_EVENTS[today].map((ev,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"8px 10px",borderRadius:7,background:C.surface2,borderLeft:`3px solid ${CAL_COLORS[ev.cal]||C.cyan}`,marginBottom:5}}><div style={{fontSize:10,color:C.textMute,fontWeight:700,minWidth:65,fontFamily:"monospace"}}>{ev.time}</div><div style={{fontSize:12,color:C.text}}>{ev.title}</div></div>))}
                </div>
                <div style={card()}>
                  <div style={ST}><span>◆</span> Active Tasks</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                    {data.tasks.map(t=>(<div key={t.id} onClick={()=>toggleTask(t.id)} style={{display:"flex",gap:8,alignItems:"center",cursor:"pointer",padding:"8px 10px",borderRadius:7,background:t.done?`${C.green}08`:C.surface2,border:`1px solid ${t.done?C.green+"33":C.border}`,transition:"all 0.15s"}}>
                      <div style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${t.done?C.green:C.border}`,background:t.done?`${C.green}22`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{t.done&&<span style={{color:C.green,fontSize:11,fontWeight:900}}>✓</span>}</div>
                      <span style={{fontSize:12,color:t.done?C.textMute:C.text,textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                    </div>))}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Add task..." style={INP}/>
                    <button onClick={addTask} style={{background:C.cyan,color:"#000",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:900}}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <div style={{...glowCard(C.cyan),textAlign:"center",padding:"16px 20px"}}><div style={{fontFamily:"Georgia,serif",fontSize:15,color:C.text,fontStyle:"italic"}}>"{AFFIRMATIONS[Math.floor(Date.now()/86400000)%AFFIRMATIONS.length]}"</div></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
                <div style={card()}>
                  <div style={ST}><span>◆</span> Weekly Focus</div>
                  <input value={data.weeklyFocus} onChange={e=>update({weeklyFocus:e.target.value})} style={INP}/>
                  <div style={{marginTop:14}}>
                    <span style={LB}>Goals This Week</span>
                    {data.weeklyGoals.map((g,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:C.surface2,border:`1px solid ${C.border}`,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:C.cyan}}>→</span>{g}</div>))}
                  </div>
                </div>
                <div style={card()}>
                  <div style={ST}><span>◆</span> Currently Studying</div>
                  <input value={data.currentRead} onChange={e=>update({currentRead:e.target.value})} style={INP}/>
                  <div style={{display:"flex",gap:6,marginTop:10}}>
                    {["reading","paused","completed"].map(s=>(
                      <button key={s} onClick={()=>update({readStatus:s})} style={{flex:1,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",background:data.readStatus===s?`${C.cyan}22`:"transparent",color:data.readStatus===s?C.cyan:C.textMute,border:`1px solid ${data.readStatus===s?C.cyan+"44":C.border}`,borderRadius:7,padding:"7px",cursor:"pointer",fontWeight:700}}>{s}</button>
                    ))}
                  </div>
                  <div style={{marginTop:14}}>
                    <span style={LB}>Wins This Week</span>
                    {data.weeklyWins.map((w,i)=>(<div key={i} style={{padding:"6px 10px",borderRadius:6,background:`${C.green}08`,border:`1px solid ${C.green}22`,marginBottom:5,fontSize:12,borderLeft:`3px solid ${C.green}`,color:C.text}}>🎉 {w}</div>))}
                    <div style={{display:"flex",gap:6,marginTop:7}}>
                      <input value={newWin} onChange={e=>setNewWin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addWin()} placeholder="Log a win..." style={{...INP,flex:1}}/>
                      <button onClick={addWin} style={{background:C.gold,color:"#000",border:"none",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:900}}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={card()}>
                <div style={ST}><span>◆</span> Week of Jun 4-10, 2026</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
                  {Object.keys(WEEK_EVENTS).map(day=>(
                    <div key={day} style={{background:day===today?`${C.cyan}08`:C.surface2,borderRadius:8,padding:"9px 7px",border:day===today?`1px solid ${C.cyan}44`:`1px solid ${C.border}`}}>
                      <div style={{fontSize:9,fontWeight:700,color:day===today?C.cyan:C.textMute,marginBottom:5}}>{day}</div>
                      {WEEK_EVENTS[day].filter(e=>e.cal!=="routine").slice(0,3).map((ev,i)=>(<div key={i} style={{fontSize:8,padding:"2px 4px",borderRadius:3,marginBottom:2,background:`${CAL_COLORS[ev.cal]||C.cyan}15`,color:CAL_COLORS[ev.cal]||C.cyan,fontWeight:600,lineHeight:1.3}}>{ev.title.length>22?ev.title.slice(0,20)+"...":ev.title}</div>))}
                    </div>
                  ))}
                </div>
              </div>
              <div style={card()}><div style={ST}><span>◆</span> Reflection</div><textarea value={data.reflection} onChange={e=>update({reflection:e.target.value})} rows={4} placeholder="What's on your mind? Wins, thoughts, gratitude..." style={{...INP,resize:"vertical",lineHeight:1.7}}/></div>
            </div>
          )}

          {tab===2&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...glowCard(C.gold),gridColumn:"1/-1",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.gold},${C.amber})`}}/>
                <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:C.text}}>June 2026 — Monthly Reflection</div>
                <div style={{fontSize:12,color:C.textDim,marginTop:4}}>Consistency beats intensity. What does this month say about you?</div>
              </div>
              {[["wins","Biggest Wins","What are you celebrating?"],["challenge","Biggest Challenge","Be honest."],["grateful","Most Grateful For","What showed up?"],["learned","Most Important Lesson","What shifted?"],["health","Your Health","Body and mind."],["growth","Growth","What expanded?"],["different","Do Differently","No judgment."],["intention","Next Month's Intention","One sentence."]].map(([key,title,ph])=>(
                <div key={key} style={card()}>
                  <div style={{fontSize:13,color:C.cyan,fontWeight:700,marginBottom:9}}>{title}</div>
                  <textarea value={data.monthlyReflection[key]||""} onChange={e=>update({monthlyReflection:{...data.monthlyReflection,[key]:e.target.value}})} rows={3} placeholder={ph} style={{...INP,resize:"vertical",lineHeight:1.7,fontSize:12}}/>
                </div>
              ))}
            </div>
          )}

          {tab===3&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...glowCard(C.cyan),gridColumn:"1/-1",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.cyan},${C.gold},${C.amber})`}}/>
                <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:C.text}}>Q2 2026 — Apr to Jun</div>
                <div style={{fontSize:12,color:C.textDim,marginTop:4}}>Black Hat season. Pre-sell runway. Milwaukee transition. Build the pipeline.</div>
              </div>
              {Object.entries(data.quarterlyGoals).map(([cat,goals])=>(
                <div key={cat} style={card()}>
                  <div style={ST}><span>◆</span>{cat==="career"?"CAREER":cat==="health"?"HEALTH":cat==="finance"?"FINANCE":"PERSONAL"}</div>
                  {goals.map((g,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:C.surface2,border:`1px solid ${C.border}`,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:C.gold}}>◆</span>{g}</div>))}
                </div>
              ))}
              <div style={card()}>
                <div style={ST}><span>◆</span> Finances Q2 2026</div>
                {[["Debt Paid Off","debtPaid","debtGoal"],["Savings Progress","savingsAmount","savingsGoal"]].map(([label,valKey,goalKey])=>(
                  <div key={label} style={{marginBottom:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:600,color:C.text}}>{label}</span><span style={{fontSize:11,color:C.textMute,fontFamily:"monospace"}}>${data[valKey].toLocaleString()} / ${data[goalKey].toLocaleString()}</span></div>
                    <div style={{height:6,background:C.surface3,borderRadius:99,overflow:"hidden",marginBottom:6}}><div style={{height:"100%",width:`${Math.min((data[valKey]/data[goalKey])*100,100)}%`,background:`linear-gradient(90deg,${C.cyan},${C.gold})`,borderRadius:99}}/></div>
                    <input type="number" value={data[valKey]} onChange={e=>update({[valKey]:+e.target.value})} style={{...INP,fontSize:12}}/>
                  </div>
                ))}
                <div><span style={LB}>Net Worth</span><div style={{fontSize:28,fontWeight:900,fontFamily:"monospace",color:data.netWorth>=0?C.green:C.red}}>${data.netWorth.toLocaleString()}</div><input type="number" value={data.netWorth} onChange={e=>update({netWorth:+e.target.value})} style={{...INP,fontSize:12,marginTop:6}}/></div>
              </div>
              <div style={card()}>
                <div style={ST}><span>◆</span> Ideas Parking Lot</div>
                {data.ideasParking.length===0&&<div style={{fontSize:12,color:C.textMute,fontStyle:"italic",marginBottom:10}}>Drop ideas here so you don't lose them...</div>}
                {data.ideasParking.map((idea,i)=>(<div key={i} style={{padding:"6px 10px",borderRadius:6,background:`${C.gold}08`,border:`1px solid ${C.gold}22`,marginBottom:5,fontSize:12,borderLeft:`3px solid ${C.gold}`,color:C.text}}>💡 {idea}</div>))}
                <div style={{display:"flex",gap:6,marginTop:8}}><input value={newIdea} onChange={e=>setNewIdea(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addIdea()} placeholder="Park an idea..." style={{...INP,flex:1}}/><button onClick={addIdea} style={{background:C.gold,color:"#000",border:"none",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:900}}>+</button></div>
              </div>
              <div style={{...card(),gridColumn:"1/-1"}}>
                <div style={ST}><span>◆</span> Q2 Wins</div>
                {data.quarterlyWins.length===0&&<div style={{fontSize:12,color:C.textMute,fontStyle:"italic",marginBottom:8}}>No wins logged yet — start celebrating.</div>}
                {data.quarterlyWins.map((w,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:7,background:`${C.green}08`,border:`1px solid ${C.green}22`,marginBottom:6,fontSize:13,borderLeft:`3px solid ${C.green}`}}>🎉 {w}</div>))}
                <input placeholder="Log a quarterly win... (Enter)" style={INP} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){update({quarterlyWins:[...data.quarterlyWins,e.target.value]});e.target.value="";}}}/>
              </div>
            </div>
          )}

          {tab===4&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{...glowCard(C.cyan),gridColumn:"1/-1",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.cyan},${C.gold},${C.magenta})`}}/>
                <div style={{fontSize:9,letterSpacing:"0.3em",color:C.cyan,marginBottom:6}}>LIFE VISION 2026</div>
                <textarea value={data.lifeVision} onChange={e=>update({lifeVision:e.target.value})} rows={2} style={{...INP,background:"transparent",color:C.text,border:"none",fontSize:16,fontFamily:"Georgia,serif",fontWeight:700,lineHeight:1.55,padding:"4px 0",resize:"none",width:"100%"}}/>
              </div>
              <div style={card()}>
                <div style={ST}><span>◆</span> NON-NEGOTIABLES</div>
                {data.nonNegotiables.map((n,i)=>(<div key={i} style={{padding:"8px 10px",borderRadius:7,background:C.surface2,border:`1px solid ${C.border}`,marginBottom:6,fontSize:13,display:"flex",alignItems:"center",gap:8}}><span style={{color:C.gold,fontSize:14}}>✦</span>{n}</div>))}
              </div>
              <div style={card()}>
                <div style={ST}><span>◆</span> 2026 FOCUS</div>
                {["Land remote healthcare cyber role","Walk the Black Hat red carpet","HCISPP certification","WOSB certification complete","Support Mom's care transition","Reach 800 credit score","Help finance Lexi's education"].map((f,i)=>(<div key={i} style={{padding:"7px 10px",borderRadius:6,background:C.surface2,border:`1px solid ${C.border}`,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:C.cyan}}>→</span>{f}</div>))}
              </div>
              {data.focusBuckets.map((bucket,i)=>(
                <div key={i} style={card()}>
                  <div style={ST}><span>◆</span>{bucket.title.toUpperCase()}</div>
                  {bucket.items.map((item,j)=>(<div key={j} style={{padding:"6px 10px",borderRadius:6,background:C.surface2,border:`1px solid ${C.border}`,marginBottom:5,fontSize:12,display:"flex",alignItems:"center",gap:7}}><span style={{color:[C.cyan,C.gold,C.amber,C.magenta][i%4]}}>◆</span>{item}</div>))}
                </div>
              ))}
            </div>
          )}

          {tab===5&&<HabitTracker data={data} update={update}/>}

          {tab===6&&(
            <div>
              <div style={{...glowCard(C.gold),marginBottom:18,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.gold},${C.amber})`}}/>
                <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:C.text}}>Vision Board — I Already Have This</div>
                <div style={{fontSize:12,color:C.textDim,marginTop:4}}>Not wishes. Declarations. Things you KNOW are coming.</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
                {data.visionBoard.map((item,i)=>(
                  <div key={i} style={{...glowCard([C.cyan,C.gold,C.amber,C.magenta,C.green,C.cyan,C.gold,C.amber,C.purple,C.magenta,C.green][i%11]),textAlign:"center",transition:"transform 0.2s",cursor:"default"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="none"}
                  >
                    <div style={{fontSize:44,marginBottom:8}}>{item.emoji}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,color:C.text,marginBottom:5}}>{item.label}</div>
                    <div style={{fontSize:11,color:C.textMute,lineHeight:1.6,fontStyle:"italic"}}>{item.desc}</div>
                  </div>
                ))}
                <div onClick={()=>setShowVAdd(true)} style={{cursor:"pointer",border:`1px dashed ${C.cyan}44`,borderRadius:12,background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:150}}>
                  <div style={{fontSize:28,color:C.cyan}}>+</div>
                  <div style={{fontSize:11,color:C.cyan,fontWeight:700,marginTop:4}}>ADD VISION CARD</div>
                </div>
              </div>
              {showVAdd&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
                  <div style={{...glowCard(C.cyan),width:340,maxWidth:"90vw"}}>
                    <div style={{fontSize:9,letterSpacing:"0.3em",color:C.cyan,marginBottom:14}}>NEW VISION CARD</div>
                    <span style={LB}>Emoji</span><input value={newVision.emoji} onChange={e=>setNewVision({...newVision,emoji:e.target.value})} style={{...INP,marginBottom:9}}/>
                    <span style={LB}>Title</span><input value={newVision.label} onChange={e=>setNewVision({...newVision,label:e.target.value})} style={{...INP,marginBottom:9}} placeholder="Dream Role"/>
                    <span style={LB}>Declaration</span><input value={newVision.desc} onChange={e=>setNewVision({...newVision,desc:e.target.value})} style={{...INP,marginBottom:14}} placeholder="It's already mine because..."/>
                    <div style={{display:"flex",gap:7}}>
                      <button onClick={addVision} style={{background:C.cyan,color:"#000",border:"none",borderRadius:8,padding:9,cursor:"pointer",flex:1,fontWeight:900,fontSize:12}}>ADD TO BOARD</button>
                      <button onClick={()=>setShowVAdd(false)} style={{background:"transparent",color:C.textMute,border:`1px solid ${C.border}`,borderRadius:8,padding:9,cursor:"pointer",flex:1,fontSize:12}}>CANCEL</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab===7&&(
            <div style={{maxWidth:680}}>
              <div style={{...glowCard(C.cyan),marginBottom:18,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.cyan},${C.magenta})`}}/>
                <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:C.text}}>Life Bucket List</div>
                <div style={{fontSize:12,color:C.textDim,marginTop:3}}>Things to do before you kick the bucket. Check them off as you LIVE.</div>
                <div style={{fontSize:13,color:C.cyan,marginTop:7,fontWeight:700,fontFamily:"monospace"}}>{data.bucketList.filter(b=>b.done).length} / {data.bucketList.length} COMPLETE</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {data.bucketList.map((item,i)=>(
                  <div key={i} onClick={()=>toggleBucket(i)} style={{...card({padding:"12px 16px"}),display:"flex",alignItems:"center",gap:12,cursor:"pointer",background:item.done?`${C.green}08`:C.surface,border:`1px solid ${item.done?C.green+"33":C.border}`,borderLeft:`4px solid ${item.done?C.green:C.cyan}`,transition:"all 0.18s"}}>
                    <div style={{width:22,height:22,borderRadius:6,border:`1.5px solid ${item.done?C.green:C.border}`,background:item.done?`${C.green}22`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.done&&<span style={{color:C.green,fontSize:12,fontWeight:900}}>✓</span>}</div>
                    <span style={{fontSize:13,color:item.done?C.textMute:C.text,textDecoration:item.done?"line-through":"none",lineHeight:1.5}}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:6}}><input value={newBucket} onChange={e=>setNewBucket(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addBucketItem()} placeholder="Add a bucket list item..." style={{...INP,flex:1}}/><button onClick={addBucketItem} style={{background:C.cyan,color:"#000",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontWeight:900,fontSize:14}}>+</button></div>
            </div>
          )}

          {tab===8&&<StudyTab/>}
          {tab===9&&<CreditTab data={data} update={update}/>}

        </div>
      </div>
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#070a0f;}
        ::-webkit-scrollbar-thumb{background:#00e5ff44;border-radius:99px;}
        textarea:focus,input:focus{border-color:#00e5ff!important;box-shadow:0 0 0 3px rgba(0,229,255,0.15)!important;outline:none;}
        button:active{transform:scale(0.97)!important;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      `}</style>
    </div>
  );
}
