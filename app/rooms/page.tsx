"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

const IG_URL = "https://instagram.com/mertcanpansiyon";

/* ─── i18n ─── */
const T = {
  tr: {
    brand: "Mertcan Pansiyon",
    back: "← Ana Sayfa",
    pageLabel: "Konaklama Seçenekleri",
    pageTitle: "Odalar &\nDaireler",
    pageSub: "Her oda kendi karakteriyle, konforu ön planda tutarak tasarlanmıştır. Tüm seçenekler günlük temizlik ve 7/24 resepsiyon hizmetiyle sunulur.",
    browseBtn: "Odalara Git",
    wpBtn: "WhatsApp ile Yaz",
    roomType: "Oda", summaryLabel: "Oda Özeti",
    forRoom: "Bu oda için",
    callNow: "Hemen Ara", wpWrite: "WhatsApp ile Yaz",
    clickImg: "Fotoğrafa tıkla — büyüt",
    footerTag: "Şehrin kalbinde sade ve konforlu konaklama",
    contact: "İletişim", address: "Adres", mapHref: "Haritada Aç →",
    instagram: "Instagram",
    rooms: "Odalar",
  },
  en: {
    brand: "Mertcan Pension",
    back: "← Home",
    pageLabel: "Accommodation Options",
    pageTitle: "Rooms &\nApartments",
    pageSub: "Each room is designed with its own character, putting comfort first. All options come with daily cleaning and 24/7 reception service.",
    browseBtn: "Browse Rooms",
    wpBtn: "Message on WhatsApp",
    roomType: "Room", summaryLabel: "Room Summary",
    forRoom: "For this room",
    callNow: "Call Now", wpWrite: "Message on WhatsApp",
    clickImg: "Click photo — enlarge",
    footerTag: "Simple and comfortable stay in the heart of the city",
    contact: "Contact", address: "Address", mapHref: "Open on Map →",
    instagram: "Instagram",
    rooms: "Rooms",
  },
};

/* ─── Room data ─── */
const ROOMS = {
  tr: [
    {
      id: "oda1", num: "01", type: "Oda",
      title: "Standart Oda",
      label: "Ferah & Aydınlık",
      desc: "Şehir merkezine yürüme mesafesinde, günlük temizlik hizmetiyle sunulan ferah ve aydınlık oda. Gün ışığıyla dolan, sade ve konforlu bir yaşam alanı.",
      notes: ["Günlük temizlik", "Merkeze yakın", "Uzun konaklamaya uygun", "Sessiz kat"],
      images: [
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(2).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(1).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04%20(1).jpeg",
      ],
    },
    {
      id: "oda2", num: "02", type: "Oda",
      title: "Geniş Oda",
      label: "Konforlu & Geniş Alan",
      desc: "Daha büyük bir yaşam alanı sunan bu oda, uzun konaklamalar için idealdir. Açık yerleşimi ve aydınlık atmosferiyle dinlenmeye odaklı tasarlandı.",
      notes: ["Geniş alan", "Uzun konaklama", "Aydınlık iç mekân", "Konforlu yerleşim"],
      images: [
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(2).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.55.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.52.jpeg",
      ],
    },
    {
      id: "oda3", num: "03", type: "Oda",
      title: "Huzur Odası",
      label: "Sakin & Sıcak Atmosfer",
      desc: "Yumuşak tonlar ve dinlenmeye odaklı tasarımıyla en sakin seçenek. Uzun bir günün ardından tam anlamıyla rahatlayabileceğiniz huzurlu bir alan.",
      notes: ["Akustik yalıtım", "Sessiz his", "Dinlenme odaklı", "Sıcak atmosfer"],
      images: [
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03.jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(3).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(1).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.02%20(3).jpeg",
      ],
    },
  ],
  en: [
    {
      id: "oda1", num: "01", type: "Room",
      title: "Standard Room",
      label: "Bright & Airy",
      desc: "Walking distance to city center, offered with daily cleaning service. A bright, simple and comfortable living space filled with natural light.",
      notes: ["Daily cleaning", "Central location", "Suitable for long stays", "Quiet floor"],
      images: [
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(2).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.05%20(1).jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04.jpeg",
        "/rooms/oda1/WhatsApp%20Image%202025-09-23%20at%2012.07.04%20(1).jpeg",
      ],
    },
    {
      id: "oda2", num: "02", type: "Room",
      title: "Spacious Room",
      label: "Comfortable & Spacious",
      desc: "Ideal for longer stays with a larger living area. An open layout and bright atmosphere designed for genuine rest and comfort.",
      notes: ["Spacious layout", "Long stays", "Bright interior", "Comfortable"],
      images: [
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(2).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.58%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.55.jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.57%20(1).jpeg",
        "/rooms/oda2/WhatsApp%20Image%202025-09-23%20at%2012.06.52.jpeg",
      ],
    },
    {
      id: "oda3", num: "03", type: "Room",
      title: "Tranquil Room",
      label: "Calm & Warm",
      desc: "The quietest option — soft tones and a rest-focused layout. After a long day, this is where you truly unwind.",
      notes: ["Acoustic insulation", "Quiet feel", "Rest-focused", "Warm atmosphere"],
      images: [
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03.jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(3).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.03%20(1).jpeg",
        "/rooms/oda3/WhatsApp%20Image%202025-09-23%20at%2012.07.02%20(3).jpeg",
      ],
    },
  ],
};

/* ─── Lightbox ─── */
function Lightbox({ images, start, onClose }: { images: string[]; start: number; onClose: () => void }) {
  const [idx, setIdx] = useState(start);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % images.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [images.length, onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      {/* Close */}
      <button onClick={onClose} style={{ position:'absolute', top:'1.5rem', right:'1.5rem', background:'none', border:'1px solid rgba(200,150,60,0.4)', color:'var(--gold)', width:'46px', height:'46px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1.1rem', zIndex:10 }}>✕</button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
          style={{ position:'absolute', left:'1.5rem', top:'50%', transform:'translateY(-50%)', background:'rgba(13,17,23,0.7)', border:'1px solid rgba(200,150,60,0.35)', color:'var(--gold)', width:'52px', height:'52px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1.8rem', zIndex:10 }}>‹</button>
      )}

      {/* Image */}
      <div style={{ position:'relative', maxWidth:'92vw', maxHeight:'90vh' }} onClick={e => e.stopPropagation()}>
        <img src={decodeURIComponent(images[idx])} alt="" style={{ maxWidth:'92vw', maxHeight:'88vh', objectFit:'contain', display:'block', border:'1px solid rgba(200,150,60,0.15)' }} />
        <div style={{ position:'absolute', bottom:'-2.5rem', left:'50%', transform:'translateX(-50%)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(200,150,60,0.5)', whiteSpace:'nowrap' }}>
          {idx + 1} / {images.length}
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
          style={{ position:'absolute', right:'1.5rem', top:'50%', transform:'translateY(-50%)', background:'rgba(13,17,23,0.7)', border:'1px solid rgba(200,150,60,0.35)', color:'var(--gold)', width:'52px', height:'52px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1.8rem', zIndex:10 }}>›</button>
      )}
    </div>
  );
}

/* ─── Navbar (same as homepage) ─── */
function Navbar({ lang, setLang, l }: { lang:'tr'|'en', setLang:(v:'tr'|'en')=>void, l: typeof T['tr'] }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="nav-brand">
        <Image src="/logo.png" alt="Logo" width={40} height={50} style={{ objectFit:'contain', filter:'drop-shadow(0 2px 8px rgba(200,150,60,0.3))', flexShrink:0 }} />
        <span className="nav-brand-text">{l.brand}</span>
      </Link>
      <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
        <Link href="/" className="nav-link">{l.back}</Link>
        <a href={IG_URL} target="_blank" rel="noopener" className="nav-link" style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          {l.instagram}
        </a>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
        <button onClick={() => setLang('tr')} className="lang-btn" style={{ color: lang==='tr' ? 'var(--gold2)' : 'var(--muted)' }}>TR</button>
        <span style={{ color:'var(--faint)', fontSize:'0.55rem' }}>|</span>
        <button onClick={() => setLang('en')} className="lang-btn" style={{ color: lang==='en' ? 'var(--gold2)' : 'var(--muted)' }}>EN</button>
      </div>
    </nav>
  );
}

const ease = [0.22,1,0.36,1] as [number,number,number,number];
const vUp = { hidden:{opacity:0,y:50}, visible:{opacity:1,y:0} };
const vLeft = { hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} };
const vRight = { hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} };

export default function RoomsPage() {
  const [lang, setLang] = useState<'tr'|'en'>('tr');
  const [lightbox, setLightbox] = useState<{ images: string[]; start: number } | null>(null);
  const l = T[lang];
  const rooms = ROOMS[lang];

  return (
    <div style={{ background:'var(--night)', color:'var(--text)', minHeight:'100vh', overflowX:'hidden' }}>
      <ThemeToggle />
      <Navbar lang={lang} setLang={setLang} l={l} />

      <AnimatePresence>
        {lightbox && <Lightbox images={lightbox.images} start={lightbox.start} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      {/* ─── PAGE HEADER ─── */}
      <section style={{ background:'var(--deep)', borderBottom:'1px solid var(--edge)', paddingTop:'7rem', paddingBottom:'clamp(3rem,6vw,6rem)', position:'relative', overflow:'hidden' }}>
        <div className="section-index" style={{ right:'-0.05em', top:'-0.15em' }}>0</div>
        <div className="site-container">
          <motion.div initial="hidden" animate="visible" variants={vUp} transition={{ duration:0.9, ease }}>
            <div className="label" style={{ marginBottom:'1.5rem' }}>{l.pageLabel}</div>
            <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(3.5rem,8vw,8rem)', fontWeight:400, lineHeight:1.0, letterSpacing:'-0.03em', whiteSpace:'pre-line', color:'var(--text)', marginBottom:'2rem' }}>{l.pageTitle}</h1>
            <div style={{ width:'56px', height:'1px', background:'var(--gold)', marginBottom:'1.8rem' }} />
            <p style={{ fontSize:'clamp(1rem,1.4vw,1.15rem)', lineHeight:1.8, color:'var(--muted)', maxWidth:'580px', marginBottom:'2.5rem' }}>{l.pageSub}</p>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <a href="#oda1" className="btn btn-gold">{l.browseBtn}</a>
              <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline">{l.wpBtn}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ROOMS ─── */}
      <div style={{ padding:'clamp(4rem,8vw,9rem) 0' }}>
        {rooms.map((room, index) => {
          const [hero, ...thumbs] = room.images;
          const allImgs = room.images;

          return (
            <motion.section key={room.id} id={room.id}
              style={{ scrollMarginTop:'80px', marginBottom: index < rooms.length - 1 ? 'clamp(5rem,10vw,10rem)' : 0 }}
              initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.08 }}
              variants={vUp} transition={{ duration:0.85, ease }}
            >
              <div className="site-container">
                {/* Room header */}
                <div style={{ display:'flex', alignItems:'flex-end', gap:'2rem', marginBottom:'2.5rem', paddingBottom:'2rem', borderBottom:'1px solid var(--edge)' }}>
                  <span style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(4rem,8vw,9rem)', fontWeight:700, lineHeight:1, color:'rgba(200,150,60,0.08)', letterSpacing:'-0.05em', flexShrink:0 }}>{room.num}</span>
                  <div>
                    <div className="label" style={{ marginBottom:'0.6rem' }}>{room.label}</div>
                    <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2.2rem,4vw,3.8rem)', fontWeight:400, color:'var(--text)', lineHeight:1.08, letterSpacing:'-0.025em' }}>{room.title}</h2>
                  </div>
                </div>

                {/* Main layout: hero left, sidebar right */}
                <div className="room-layout-grid" style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'clamp(1.5rem,3vw,3rem)', alignItems:'start', marginBottom:'1.5rem' }}>

                  {/* Hero image */}
                  <motion.div variants={vLeft} style={{ position:'relative', overflow:'hidden', cursor:'zoom-in', aspectRatio:'16/10' }}
                    onClick={() => setLightbox({ images: allImgs, start: 0 })}
                    whileHover={{ scale: 1.01 } as never}
                    transition={{ duration: 0.4 }}
                  >
                    <Image src={hero} alt={room.title} fill className="object-cover"
                      style={{ transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,17,23,0.65) 0%, transparent 55%)', pointerEvents:'none' }} />
                    {/* Border overlay */}
                    <div style={{ position:'absolute', inset:0, border:'1px solid rgba(200,150,60,0.2)', pointerEvents:'none' }} />
                    {/* Bottom left label */}
                    <div style={{ position:'absolute', bottom:'1.25rem', left:'1.25rem' }}>
                      <span className="badge">{room.type} {room.num}</span>
                    </div>
                    {/* Zoom hint */}
                    <div style={{ position:'absolute', bottom:'1.25rem', right:'1.25rem', display:'flex', alignItems:'center', gap:'6px', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                      {l.clickImg}
                    </div>
                  </motion.div>

                  {/* Sidebar */}
                  <motion.div variants={vRight} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                    {/* Summary */}
                    <div style={{ background:'var(--panel)', border:'1px solid var(--edge)', padding:'1.75rem' }}>
                      <div className="label" style={{ marginBottom:'1rem' }}>{l.summaryLabel}</div>
                      <div style={{ width:'28px', height:'1px', background:'var(--gold)', marginBottom:'1rem' }} />
                      <p style={{ fontSize:'0.95rem', lineHeight:1.8, color:'var(--muted)' }}>{room.desc}</p>
                    </div>

                    {/* Notes */}
                    <div style={{ background:'var(--panel)', border:'1px solid var(--edge)', padding:'1.5rem' }}>
                      {room.notes.map((note, i) => (
                        <div key={note} style={{ display:'flex', alignItems:'center', gap:'0.9rem', padding:'0.65rem 0', borderBottom: i < room.notes.length - 1 ? '1px solid var(--edge)' : 'none' }}>
                          <div style={{ width:'20px', height:'1px', background:'var(--gold)', flexShrink:0 }} />
                          <span style={{ fontSize:'0.9rem', color:'var(--text)' }}>{note}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{ background:'var(--deep)', border:'1px solid rgba(200,150,60,0.2)', padding:'1.5rem', textAlign:'center' }}>
                      <div className="label" style={{ marginBottom:'1rem' }}>{l.forRoom}</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                        <a href="tel:+905330878295" className="btn btn-gold" style={{ width:'100%', justifyContent:'center', fontSize:'0.74rem' }}>{l.callNow}</a>
                        <a href="https://wa.me/905330878295" target="_blank" rel="noopener" className="btn btn-outline" style={{ width:'100%', justifyContent:'center', fontSize:'0.74rem' }}>{l.wpWrite}</a>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Thumbnail grid */}
                {thumbs.length > 0 && (
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'3px' }}>
                    {thumbs.map((img, i) => (
                      <motion.div key={img}
                        style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', cursor:'zoom-in' }}
                        initial="hidden" whileInView="visible" viewport={{ once:true }}
                        variants={vUp} transition={{ duration:0.5, ease, delay: i * 0.06 }}
                        whileHover={{ scale:1.02 } as never}
                        onClick={() => setLightbox({ images: allImgs, start: i + 1 })}
                      >
                        <Image src={img} alt={`${room.title} ${i+2}`} fill className="object-cover"
                          style={{ transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                        />
                        <div style={{ position:'absolute', inset:0, border:'1px solid rgba(200,150,60,0.12)', pointerEvents:'none' }} />
                        {/* Hover overlay */}
                        <div style={{ position:'absolute', inset:0, background:'rgba(13,17,23,0)', transition:'background 0.3s', display:'flex', alignItems:'center', justifyContent:'center' }}
                          onMouseEnter={e => (e.currentTarget.style.background='rgba(13,17,23,0.35)')}
                          onMouseLeave={e => (e.currentTarget.style.background='rgba(13,17,23,0)')}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" style={{ opacity:0, transition:'opacity 0.3s' }}
                            ref={el => { if(el) { const p = el.parentElement; if(p) { p.addEventListener('mouseenter',()=>{el.style.opacity='1'}); p.addEventListener('mouseleave',()=>{el.style.opacity='0'}); } } }}
                          >
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="site-container" className="footer-grid" style={{ padding:'4rem 2rem 0', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr', gap:'3rem' }}>
          <div>
            <Link href="/" style={{ fontFamily:'Playfair Display,serif', fontSize:'1.4rem', letterSpacing:'0.04em', color:'var(--text)', textDecoration:'none', display:'block', marginBottom:'0.75rem' }}>{l.brand}</Link>
            <div style={{ width:'40px', height:'1px', background:'var(--gold)', marginBottom:'1rem' }} />
            <p style={{ fontSize:'0.95rem', color:'var(--muted)', lineHeight:1.75, maxWidth:'280px' }}>{l.footerTag}</p>
            <a href={IG_URL} target="_blank" rel="noopener" className="social-link" style={{ marginTop:'1.5rem', display:'inline-flex' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              @mertcanpansiyon
            </a>
          </div>
          <div>
            <div style={{ fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.2rem', fontFamily:'Jost,sans-serif' }}>{l.contact}</div>
            <div style={{ fontSize:'0.95rem', color:'var(--muted)', lineHeight:2.1 }}>
              <div>+90 533 087 82 95</div>
              <div>info@mertcanpansiyon.com</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.2rem', fontFamily:'Jost,sans-serif' }}>{l.address}</div>
            <div style={{ fontSize:'0.95rem', color:'var(--muted)', lineHeight:1.8, marginBottom:'0.75rem' }}>100. Yıl, 1002. Cd. NO:1/18,<br/>78050 Karabük</div>
            <a href="https://maps.app.goo.gl/tbY6XAndX8y3jJGi9" target="_blank" rel="noopener" style={{ fontSize:'0.72rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', textDecoration:'none' }}>{l.mapHref}</a>
          </div>
        </div>
        <div style={{ borderTop:'1px solid var(--edge)', margin:'2.5rem 3rem 0' }}>
          <div className="site-container" style={{ padding:'1.5rem 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'0.78rem', color:'var(--faint)' }}>© 2025 Mertcan Pansiyon</span>
            <Link href="/" style={{ fontSize:'0.72rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)', textDecoration:'none' }}>Ana Sayfa →</Link>
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
