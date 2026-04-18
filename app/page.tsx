"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';

const IG_URL = "https://instagram.com/mertcanpansiyon";

/* ─────────────────────────────────────────
   ROOMS DATA — odalar + daireler
───────────────────────────────────────── */
const ROOMS = {
  tr: [
    {
      id: "oda1", type: "Oda", num: "01",
      title: "Standart Oda",
      label: "Ferah & Aydınlık",
      desc: "Şehir merkezine yürüme mesafesinde, günlük temizlik hizmetiyle sunulan ferah ve aydınlık oda. Gün ışığıyla dolan sade ve konforlu yaşam alanı.",
      tags: ["Günlük Temizlik", "Çift Cam", "7/24 Resepsiyon"],
      hero: "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05.jpeg",
      thumbs: [
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(1).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(2).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04%20(1).jpeg",
      ],
    },
    {
      id: "oda2", type: "Oda", num: "02",
      title: "Geniş Oda",
      label: "Konforlu & Alanı Geniş",
      desc: "Daha büyük yaşam alanı sunan bu oda, uzun konaklamalar için ideal. Açık yerleşimi ve aydınlık atmosferiyle dinlenmeye odaklı bir alan.",
      tags: ["Geniş Alan", "Uzun Konaklama", "Sessiz Kat"],
      hero: "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58.jpeg",
      thumbs: [
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.55.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(2).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.52.jpeg",
      ],
    },
    {
      id: "oda3", type: "Oda", num: "03",
      title: "Huzur Odası",
      label: "Sakin & Sıcak Atmosfer",
      desc: "Yumuşak tonlar ve dinlenmeye odaklı tasarımıyla en sakin seçenek. Uzun bir günün ardından tam anlamıyla rahatlayabileceğiniz, sessiz ve düzenli bir alan.",
      tags: ["Akustik Yalıtım", "Dinlenme Odaklı", "Sıcak Atmosfer"],
      hero: "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03.jpeg",
      thumbs: [
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(1).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(3).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.02%20(3).jpeg",
      ],
    },
  ],
  en: [
    {
      id: "oda1", type: "Room", num: "01",
      title: "Standard Room",
      label: "Bright & Airy",
      desc: "Walking distance to the city center, this bright and airy room is kept spotless with daily cleaning service. Simple, comfortable and filled with natural light.",
      tags: ["Daily Cleaning", "Double Glazing", "24/7 Reception"],
      hero: "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05.jpeg",
      thumbs: [
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(1).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(2).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04%20(1).jpeg",
      ],
    },
    {
      id: "oda2", type: "Room", num: "02",
      title: "Spacious Room",
      label: "Comfortable & Spacious",
      desc: "Ideal for longer stays, this room offers a larger living area with an open layout and bright atmosphere — designed for genuine rest and comfort.",
      tags: ["Spacious Layout", "Long Stays", "Quiet Floor"],
      hero: "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58.jpeg",
      thumbs: [
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.55.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(2).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.52.jpeg",
      ],
    },
    {
      id: "oda3", type: "Room", num: "03",
      title: "Tranquil Room",
      label: "Calm & Warm",
      desc: "The quietest option — soft tones and a rest-focused layout. After a long day, this is where you truly unwind.",
      tags: ["Acoustic Insulation", "Rest-Focused", "Warm Atmosphere"],
      hero: "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03.jpeg",
      thumbs: [
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(1).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(3).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.02%20(3).jpeg",
      ],
    },
  ],
};

/* ─────────────────────────────────────────
   i18n STRINGS
───────────────────────────────────────── */
const T = {
  tr: {
    brand: "Mertcan Pansiyon",
    rooms: "Odalar", contact: "İletişim", instagram: "Instagram",
    hero1: "Şehrin",
    hero2: "Kalbinde",
    heroItalic: "konaklama",
    heroBadge: "Karabük — Türkiye",
    heroSub: "Mertcan Pansiyon, şehir merkezinde sessiz, temiz ve sıcak bir konaklama deneyimi sunar. Günlük temizlik, 7/24 resepsiyon ve merkezi konumuyla fark yaratıyoruz.",
    heroBtn1: "Odaları Keşfet", heroBtn2: "WhatsApp ile Yaz",
    stat1L: "Konum", stat1V: "100. Yıl Cad.",
    stat2L: "Resepsiyon", stat2V: "7/24",
    stat3L: "Temizlik", stat3V: "Günlük",
    stat4L: "Şehir", stat4V: "Karabük",

    /* Features */
    offerLabel: "Sunduklarımız",
    offerTitle: "Neden\nMertcan?",
    offerBody: "Karabük'ün merkezinde, kaliteli hizmet anlayışıyla konuklarımıza rahat ve konforlu bir konaklama ortamı sunmak için buradayız.",
    features: [
      {
        n:"01", t:"Merkezi Konum",
        d:"Karabük şehir merkezine ve ulaşım aksına yürüme mesafesinde. Otogar ve ana caddelere dakikalar içinde ulaşırsınız.",
        icon: "📍"
      },
      {
        n:"02", t:"Günlük Temizlik",
        d:"Her konaklamada titiz hijyen standartları. Odanız her sabah temizlenir, çarşaf ve havlular düzenli değiştirilir.",
        icon: "✨"
      },
      {
        n:"03", t:"WhatsApp Check-in",
        d:"Uzun bekleme yok. Gelişinizden önce WhatsApp üzerinden hızlıca giriş işlemlerinizi halledebilirsiniz.",
        icon: "💬"
      },
      {
        n:"04", t:"Sessiz & Konforlu",
        d:"Çift cam ve akustik yalıtımlı odalar. Şehrin gürültüsünden uzak, dinlendirici bir uyku için tasarlandı.",
        icon: "🌙"
      },
      {
        n:"05", t:"7/24 Resepsiyon",
        d:"Gece ya da gündüz, ihtiyacınız olduğunda yanınızdayız. Herhangi bir sorununuzda anında destek alabilirsiniz.",
        icon: "🔑"
      },
      {
        n:"06", t:"Güvenli Konaklama",
        d:"Güvenli giriş sistemi ve kilitli otopark. Eşyalarınız ve aracınız her zaman güvende.",
        icon: "🔒"
      },
    ],

    /* Rooms */
    roomsLabel: "Konaklama Seçenekleri",
    roomsTitle: "Odalar &\nDaireler",
    roomsBody: "İhtiyacınıza göre kısa ya da uzun konaklama için tasarlanmış farklı seçenekler. Her biri günlük temizlik ve eksiksiz hizmetle sunulur.",
    bookRoom: "Bu Oda için Yaz",
    seeAll: "Tüm Odaları Gör",

    /* Explore */
    exploreLabel: "Şehir Rehberi",
    exploreTitle: "Karabük'te\nNeler Yapılır?",
    exploreSub: "Tarihi dokusu ve doğal güzellikleriyle her mevsim farklı bir deneyim. Mertcan Pansiyon'dan kolayca ulaşabileceğiniz yerler.",
    places: [
      { name:"Safranbolu", km:"15 km", time:"~20 dk", tag:"Tarihi", desc:"UNESCO listesindeki Osmanlı evleri, Kapalıçarşı ve taş döşeli sokaklar. Türkiye'nin en güzel tarihi kent dokularından biri." },
      { name:"Yenice Ormanları", km:"45 km", time:"~50 dk", tag:"Doğa", desc:"Dev kayın ormanları, şelaleler ve yürüyüş parkurları. Batı Karadeniz'in gizli doğa cenneti." },
      { name:"Karabük Çarşısı", km:"0 km", time:"Yürüme mesafesi", tag:"Alışveriş", desc:"Yerel lezzetler, bakırcılar, el sanatları ve sabah pazarıyla canlı bir ticaret merkezi." },
      { name:"Eskipazar", km:"50 km", time:"~55 dk", tag:"Arkeoloji", desc:"Antik Roma mozaikleri ve Hadrianopolis kazıları. Arkeoloji meraklılarının uğrak noktası." },
      { name:"Ovacuma Göleti", km:"12 km", time:"~15 dk", tag:"Piknik", desc:"Sakin sular kenarında piknik alanları ve balık tutma. Hafta sonu dinlencesi için ideal." },
    ],
    distNote: "Mertcan Pansiyon'dan araçla mesafeler",

    /* CTA */
    ctaLabel: "Rezervasyon",
    ctaTitle: "Unutulmaz Bir\nKonaklama",
    ctaSub: "Karabük'ün kalbinde, modern dokunuşlarla sizi ağırlamaktan mutluluk duyuyoruz. Hemen arayın veya WhatsApp ile yazın.",
    callNow: "Hemen Ara", wpWrite: "WhatsApp ile Yaz",

    /* Contact */
    contactLabel: "İletişim",
    contactTitle: "Bize\nUlaşın",
    mapLabel: "Konum", mapTitle: "Haritada Bul",
    mapOpen: "Google Maps", mapDir: "Yol Tarifi",
    footerTag: "Şehrin kalbinde sade ve konforlu konaklama",
    footerContact: "İletişim", footerAddress: "Adres", mapHref: "Haritada Aç →",
  },
  en: {
    brand: "Mertcan Pension",
    rooms: "Rooms", contact: "Contact", instagram: "Instagram",
    hero1: "In the",
    hero2: "Heart",
    heroItalic: "of the city",
    heroBadge: "Karabük — Turkey",
    heroSub: "Mertcan Pension offers a quiet, clean and welcoming stay right in the city center. Daily cleaning, 24/7 reception and a prime location set us apart.",
    heroBtn1: "Explore Rooms", heroBtn2: "Message on WhatsApp",
    stat1L: "Location", stat1V: "100. Yıl Ave.",
    stat2L: "Reception", stat2V: "24/7",
    stat3L: "Cleaning", stat3V: "Daily",
    stat4L: "City", stat4V: "Karabük",

    offerLabel: "What We Offer",
    offerTitle: "Why\nMertcan?",
    offerBody: "In the heart of Karabük, we are here to provide our guests with a comfortable and quality stay.",
    features: [
      { n:"01", t:"City Center", d:"Walking distance to Karabük city center and transport hubs. Reach the bus station and main streets in minutes.", icon:"📍" },
      { n:"02", t:"Daily Cleaning", d:"Rigorous hygiene standards every stay. Your room is cleaned every morning, sheets and towels changed regularly.", icon:"✨" },
      { n:"03", t:"WhatsApp Check-in", d:"No long queues. Sort out your check-in via WhatsApp before you even arrive.", icon:"💬" },
      { n:"04", t:"Quiet & Comfortable", d:"Double-glazed, acoustically insulated rooms — designed for a truly restful sleep away from city noise.", icon:"🌙" },
      { n:"05", t:"24/7 Reception", d:"Day or night, we're here when you need us. Instant support for any issue, any time.", icon:"🔑" },
      { n:"06", t:"Secure Stay", d:"Secure entry system and locked parking. Your belongings and vehicle are always safe.", icon:"🔒" },
    ],

    roomsLabel: "Accommodation Options",
    roomsTitle: "Rooms &\nApartments",
    roomsBody: "Different options for short or long stays, tailored to your needs. Every option comes with daily cleaning and full service.",
    bookRoom: "Book This Room",
    seeAll: "See All Rooms",

    exploreLabel: "City Guide",
    exploreTitle: "What to Do\nin Karabük?",
    exploreSub: "Historic fabric and natural beauty — a different experience every season, all easily reachable from Mertcan Pension.",
    places: [
      { name:"Safranbolu", km:"15 km", time:"~20 min", tag:"Historic", desc:"UNESCO-listed Ottoman houses, covered bazaar and cobblestone streets — one of Turkey's finest historic towns." },
      { name:"Yenice Forests", km:"45 km", time:"~50 min", tag:"Nature", desc:"Giant beech forests, waterfalls and hiking trails — the hidden nature paradise of the Western Black Sea." },
      { name:"Karabük Bazaar", km:"0 km", time:"Walking", tag:"Shopping", desc:"Local flavors, coppersmiths, crafts and a morning market — a vibrant trading hub." },
      { name:"Eskipazar", km:"50 km", time:"~55 min", tag:"Archaeology", desc:"Ancient Roman mosaics and Hadrianopolis excavations — a must for archaeology enthusiasts." },
      { name:"Ovacuma Pond", km:"12 km", time:"~15 min", tag:"Leisure", desc:"Picnic areas and fishing by calm waters — ideal for a weekend day trip." },
    ],
    distNote: "Distances by car from Mertcan Pension",

    ctaLabel: "Reservation",
    ctaTitle: "An Unforgettable\nStay",
    ctaSub: "In the heart of Karabük, we are delighted to host you with modern touches. Call now or message us on WhatsApp.",
    callNow: "Call Now", wpWrite: "Message on WhatsApp",

    contactLabel: "Contact",
    contactTitle: "Get\nin Touch",
    mapLabel: "Location", mapTitle: "Find Us",
    mapOpen: "Google Maps", mapDir: "Directions",
    footerTag: "Simple and comfortable stay in the heart of the city",
    footerContact: "Contact", footerAddress: "Address", mapHref: "Open on Map →",
  },
};

const v = {
  up:    { hidden:{opacity:0,y:50},  visible:{opacity:1,y:0} },
  left:  { hidden:{opacity:0,x:-60}, visible:{opacity:1,x:0} },
  right: { hidden:{opacity:0,x:60},  visible:{opacity:1,x:0} },
  fade:  { hidden:{opacity:0},       visible:{opacity:1} },
};
const ease = [0.22,1,0.36,1] as [number,number,number,number];
const tr2 = (d=0.85, delay=0) => ({ duration:d, ease, delay });

/* ─── Navbar ─── */
function Navbar({ lang, setLang, l }: { lang:'tr'|'en', setLang:(l:'tr'|'en')=>void, l:typeof T['tr'] }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled?'scrolled':''}`}>
      {/* Logo + Brand */}
      <Link href="/" className="nav-brand">
        <Image src="/logo.png" alt="Mertcan Pansiyon Logo" width={44} height={54} style={{ objectFit:'contain', filter:'drop-shadow(0 2px 8px rgba(200,150,60,0.3))', flexShrink:0 }} />
        <span className="nav-brand-text">{l.brand}</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/rooms" className="nav-link">{l.rooms}</Link>
        <a href="#contact" className="nav-link">{l.contact}</a>
        <a href={IG_URL} target="_blank" rel="noopener" className="nav-link" style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          {l.instagram}
        </a>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
        <button onClick={()=>setLang('tr')} className="lang-btn" style={{color:lang==='tr'?'var(--gold2)':'var(--muted)'}}>TR</button>
        <span style={{color:'var(--faint)',fontSize:'0.65rem'}}>|</span>
        <button onClick={()=>setLang('en')} className="lang-btn" style={{color:lang==='en'?'var(--gold2)':'var(--muted)'}}>EN</button>
      </div>
    </nav>
  );
}

/* ─── Room Card ─── */
function RoomCard({ room, l }: { room: typeof ROOMS['tr'][0], l: typeof T['tr'] }) {
  const [active, setActive] = useState(0);
  const allImgs = [room.hero, ...room.thumbs];
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{once:true,amount:0.1}} variants={v.up} transition={tr2()}
      style={{background:'var(--deep)', border:'1px solid var(--edge)', overflow:'hidden'}}
    >
      {/* Image gallery */}
      <div style={{position:'relative', aspectRatio:'16/10', overflow:'hidden', cursor:'pointer'}} onClick={()=>setActive(a=>(a+1)%allImgs.length)}>
        <Image src={allImgs[active]} alt={room.title} fill className="object-cover" style={{transition:'opacity 0.4s ease'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(13,17,23,0.7) 0%,transparent 50%)'}} />
        {/* Type badge */}
        <div style={{position:'absolute',top:'1.25rem',left:'1.25rem'}}>
          <span className="badge">{room.type} {room.num}</span>
        </div>
        {/* Image counter */}
        <div style={{position:'absolute',bottom:'1.25rem',right:'1.25rem',display:'flex',gap:'5px'}}>
          {allImgs.map((_,i)=>(
            <button key={i} onClick={e=>{e.stopPropagation();setActive(i);}}
              style={{width:'6px',height:'6px',borderRadius:'50%',border:'none',cursor:'pointer',padding:0,
                background: i===active ? 'var(--gold2)' : 'rgba(255,255,255,0.35)',transition:'background 0.3s'}} />
          ))}
        </div>
        {/* Tap to cycle hint */}
        <div style={{position:'absolute',bottom:'1.25rem',left:'1.25rem',fontSize:'0.65rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)'}}>
          ← →
        </div>
      </div>

      {/* Content */}
      <div style={{padding:'2rem 2rem 2rem 2rem'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'1rem',marginBottom:'1rem'}}>
          <div>
            <div className="label" style={{marginBottom:'0.5rem'}}>{room.label}</div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:400,color:'var(--text)',lineHeight:1.1}}>{room.title}</h3>
          </div>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:'3.5rem',fontWeight:700,color:'rgba(255,255,255,0.04)',lineHeight:1,flexShrink:0,letterSpacing:'-0.04em'}}>
            {room.num}
          </span>
        </div>

        {/* Gold divider */}
        <div style={{width:'40px',height:'1px',background:'var(--gold)',marginBottom:'1.25rem'}} />

        <p style={{fontSize:'0.95rem',lineHeight:1.8,color:'var(--muted)',marginBottom:'1.5rem'}}>{room.desc}</p>

        {/* Tags */}
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'1.75rem'}}>
          {room.tags.map(tag=>(
            <span key={tag} style={{fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--gold)',border:'1px solid rgba(200,150,60,0.25)',padding:'3px 10px',background:'rgba(200,150,60,0.04)'}}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline" style={{width:'100%',justifyContent:'center',fontSize:'0.74rem'}}>
          {l.bookRoom}
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [lang, setLang] = useState<'tr'|'en'>('tr');
  const l = T[lang];
  const rooms = ROOMS[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] });
  const heroY = useTransform(scrollYProgress, [0,1], ['0%','28%']);
  const heroOp = useTransform(scrollYProgress, [0,0.75], [1,0]);

  return (
    <div style={{background:'var(--night)',color:'var(--text)',minHeight:'100vh',overflowX:'hidden'}}>
      <ThemeToggle />
      <Navbar lang={lang} setLang={setLang} l={l} />

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} style={{position:'relative',height:'100vh',minHeight:'700px',display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <motion.div style={{position:'absolute',inset:0,y:heroY}}>
          <Image src="/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58.jpeg" alt="" fill className="object-cover" priority quality={90}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(115deg, rgba(13,17,23,0.93) 0%, rgba(13,17,23,0.62) 52%, rgba(13,17,23,0.85) 100%)'}} />
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 72% 28%, rgba(200,150,60,0.07) 0%, transparent 58%)'}} />
        </motion.div>

        {/* Decorative vertical line */}
        <div style={{position:'absolute',left:'3rem',top:0,bottom:0,width:'1px',background:'linear-gradient(to bottom,transparent,rgba(200,150,60,0.28) 25%,rgba(200,150,60,0.28) 75%,transparent)',zIndex:2,pointerEvents:'none'}}/>

        <motion.div style={{position:'relative',zIndex:3,flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',opacity:heroOp}} className="site-container">
          <div style={{paddingBottom:'clamp(4rem,8vh,8rem)',paddingTop:'9.5rem'}}>

            <motion.span className="badge" style={{marginBottom:'2.5rem',display:'inline-block'}}
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
            >{l.heroBadge}</motion.span>

            {/* HERO HEADLINE — bigger, more tilted italic */}
            <motion.div initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{duration:1.15,delay:0.1,ease}}>
              <div style={{
                fontFamily:'Playfair Display,serif',
                lineHeight:0.88,
                letterSpacing:'-0.04em',
                marginBottom:'0.1em',
              }}>
                {/* "Şehrin" — normal, enormous */}
                <div style={{
                  fontSize:'clamp(5.5rem,11vw,12rem)',
                  fontWeight:400,
                  color:'var(--text)',
                  display:'block',
                }}>
                  {l.hero1}
                </div>
                {/* "Kalbinde" — shimmer gold */}
                <div className="shimmer-gold" style={{
                  fontSize:'clamp(5.5rem,11vw,12rem)',
                  fontWeight:400,
                  display:'block',
                }}>
                  {l.hero2}
                </div>
                {/* "konaklama" — italic, tilted more, gold */}
                <div style={{
                  fontSize:'clamp(4.5rem,9.5vw,10.5rem)',
                  fontWeight:400,
                  fontStyle:'italic',
                  color:'var(--gold)',
                  display:'block',
                  transform:'rotate(-2.5deg) translateX(-1.5rem)',
                  transformOrigin:'left center',
                  marginTop:'0.08em',
                  letterSpacing:'-0.03em',
                }}>
                  {l.heroItalic}
                </div>
              </div>
            </motion.div>

            <motion.div style={{display:'flex',flexDirection:'column',gap:'1.8rem',marginTop:'3.5rem',maxWidth:'620px'}}
              initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.6}}
            >
              <div style={{width:'64px',height:'1px',background:'var(--gold)'}}/>
              <p style={{fontSize:'clamp(1rem,1.5vw,1.2rem)',lineHeight:1.8,color:'rgba(220,205,182,0.82)'}}>{l.heroSub}</p>
              <div className="hero-btns" style={{display:'flex',flexWrap:'wrap',gap:'12px'}}>
                <Link href="/rooms" className="btn btn-gold">{l.heroBtn1}</Link>
                <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline">{l.heroBtn2}</a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div style={{position:'relative',zIndex:3,borderTop:'1px solid rgba(255,255,255,0.06)',background:'rgba(13,17,23,0.72)',backdropFilter:'blur(16px)'}}
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.95}}
        >
          <div className="site-container stats-bar-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
            {[{l:l.stat1L,v:l.stat1V},{l:l.stat2L,v:l.stat2V},{l:l.stat3L,v:l.stat3V},{l:l.stat4L,v:l.stat4V}].map((s,i)=>(
              <div key={i} style={{padding:'1.4rem 0',borderRight:i<3?'1px solid rgba(255,255,255,0.05)':'none',paddingLeft:i>0?'2rem':0}}>
                <div style={{fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'5px',fontFamily:'Jost,sans-serif'}}>{s.l}</div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'var(--text)',fontWeight:400}}>{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════ WHY MERTCAN — enriched ══════════════ */}
      <section style={{background:'var(--deep)',borderTop:'1px solid var(--edge)',position:'relative',overflow:'hidden',padding:'clamp(5rem,10vw,10rem) 0'}}>
        <div className="section-index" style={{right:'-0.05em',top:'-0.2em'}}>01</div>
        <div className="site-container">
          {/* Header */}
          <div className="offer-header-grid" style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:'clamp(3rem,6vw,8rem)',alignItems:'end',marginBottom:'clamp(3.5rem,6vw,6rem)'}}>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:0.3}} variants={v.left} transition={tr2()}>
              <div className="label" style={{marginBottom:'1.5rem'}}>{l.offerLabel}</div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.8rem,5.5vw,5.5rem)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.025em',whiteSpace:'pre-line',color:'var(--text)'}}>{l.offerTitle}</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:0.3}} variants={v.right} transition={tr2(0.85,0.15)}>
              <div style={{width:'48px',height:'1px',background:'var(--gold)',marginBottom:'1.5rem'}}/>
              <p style={{fontSize:'clamp(1rem,1.3vw,1.15rem)',lineHeight:1.8,color:'var(--muted)',maxWidth:'500px'}}>{l.offerBody}</p>
            </motion.div>
          </div>

          {/* 6-feature grid */}
          <div className="offer-features-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1px',background:'var(--edge)'}}>
            {l.features.map((f,i)=>(
              <motion.div key={f.n}
                style={{background:'var(--deep)',padding:'2.5rem 2rem',display:'flex',flexDirection:'column',gap:'1rem',transition:'background 0.3s ease'}}
                initial="hidden" whileInView="visible" viewport={{once:true}} variants={v.up} transition={tr2(0.6,i*0.07)}
                whileHover={{background:'var(--mid)'} as never}
              >
                <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.5rem'}}>
                  <span style={{fontSize:'1.8rem'}}>{f.icon}</span>
                  <span style={{fontFamily:'Playfair Display,serif',fontSize:'3rem',fontWeight:700,color:'rgba(200,150,60,0.12)',letterSpacing:'-0.04em',lineHeight:1}}>{f.n}</span>
                </div>
                <h4 style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:400,color:'var(--text)',lineHeight:1.2}}>{f.t}</h4>
                <div style={{width:'28px',height:'1px',background:'rgba(200,150,60,0.4)'}}/>
                <p style={{fontSize:'0.95rem',lineHeight:1.8,color:'var(--muted)'}}>{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ROOMS — full cards ══════════════ */}
      <section style={{background:'var(--night)',borderTop:'1px solid var(--edge)',position:'relative',overflow:'hidden',padding:'clamp(5rem,10vw,10rem) 0'}}>
        <div className="section-index" style={{left:'-0.05em',top:'-0.2em'}}>02</div>
        <div className="site-container">
          {/* Header */}
          <motion.div style={{marginBottom:'clamp(3rem,5vw,5rem)',display:'flex',flexDirection:'column',gap:'1.25rem'}}
            initial="hidden" whileInView="visible" viewport={{once:true,amount:0.2}} variants={v.up} transition={tr2()}
          >
            <div className="label">{l.roomsLabel}</div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.8rem,5.5vw,5.5rem)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.025em',whiteSpace:'pre-line',color:'var(--text)'}}>{l.roomsTitle}</h2>
            <div style={{display:'flex',alignItems:'center',gap:'2rem',flexWrap:'wrap'}}>
              <div style={{width:'48px',height:'1px',background:'var(--gold)'}}/>
              <p style={{fontSize:'clamp(1rem,1.3vw,1.1rem)',lineHeight:1.8,color:'var(--muted)',maxWidth:'560px'}}>{l.roomsBody}</p>
            </div>
          </motion.div>

          {/* Room cards — 3 column grid */}
          <div className="rooms-cards-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'2px',marginBottom:'2.5rem'}}>
            {rooms.map(room=>(
              <RoomCard key={room.id} room={room} l={l} />
            ))}
          </div>

          {/* See all CTA */}
          <motion.div style={{textAlign:'center',paddingTop:'1rem'}}
            initial="hidden" whileInView="visible" viewport={{once:true}} variants={v.fade} transition={tr2(0.6)}
          >
            <Link href="/rooms" className="btn btn-gold" style={{fontSize:'0.8rem'}}>{l.seeAll}</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ IMAGE STRIP ══════════════ */}
      <div className="img-strip-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',height:'220px'}}>
        {[
          "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04%20(1).jpeg",
          "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57.jpeg",
          "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(3).jpeg",
          "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.52.jpeg",
        ].map((src,i)=>(
          <div key={i} className="img-frame" style={{position:'relative',overflow:'hidden',cursor:'default'}}>
            <div style={{position:'absolute',inset:0}}>
              <Image src={src} alt="" fill className="object-cover"/>
              <div style={{position:'absolute',inset:0,background:'rgba(13,17,23,0.2)'}}/>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════ KARABÜK GUIDE — ILLUSTRATED ══════════════ */}
      <section style={{background:'var(--night)',borderTop:'1px solid var(--edge)',position:'relative',overflow:'hidden',padding:'clamp(5rem,10vw,10rem) 0'}}>
        <div className="section-index" style={{right:'-0.05em',top:'-0.2em'}}>03</div>
        <div className="site-container">
          <motion.div style={{display:'flex',flexDirection:'column',gap:'1.5rem',marginBottom:'clamp(3.5rem,6vw,6rem)',maxWidth:'780px'}}
            initial="hidden" whileInView="visible" viewport={{once:true,amount:0.15}} variants={v.up} transition={tr2()}
          >
            <div className="label">{l.exploreLabel}</div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(3rem,6vw,6rem)',fontWeight:400,lineHeight:1.0,letterSpacing:'-0.03em',whiteSpace:'pre-line',color:'var(--text)'}}>{l.exploreTitle}</h2>
            <div style={{width:'56px',height:'1px',background:'var(--gold)'}}/>
            <p style={{fontSize:'clamp(1.05rem,1.4vw,1.2rem)',lineHeight:1.85,color:'var(--muted)',maxWidth:'600px'}}>{l.exploreSub}</p>
            <p style={{fontSize:'0.72rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--faint)'}}>{l.distNote}</p>
          </motion.div>

          {/* Illustrated place cards */}
          <div className="guide-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'3px'}}>
            {l.places.map((p,i)=>{
              const illustrations = [
                /* Safranbolu — Ottoman arch houses */
                <svg key="s" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'200px',display:'block'}}>
                  <rect width="380" height="200" fill="#0d1520"/>
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a2a3a"/>
                      <stop offset="100%" stopColor="#0d1520"/>
                    </linearGradient>
                    <linearGradient id="gold1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e8c870"/>
                      <stop offset="100%" stopColor="#c09040"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="200" fill="url(#sky1)"/>
                  {/* Stars */}
                  {[[30,20],[80,15],[140,25],[200,10],[280,18],[340,22],[60,40],[170,35],[310,30]].map(([x,y],si)=>(
                    <circle key={si} cx={x} cy={y} r="1" fill="rgba(255,255,255,0.5)"/>
                  ))}
                  {/* Moon */}
                  <circle cx="330" cy="35" r="14" fill="#f0d890" opacity="0.9"/>
                  <circle cx="337" cy="30" r="10" fill="#1a2a3a"/>
                  {/* Hills */}
                  <ellipse cx="60" cy="170" rx="100" ry="40" fill="#0a1018"/>
                  <ellipse cx="320" cy="175" rx="90" ry="35" fill="#0a1018"/>
                  {/* House 1 — large Ottoman */}
                  <rect x="60" y="110" width="70" height="70" fill="#1e2d3e" stroke="rgba(200,150,60,0.3)" strokeWidth="0.5"/>
                  <polygon points="60,110 130,110 95,82" fill="#2a3d52"/>
                  <rect x="78" y="130" width="16" height="22" fill="#c09040" opacity="0.7"/>
                  <rect x="100" y="130" width="16" height="22" fill="#c09040" opacity="0.5"/>
                  <rect x="78" y="118" width="14" height="10" fill="rgba(200,150,60,0.4)"/>
                  <rect x="100" y="118" width="14" height="10" fill="rgba(200,150,60,0.4)"/>
                  {/* Arch window */}
                  <rect x="85" y="152" width="20" height="18" rx="10" ry="0" fill="#c09040" opacity="0.4"/>
                  {/* House 2 */}
                  <rect x="145" y="120" width="55" height="60" fill="#182330" stroke="rgba(200,150,60,0.2)" strokeWidth="0.5"/>
                  <polygon points="145,120 200,120 172,98" fill="#223040"/>
                  <rect x="158" y="138" width="12" height="18" fill="#c09040" opacity="0.5"/>
                  <rect x="177" y="138" width="12" height="18" fill="#c09040" opacity="0.4"/>
                  {/* House 3 — minaret */}
                  <rect x="220" y="100" width="50" height="80" fill="#1e2d3e" stroke="rgba(200,150,60,0.25)" strokeWidth="0.5"/>
                  <polygon points="220,100 270,100 245,75" fill="#2a3d52"/>
                  <rect x="232" y="115" width="10" height="14" fill="#c09040" opacity="0.6"/>
                  <rect x="248" y="115" width="10" height="14" fill="#c09040" opacity="0.4"/>
                  <rect x="238" y="138" width="14" height="22" fill="#c09040" opacity="0.5"/>
                  {/* Minaret */}
                  <rect x="285" y="60" width="12" height="120" fill="#253545"/>
                  <ellipse cx="291" cy="60" rx="8" ry="5" fill="#2a3d52"/>
                  <polygon points="285,60 297,60 291,45" fill="#c09040" opacity="0.8"/>
                  {/* Cobblestones */}
                  {[0,1,2,3,4,5,6,7,8,9].map(ci=>(
                    <ellipse key={ci} cx={30+ci*34} cy="190" rx="15" ry="5" fill="rgba(255,255,255,0.04)" stroke="rgba(200,150,60,0.08)" strokeWidth="0.5"/>
                  ))}
                  {/* Gold glow on ground */}
                  <ellipse cx="190" cy="185" rx="160" ry="12" fill="rgba(200,150,60,0.04)"/>
                </svg>,

                /* Yenice Ormanları — forest */
                <svg key="y" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'200px',display:'block'}}>
                  <defs>
                    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0a1e12"/>
                      <stop offset="100%" stopColor="#0d2818"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="200" fill="url(#sky2)"/>
                  {/* Moon light */}
                  <circle cx="190" cy="30" r="22" fill="rgba(240,220,140,0.15)"/>
                  <circle cx="190" cy="30" r="14" fill="#f0e080" opacity="0.6"/>
                  {/* Moon reflection path */}
                  <ellipse cx="190" cy="185" rx="20" ry="60" fill="rgba(240,220,100,0.06)"/>
                  {/* Background trees */}
                  {[20,60,100,140,180,220,260,300,340,360].map((x,ti)=>(
                    <g key={ti}>
                      <polygon points={`${x},${155-ti%3*10} ${x-18},200 ${x+18},200`} fill={`rgba(15,40,20,${0.6+ti%3*0.15})`}/>
                      <polygon points={`${x},${135-ti%3*8} ${x-12},175 ${x+12},175`} fill={`rgba(20,55,28,${0.7+ti%2*0.1})`}/>
                    </g>
                  ))}
                  {/* Mid trees — greener */}
                  {[50,130,210,290,360].map((x,ti)=>(
                    <g key={ti}>
                      <polygon points={`${x},${120-ti%2*15} ${x-24},180 ${x+24},180`} fill={`rgba(18,52,25,0.9)`}/>
                      <polygon points={`${x},${100-ti%2*10} ${x-16},150 ${x+16},150`} fill={`rgba(25,65,30,0.85)`}/>
                      <rect x={x-3} y="180" width="6" height="20" fill="rgba(40,25,10,0.6)"/>
                    </g>
                  ))}
                  {/* Waterfall */}
                  <rect x="175" y="95" width="8" height="60" fill="rgba(120,180,220,0.25)" rx="4"/>
                  <ellipse cx="179" cy="158" rx="12" ry="5" fill="rgba(120,180,220,0.15)"/>
                  {/* Fireflies */}
                  {[[80,90],[160,110],[250,85],[310,100],[140,130]].map(([x,y],fi)=>(
                    <circle key={fi} cx={x} cy={y} r="2" fill="rgba(180,255,120,0.6)"/>
                  ))}
                  {/* Ground fog */}
                  <ellipse cx="190" cy="195" rx="200" ry="20" fill="rgba(180,220,180,0.06)"/>
                </svg>,

                /* Karabük Çarşısı — bazaar */
                <svg key="c" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'200px',display:'block'}}>
                  <defs>
                    <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a1208"/>
                      <stop offset="100%" stopColor="#120e06"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="200" fill="url(#sky3)"/>
                  {/* Lanterns on string */}
                  {[0,1,2,3,4,5,6,7,8].map(li=>(
                    <g key={li}>
                      <line x1={20+li*42} y1="30" x2={62+li*42} y2="30" stroke="rgba(200,150,60,0.3)" strokeWidth="0.5"/>
                      <ellipse cx={41+li*42} cy="42" rx="7" ry="10" fill={li%2===0?"rgba(200,100,40,0.7)":"rgba(200,150,60,0.65)"}/>
                      <line x1={41+li*42} y1="30" x2={41+li*42} y2="32" stroke="rgba(200,150,60,0.4)" strokeWidth="0.8"/>
                      <ellipse cx={41+li*42} cy="38" rx="5" ry="3" fill="rgba(255,200,100,0.3)"/>
                      <ellipse cx={41+li*42} cy="44" rx="4" ry="8" fill="rgba(255,180,80,0.2)"/>
                    </g>
                  ))}
                  {/* Market stalls */}
                  {[30,130,230,310].map((x,si)=>(
                    <g key={si}>
                      <rect x={x} y="90" width="70" height="90" fill="#1a1208"/>
                      {/* Awning */}
                      <polygon points={`${x-5},90 ${x+75},90 ${x+70},70 ${x},70`} fill={si%2===0?"rgba(180,60,40,0.8)":"rgba(40,80,140,0.7)"}/>
                      {/* Stripe */}
                      <polygon points={`${x+15},90 ${x+20},70 ${x+30},70 ${x+25},90`} fill="rgba(255,255,255,0.15)"/>
                      <polygon points={`${x+40},90 ${x+45},70 ${x+55},70 ${x+50},90`} fill="rgba(255,255,255,0.15)"/>
                      {/* Items */}
                      <rect x={x+8} y="120" width="18" height="14" fill="rgba(200,150,60,0.4)" rx="2"/>
                      <rect x={x+32} y="118" width="16" height="16" fill="rgba(180,80,40,0.4)" rx="2"/>
                      <rect x={x+54} y="122" width="12" height="12" fill="rgba(80,140,60,0.4)" rx="2"/>
                      {/* Light spill */}
                      <rect x={x+5} y="110" width="60" height="2" fill="rgba(200,150,60,0.15)"/>
                    </g>
                  ))}
                  {/* Cobblestone path */}
                  <rect x="0" y="180" width="380" height="20" fill="#140f08"/>
                  {[0,1,2,3,4,5,6,7,8,9,10,11].map(ci=>(
                    <ellipse key={ci} cx={16+ci*34} cy="188" rx="14" ry="5" fill="rgba(255,255,255,0.03)" stroke="rgba(200,150,60,0.06)" strokeWidth="0.5"/>
                  ))}
                  {/* Atmospheric glow */}
                  <ellipse cx="190" cy="160" rx="180" ry="40" fill="rgba(200,130,50,0.04)"/>
                </svg>,

                /* Eskipazar — ruins / mosaic */
                <svg key="e" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'200px',display:'block'}}>
                  <defs>
                    <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a1208"/>
                      <stop offset="100%" stopColor="#221a0a"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="200" fill="url(#sky4)"/>
                  {/* Milky way */}
                  {Array.from({length:40}).map((_,si)=>(
                    <circle key={si} cx={Math.sin(si*2.3)*180+190} cy={si*4+5} r={si%5===0?1.5:0.8} fill={`rgba(255,240,200,${0.2+Math.sin(si)*0.3})`}/>
                  ))}
                  {/* Columns */}
                  {[60,130,200,270].map((x,ci)=>(
                    <g key={ci}>
                      <rect x={x-8} y="60" width="16" height="120" fill={`rgba(${180+ci*10},${160+ci*5},${100+ci*8},0.35)`}/>
                      {/* Capital */}
                      <rect x={x-14} y="55" width="28" height="8" fill={`rgba(200,170,110,0.4)`}/>
                      <rect x={x-10} y="48" width="20" height="9" fill={`rgba(200,170,110,0.3)`}/>
                      {/* Fluting */}
                      {[-4,-1,2,5].map(fx=>(
                        <line key={fx} x1={x+fx} y1="62" x2={x+fx} y2="175" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
                      ))}
                      {/* Base */}
                      <rect x={x-12} y="178" width="24" height="6" fill="rgba(200,170,110,0.25)"/>
                    </g>
                  ))}
                  {/* Broken column */}
                  <rect x="322" y="110" width="16" height="70" fill="rgba(180,155,100,0.3)"/>
                  <polygon points="314,110 346,110 338,100 322,100" fill="rgba(180,155,100,0.2)"/>
                  {/* Mosaic on ground */}
                  <rect x="50" y="182" width="280" height="12" fill="rgba(180,150,80,0.08)"/>
                  {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(mi=>(
                    <g key={mi}>
                      <rect x={50+mi*22} y="183" width="10" height="10" fill={mi%3===0?"rgba(200,150,60,0.3)":mi%3===1?"rgba(150,100,50,0.2)":"rgba(100,80,40,0.15)"} rx="1"/>
                    </g>
                  ))}
                  {/* Amphitheatre arc */}
                  <path d="M 80 175 Q 190 100 300 175" fill="none" stroke="rgba(200,150,60,0.2)" strokeWidth="1.5"/>
                  <path d="M 100 175 Q 190 115 280 175" fill="none" stroke="rgba(200,150,60,0.12)" strokeWidth="1"/>
                </svg>,

                /* Ovacuma Göleti — lake */
                <svg key="o" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'200px',display:'block'}}>
                  <defs>
                    <linearGradient id="sky5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0a1520"/>
                      <stop offset="100%" stopColor="#0d1e2a"/>
                    </linearGradient>
                    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0a2a3a"/>
                      <stop offset="100%" stopColor="#061520"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="200" fill="url(#sky5)"/>
                  {/* Stars */}
                  {[[20,15],[70,8],[130,20],[190,5],[250,18],[310,12],[360,22],[50,35],[160,30],[290,28],[380,15]].map(([x,y],si)=>(
                    <circle key={si} cx={x} cy={y} r={si%3===0?1.5:0.8} fill="rgba(255,255,255,0.6)"/>
                  ))}
                  {/* Full moon */}
                  <circle cx="300" cy="45" r="28" fill="rgba(240,225,160,0.15)"/>
                  <circle cx="300" cy="45" r="20" fill="#f5e890" opacity="0.75"/>
                  {/* Hills */}
                  <path d="M 0 130 Q 80 80 160 120 Q 240 155 380 90 L 380 200 L 0 200 Z" fill="#0a1a0e"/>
                  {/* Treeline */}
                  {[0,30,60,90,340,360].map((x,ti)=>(
                    <polygon key={ti} points={`${x},${130-ti%2*20} ${x-15},160 ${x+15},160`} fill="rgba(10,30,15,0.95)"/>
                  ))}
                  {/* Lake */}
                  <ellipse cx="190" cy="175" rx="180" ry="35" fill="url(#water)"/>
                  {/* Moon reflection on water */}
                  <ellipse cx="190" cy="172" rx="18" ry="6" fill="rgba(240,225,160,0.25)"/>
                  <rect x="184" y="162" width="12" height="18" fill="rgba(240,225,140,0.08)" rx="6"/>
                  {/* Ripple rings */}
                  {[1,2,3].map(ri=>(
                    <ellipse key={ri} cx="190" cy="172" rx={25+ri*15} ry={5+ri*2} fill="none" stroke="rgba(240,225,160,0.08)" strokeWidth="0.5"/>
                  ))}
                  {/* Fishing rod silhouette */}
                  <line x1="55" y1="130" x2="55" y2="172" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                  <line x1="55" y1="132" x2="80" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
                  <line x1="80" y1="145" x2="80" y2="172" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
                  {/* Person silhouette */}
                  <ellipse cx="53" cy="128" rx="6" ry="7" fill="rgba(0,0,0,0.5)"/>
                  <rect x="49" y="133" width="8" height="18" fill="rgba(0,0,0,0.4)" rx="2"/>
                </svg>,
              ];

              return (
                <motion.div key={p.name}
                  style={{background:'var(--deep)',border:'1px solid var(--edge)',overflow:'hidden',position:'relative',cursor:'default',transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)'}}
                  initial="hidden" whileInView="visible" viewport={{once:true}} variants={v.up} transition={tr2(0.6,i*0.08)}
                  whileHover={{borderColor:'rgba(200,150,60,0.35)',y:-6,boxShadow:'0 30px 70px rgba(0,0,0,0.4)'} as never}
                >
                  {/* SVG Illustration */}
                  <div style={{position:'relative',overflow:'hidden'}}>
                    {illustrations[i % illustrations.length]}
                    {/* Gold bottom fade */}
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'60px',background:'linear-gradient(to top,var(--deep),transparent)',pointerEvents:'none'}}/>
                    {/* Tag top-right */}
                    <div style={{position:'absolute',top:'1rem',right:'1rem'}}>
                      <span className="badge">{p.tag}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{padding:'1.75rem 2rem 2rem'}}>
                    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'0.75rem',gap:'1rem'}}>
                      <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.75rem',color:'var(--text)',fontWeight:400,lineHeight:1.05}}>{p.name}</h3>
                      <div style={{display:'flex',gap:'1rem',flexShrink:0}}>
                        <span style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'0.82rem',color:'var(--gold)'}}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {p.km}
                        </span>
                        <span style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'0.82rem',color:'var(--muted)'}}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {p.time}
                        </span>
                      </div>
                    </div>
                    <div style={{width:'32px',height:'1px',background:'rgba(200,150,60,0.4)',marginBottom:'0.9rem'}}/>
                    <p style={{fontSize:'0.95rem',lineHeight:1.8,color:'var(--muted)'}}>{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA CINEMATIC ══════════════ */}
      <section style={{position:'relative',overflow:'hidden',minHeight:'500px',display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',inset:0}}>
          <Image src="/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03.jpeg" alt="" fill className="object-cover"/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(13,17,23,0.97) 35%,rgba(13,17,23,0.7) 100%)'}}/>
        </div>
        <div className="site-container" style={{position:'relative',zIndex:1,padding:'clamp(4rem,8vw,9rem) 3rem'}}>
          <motion.div style={{maxWidth:'660px'}}
            initial="hidden" whileInView="visible" viewport={{once:true,amount:0.3}} variants={v.left} transition={tr2()}
          >
            <div className="label" style={{marginBottom:'1.5rem'}}>{l.ctaLabel}</div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.8rem,5.5vw,5.5rem)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.025em',whiteSpace:'pre-line',color:'var(--text)',marginBottom:'1.5rem'}}>{l.ctaTitle}</h2>
            <div style={{width:'48px',height:'1px',background:'var(--gold)',marginBottom:'1.8rem'}}/>
            <p style={{fontSize:'clamp(1rem,1.3vw,1.15rem)',lineHeight:1.8,color:'rgba(220,205,182,0.78)',marginBottom:'2.5rem',maxWidth:'500px'}}>{l.ctaSub}</p>
            <div className="hero-btns" style={{display:'flex',flexWrap:'wrap',gap:'12px'}}>
              <a href="tel:+905330878295" className="btn btn-gold">{l.callNow}</a>
              <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline">{l.wpWrite}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CONTACT + MAP ══════════════ */}
      <section id="contact" style={{background:'var(--deep)',borderTop:'1px solid var(--edge)',position:'relative',overflow:'hidden',padding:'clamp(5rem,10vw,10rem) 0'}}>
        <div className="section-index" style={{right:'-0.05em',top:'-0.15em'}}>04</div>
        <div className="site-container">
          <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(3rem,6vw,8rem)',alignItems:'start'}}>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:0.2}} variants={v.left} transition={tr2()}>
              <div className="label" style={{marginBottom:'1.5rem'}}>{l.contactLabel}</div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.8rem,5.5vw,5.5rem)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.025em',whiteSpace:'pre-line',color:'var(--text)',marginBottom:'2rem'}}>{l.contactTitle}</h2>
              <div style={{width:'48px',height:'1px',background:'var(--gold)',marginBottom:'2rem'}}/>
              <div style={{display:'flex',flexDirection:'column',gap:'1.5rem',marginBottom:'2.5rem'}}>
                {[
                  {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.61 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.86-.86a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, val:"+90 533 087 82 95"},
                  {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, val:"info@mertcanpansiyon.com"},
                  {icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, val:"100. Yıl, 1002. Cd. NO:1/18, 78050 Karabük"},
                ].map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'1rem'}}>
                    <div style={{color:'var(--gold)',marginTop:'2px',flexShrink:0}}>{item.icon}</div>
                    <span style={{fontSize:'1rem',color:'var(--muted)',lineHeight:1.6}}>{item.val}</span>
                  </div>
                ))}
              </div>
              <a href={IG_URL} target="_blank" rel="noopener" className="social-link" style={{marginBottom:'2.5rem',display:'inline-flex'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                @mertcanpansiyon
              </a>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <a href="tel:+905330878295" className="btn btn-gold" style={{width:'fit-content'}}>{l.callNow}</a>
                <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline" style={{width:'fit-content'}}>{l.wpWrite}</a>
                <a href="https://maps.app.goo.gl/tbY6XAndX8y3jJGi9" target="_blank" rel="noopener" className="btn btn-outline" style={{width:'fit-content'}}>{l.mapOpen}</a>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:0.2}} variants={v.right} transition={tr2(0.85,0.1)}>
              <div className="label" style={{marginBottom:'1.5rem'}}>{l.mapLabel}</div>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.8rem)',fontWeight:400,color:'var(--text)',marginBottom:'1.5rem',lineHeight:1.15}}>{l.mapTitle}</h3>
              <div style={{display:'flex',gap:'10px',marginBottom:'1.5rem'}}>
                <a href="https://maps.app.goo.gl/tbY6XAndX8y3jJGi9" target="_blank" rel="noopener" className="btn btn-gold" style={{fontSize:'0.7rem'}}>{l.mapOpen}</a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Karabuk+Merkez+1002.+Cd+No+1%2F18" target="_blank" rel="noopener" className="btn btn-outline" style={{fontSize:'0.7rem'}}>{l.mapDir}</a>
              </div>
              <div style={{border:'1px solid var(--edge)',overflow:'hidden'}}>
                <iframe title="Konum" src="https://www.google.com/maps?q=Karabuk+Merkez+1002.+Cd+No+1%2F18&output=embed" style={{width:'100%',height:'400px',display:'block'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="footer">
        <div className="site-container footer-grid" style={{padding:'4rem 2rem 0',display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr',gap:'3rem'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'0.75rem'}}>
              <Image src="/logo.png" alt="Logo" width={36} height={44} style={{objectFit:'contain', opacity:0.85, flexShrink:0}} />
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',letterSpacing:'0.04em',color:'var(--text)'}}>{l.brand}</div>
            </div>
            <div style={{width:'40px',height:'1px',background:'var(--gold)',marginBottom:'1rem'}}/>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.75,maxWidth:'280px'}}>{l.footerTag}</p>
            <a href={IG_URL} target="_blank" rel="noopener" className="social-link" style={{marginTop:'1.5rem',display:'inline-flex'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              @mertcanpansiyon
            </a>
          </div>
          <div>
            <div style={{fontSize:'0.65rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'1.2rem',fontFamily:'Jost,sans-serif'}}>{l.footerContact}</div>
            <div style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:2.1}}>
              <div>+90 533 087 82 95</div>
              <div>info@mertcanpansiyon.com</div>
            </div>
          </div>
          <div>
            <div style={{fontSize:'0.65rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'1.2rem',fontFamily:'Jost,sans-serif'}}>{l.footerAddress}</div>
            <div style={{fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.8,marginBottom:'0.75rem'}}>100. Yıl, 1002. Cd. NO:1/18,<br/>78050 Karabük</div>
            <a href="https://maps.app.goo.gl/tbY6XAndX8y3jJGi9" target="_blank" rel="noopener" style={{fontSize:'0.72rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--gold)',textDecoration:'none'}}>{l.mapHref}</a>
          </div>
        </div>
        <div style={{borderTop:'1px solid var(--edge)',margin:'2.5rem 3rem 0'}}>
          <div className="site-container" style={{padding:'1.5rem 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:'0.78rem',color:'var(--faint)'}}>© 2025 Mertcan Pansiyon</span>
            <Link href="/rooms" style={{fontSize:'0.72rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--muted)',textDecoration:'none'}}>{l.rooms} →</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="wa-fab" aria-label="WhatsApp">        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36">
          <path fill="white" d="M16 0C7.164 0 0 7.164 0 16c0 2.82.737 5.469 2.027 7.77L0 32l8.43-2.007A15.938 15.938 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"/>
          <path fill="#16a34a" d="M16 2.4c7.512 0 13.6 6.088 13.6 13.6S23.512 29.6 16 29.6a13.55 13.55 0 01-6.93-1.9L2.56 29.44l1.76-6.33A13.543 13.543 0 012.4 16C2.4 8.488 8.488 2.4 16 2.4z"/>
          <path fill="white" d="M11.57 9.2c-.28-.63-.57-.64-.84-.65l-.71-.01c-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.57 4.1 6.33 5.59 3.13 1.24 3.77 1 4.45.93.68-.07 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44s-2.2-1.09-2.54-1.21c-.34-.12-.59-.18-.84.18-.25.37-.96 1.21-1.18 1.46-.22.25-.43.28-.8.09-.37-.18-1.56-.58-2.97-1.84-1.1-.98-1.84-2.19-2.06-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.18-.22.25-.37.37-.62.12-.25.06-.47-.03-.65-.09-.19-.82-2.04-1.16-2.78z"/>
        </svg>
      </a>
    </div>
  );
}
