import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Play, MessageCircle, Award, Star, Leaf, Heart, MapPin, Mail } from 'lucide-react';
import './App.css';

// SVG Brand Icons
const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const Facebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Youtube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

/* ─── Scroll To Top ─── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ─── Animation variants ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

export const CONSULTATION_SERVICES = [
  { img: '/New folder/Weight Management & Fat Loss.png', title: 'Weight Management & Fat Loss', desc: 'Sustainable weight loss through a structured system that improves metabolism — not crash dieting. Lose fat, feel lighter, and maintain results long-term.' },
  { img: '/New folder/Hormonal Balance.png', title: 'Hormonal Balance', desc: 'Restore natural hormonal balance to improve energy, mood, and fat loss. Support your body to function the way it’s meant to.' },
  { img: '/New folder/Women’s Health & PCOS Support.png', title: 'Women’s Health & PCOS Support', desc: 'Target PCOS, irregular cycles, and hormonal issues with a natural approach. Take control of your health with the right system and guidance.' },
  { img: '/New folder/Energy & Lifestyle Optimization.png', title: 'Energy & Lifestyle Optimization', desc: 'Build consistent energy levels throughout the day without dependency on stimulants. Create routines that support performance and recovery.' },
  { img: '/New folder/Digestion & Gut Health.png', title: 'Digestion & Gut Health', desc: 'Improve digestion, reduce bloating, and enhance nutrient absorption. A healthy gut is the foundation of overall wellness.' },
  { img: '/New folder/Sleep Cycle Optimization.png', title: 'Sleep Cycle Optimization', desc: 'Fix your sleep cycle to improve recovery, focus, and daily performance. Wake up refreshed and ready to take on the day.' },
  { img: '/New folder/Mental Strength & Emotional Resilience.png', title: 'Mental Strength & Emotional Resilience', desc: 'Develop a strong mindset to handle stress, pressure, and challenges. Stay consistent and in control of your habits.' },
  { img: '/New folder/Confidence & Personality Boost.png', title: 'Confidence & Personality Boost', desc: 'Improve self-image, body confidence, and overall presence. Feel better, look better, and perform better.' },
  { img: '/New folder/Muscle Growth & Strength.png', title: 'Muscle Growth & Strength', desc: 'Build lean muscle and improve strength with a structured approach. Support long-term fat loss and body transformation.' },
  { img: '/New folder/Heart & Internal Health.png', title: 'Heart & Internal Health', desc: 'Improve cardiovascular health and support internal body systems. Build a stronger, healthier foundation from within.' },
  { img: '/New folder/Skin Health & Natural Glow.png', title: 'Skin Health & Natural Glow', desc: 'Achieve clear, glowing skin by improving internal health. Nutrition and lifestyle that reflect on your appearance.' },
  { img: '/New folder/Joint Health & Mobility.png', title: 'Joint Health & Mobility', desc: 'Improve flexibility, reduce stiffness, and support joint strength. Move freely and stay active without discomfort.' },
  { img: '/New folder/Balanced Diet Planning.png', title: 'Balanced Diet Planning', desc: 'Simple, practical nutrition plans tailored to your lifestyle. No extreme diets — just sustainable, effective eating habits.' }
];



/* NAVBAR */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Transformations', href: '/#transformations' }
  ];

  const handleLinkClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Coach Nandan Singh" />
        </Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              {l.href.startsWith('/') && !l.href.includes('#') ? (
                <Link to={l.href} className="nav-link">{l.label}</Link>
              ) : (
                <a href={l.href} className="nav-link" onClick={() => handleLinkClick(l.href)}>{l.label}</a>
              )}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="nav-cta">Book Free Call</Link>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {links.map(l => (
              l.href.startsWith('/') && !l.href.includes('#') ? (
                <Link key={l.label} to={l.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{l.label}</Link>
              ) : (
                <a key={l.label} href={l.href} className="mobile-link" onClick={() => handleLinkClick(l.href)}>{l.label}</a>
              )
            ))}
            <Link to="/contact" className="nav-cta mobile-cta" onClick={() => setMobileOpen(false)}>Book Free Call</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* HOME PAGE COMPONENTS */

const Hero = () => (
  <>
    <section id="hero" className="hero">
      <video autoPlay loop muted playsInline className="hero-video-bg">
        <source src="/IMG_4556.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="container hero-content-wrapper">
        <motion.div className="hero-left" initial="hidden" animate="visible">
          <motion.div className="hero-eyebrow" variants={fadeUp(0)}>
            <span className="eyebrow-dot" />
            Certified Nutritionist · Raipur, India
          </motion.div>
          <motion.h1 className="hero-headline" variants={fadeUp(0.1)}>
            22000 Families<br />Healed.{' '}
            <em className="headline-italic">Yours Could<br />Be Next.</em>
          </motion.h1>
          <motion.p className="hero-body" variants={fadeUp(0.2)}>
            India's leading natural wellness coach — no medications, no crash diets.
            Just sustainable, science-backed results through the Five Pillars of Health.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp(0.3)}>
            <Link to="/contact" className="btn-primary">Book Free Consultation <ArrowRight size={16} /></Link>
            <a href="#testimonials" className="btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' }); }}>
              <Play size={15} fill="currentColor" /> Watch Success Stories
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
    <div className="trust-bar">
      <div className="container trust-container">
        <div className="trust-slider">
          <div className="trust-track">
            {['NBHWC', 'HSSC', 'Niti Aayog', 'MAX Healthcare', 'UCSF', 'NBHWC', 'HSSC', 'Niti Aayog', 'MAX Healthcare', 'UCSF'].map((name, i) => (
              <div key={i} className="trust-logo">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="story" className="about-section" ref={ref}>
      <div className="container about-grid">
        <motion.div className="about-image-wrap" initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="about-image-card">
            <img src="/hero.jpg" alt="Coach Nandan" className="about-img" />
            <div className="about-experience-badge"><span className="exp-num">14+</span><span className="exp-text">Years of<br />Impact</span></div>
          </div>
        </motion.div>
        <motion.div className="about-content" initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="section-tag">Meet Your Coach</span>
          <h2 className="section-h2">I'm Coach Nandan Singh — Dedicated to Your Health.</h2>
          <p className="about-lead">With a background in B.Pharma and an MBA, I combined clinical knowledge with a passion for holistic wellness.</p>
          <div className="about-story-text">
            <p>My journey began with a simple mission: to help people heal without the burden of lifelong medications or extreme crash diets. Today, I've had the privilege of guiding over 22,000 families.</p>
          </div>
          <div className="about-credentials">
            <div className="cred-item"><Award size={20} color="#E87722" /><span>B.Pharma Graduate</span></div>
            <div className="cred-item"><Star size={20} color="#E87722" /><span>Certified Nutrition Specialist</span></div>
          </div>
          <Link to="/about" className="btn-primary mt-8">My Full Story <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const svcs = CONSULTATION_SERVICES;
  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
          <span className="section-tag">What I Offer</span>
          <h2 className="section-h2">Your Path to Health<br />Starts Here.</h2>
        </motion.div>
        <div className="services-grid">
          {svcs.map((s, i) => (
            <motion.div key={i} className="service-card" initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.11 }}>
              <div className="service-img-wrap" style={{ marginBottom: '24px', height: '120px' }}><img src={s.img} alt={s.title} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const images = ['/7.jpg', '/8.jpg', '/9.jpg', '/10.jpg', '/11.jpg', '/12.jpg'];
  return (
    <section id="transformations" className="ba-section" ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
          <span className="section-tag">Success Stories</span>
          <h2 className="section-h2">Real Results. Real People.</h2>
        </motion.div>
        <div className="ba-grid">
          {images.map((img, i) => (
            <motion.div key={i} className="ba-card" initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}><img src={img} alt="Transformation" className="ba-result-img" /></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoTestimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="testimonials" className="video-section" ref={ref}>
      <div className="video-section-bg" />
      <div className="container">
        <motion.div className="section-header light-header" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
          <span className="section-tag orange-tag">Hear Their Stories</span>
          <h2 className="section-h2 white-h2">Don't Take Our<br />Word For It.</h2>
        </motion.div>
        <div className="video-grid">
          {[1, 2, 3].map(i => (
            <motion.div key={i} className="video-card" initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.14 }}>
              <div className="video-thumb"><div className="play-btn"><Play size={20} fill="white" /></div><div className="video-result-badge">Result #{i}</div></div>
              <div className="video-info">
                <p className="video-quote">"Life changed completely..."</p>
                <div className="video-meta"><strong>Client Name</strong><span>Outcome Details</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedNumber = ({ endValue, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * endValue));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(endValue);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, endValue]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  
  const statsData = [
    { value: 22000, suffix: '', label: 'Healed' },
    { value: 14, suffix: '+', label: 'Years' },
    { value: 0, suffix: '', label: 'Meds' },
    { value: 100, suffix: '%', label: 'Natural' }
  ];

  return (
    <section className="stats-section" ref={ref}>
      <div className="container stats-grid">
        {statsData.map((s, i) => (
          <motion.div key={i} className="stat-block" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.1 }}>
            <span className="stat-num">
              <AnimatedNumber endValue={s.value} suffix={s.suffix} />
            </span>
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "Is this a diet plan?", a: "No. We teach you a lifestyle based on the Five Pillars of Health that becomes second nature." },
    { q: "Can this help reverse chronic diseases?", a: "Yes. Many of our clients have successfully reversed Type 2 Diabetes and Thyroid conditions." },
    { q: "How long until I see results?", a: "Most clients start feeling significant energy and sleep improvements within the first 14-21 days of following their personalized protocol." },
    { q: "Do I need to buy expensive supplements?", a: "No. Our core focus is on real, whole foods available in your local market. We prioritize natural nutrition over synthetic supplements." },
    { q: "Is coaching available online?", a: "Yes. We consult clients globally via Zoom and WhatsApp, providing the same high-touch personalized attention as our Raipur center." },
    { q: "Is it suitable for all age groups?", a: "Absolutely. We design age-specific protocols and have successfully guided everyone from young children to senior citizens." }
  ];
  return (
    <section className="faq-section" ref={ref}>
      <div className="container">
        <div className="section-header"><span className="section-tag">Got Questions?</span><h2 className="section-h2">Frequently Asked Questions</h2></div>
        <div className="faq-grid">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(i)}>
              <div className="faq-q"><span>{f.q}</span><X size={18} className="faq-icon" /></div>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          <motion.div className="contact-left" initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-h2">Start Your Life Plan Today.</h2>
            <div className="contact-info-list" style={{ marginTop: 32 }}>
              <div className="info-item"><div className="info-icon"><MapPin size={18} /></div><div><p className="info-label">Corporate Address</p><p className="info-text">First Floor, Raipur Rd, above Aarti Medical Stores, Krishna Nagar, Ramnagar, Kota, Raipur, Gudhiyari, Chhattisgarh 492009</p></div></div>
              <div className="info-item"><div className="info-icon"><Mail size={18} /></div><div><p className="info-label">Email Us</p><p className="info-text"><a href="mailto:Nandansinghgod@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>Nandansinghgod@gmail.com</a></p></div></div>
              <div className="info-item"><div className="info-icon"><MessageCircle size={18} /></div><div><p className="info-label">Contact No.</p><p className="info-text">+91 98272 45171</p></div></div>
            </div>
          </motion.div>
          <motion.div className="contact-right" initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="form-card">
              <h3 className="service-title">Request a Call</h3>
              <form className="contact-form" onSubmit={e => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group"><label>Your Name</label><input type="text" placeholder="Full Name" required /></div>
                  <div className="form-group"><label>WhatsApp Number</label><input type="tel" placeholder="+91 XXXX" required /></div>
                </div>
                <div className="form-group">
                  <label>Service Interested In</label>
                  <select required>
                    <option value="">Choosing Path...</option>
                    <option value="nutrition">Therapeutic Nutrition</option>
                    <option value="weight">Weight Recomposition</option>
                  </select>
                </div>
                <div className="form-group"><label>Current Challenges</label><textarea placeholder="e.g. Chronic Fatigue, Thyroid, etc." rows="3"></textarea></div>
                <button type="submit" className="btn-primary w-full btn-lg">Confirm My Free Consultation</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-main">
      <div className="container footer-grid">
        
        <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img src="/New folder/footer image.png" alt="Footer Logo" className="footer-logo" style={{ alignSelf: 'flex-start', marginBottom: '8px', maxWidth: '100%', height: 'auto' }} />
          <p className="footer-col-title" style={{ fontSize: '16px', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Connect With Coach Nandan</p>
          <div className="footer-socials" style={{ display: 'flex', gap: '16px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link"><Youtube /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <Link to="/terms">Terms and Condition</Link>
          <Link to="/privacy">Privacy & Policy</Link>
          <Link to="/terms-service">Terms Of Service</Link>
          <Link to="/refund">Refund and replacement policy</Link>
        </div>

        <div className="footer-support" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
             <Link to="/contact" className="footer-col-title" style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.3s ease' }}>Customer Support <ArrowRight size={14} /></Link>
             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>Contact Customer Support for questions on your products, coaching or events. Email us at <strong>Nandansinghgod@gmail.com</strong>.</p>
          </div>
          <div>
             <Link to="/contact" className="footer-col-title" style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.3s ease' }}>Media Inquiries <ArrowRight size={14} /></Link>
             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>Coach Nandan has a dedicated media department. Members of the press are welcome to contact us.</p>
          </div>
        </div>

      </div>
    </div>
    <div className="footer-bottom">
      <div className="container footer-bottom-inner" style={{ display: 'flex', justifyContent: 'center' }}>
        <p>© {new Date().getFullYear()} Coach Nandan. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppFAB = () => (
  <a href="https://wa.me/919827245171" target="_blank" rel="noopener noreferrer" className="whatsapp-fab" id="whatsapp-fab" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
);

/* PAGES */
/* BLOG DATA */
const BLOG_POSTS = [
  { id: 1, title: "Defeating Diabetes Naturally", date: "April 15, 2026", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop", excerpt: "How to manage blood sugar through the power of Therapeutic Nutrition.", content: "Managing blood sugar is about more than just avoiding sweets. It's about insulin sensitivity, fiber intake, and the timing of your meals. In this article, we explore the science of therapeutic nutrition and how it can help you reverse type 2 diabetes naturally." },
  { id: 2, title: "The 5 Pillars Explained", date: "April 10, 2026", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", excerpt: "A deep dive into why movement and mindset are as critical as what you eat.", content: "Health isn't just about what you eat. It's about five interconnected pillars: Nutrition, Sleep, Movement, Mindset, and Habits. When one is weak, the whole structure suffers. Today we discuss how to balance all five for optimal longevity." },
  { id: 3, title: "Thyroid & Your Metabolism", date: "April 05, 2026", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop", excerpt: "Understanding the hormonal triggers that cause weight gain and fatigue.", content: "Thyroid issues are often a symptom of deeper imbalances. We look at how systemic inflammation affects your metabolism and what lifestyle changes can support hormonal health." },
  { id: 4, title: "Gut Health & Immunity", date: "April 02, 2026", img: "https://images.unsplash.com/photo-1542614471-001ccf2b449c?q=80&w=800&auto=format&fit=crop", excerpt: "70% of your immune system lives in your gut. Learn how to feed it.", content: "The microbiome is your body's second brain. Discover the best fermented foods and prebiotic fibers to strengthen your natural defenses." },
  { id: 5, title: "Mind over Medicine", date: "March 28, 2026", img: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=800&auto=format&fit=crop", excerpt: "How stress management can be more effective than pills for chronic pain.", content: "Cortisol is the silent killer. Learn simple breathing techniques and mindset shifts that can lower systemic inflammation and reduce pain naturally." },
  { id: 6, title: "Sustainable Weight Loss", date: "March 20, 2026", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", excerpt: "Why crash diets fail and what actually works for long-term fat loss.", content: "Calorie counting is a trap. We focus on hormonal balance and metabolic flexibility to ensure that the weight stays off for good." }
];

const HomePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero />
    <About />
    <Services />
    <BeforeAfter />
    <VideoTestimonials />
    <Stats />
    <FAQ />
    <Contact />
  </motion.div>
);

const AboutPage = () => {
  const pillars = [
    { title: "Nutrition", desc: "Healing through condition-specific whole foods.", icon: <Leaf size={24} /> },
    { title: "Sleep", desc: "Restoring the body's natural circadian rhythm.", icon: <Play size={24} /> },
    { title: "Movement", desc: "Scientific exercise protocols for longevity.", icon: <Award size={24} /> },
    { title: "Mindset", desc: "Reducing cortisol through mindfulness.", icon: <Heart size={24} /> },
    { title: "Habits", desc: "Sustainable routine tracking for permanent change.", icon: <Star size={24} /> }
  ];

  const team = [
    { name: "Coach Nandan", role: "Head Nutritionist", img: "/hero.jpg" },
    { name: "Dr. Aarti Singh", role: "Hormonal Health Expert", img: "/hero.jpg" },
    { name: "Sandeep Verma", role: "Mindset & Habits Coach", img: "/hero.jpg" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
      <div className="container">
        <div className="about-grid mb-16">
          <div className="about-image-wrap"><img src="/hero.jpg" alt="Coach Nandan" className="w-full" /></div>
          <div className="about-content">
            <span className="section-tag">About Us</span>
            <h1 className="section-h2">A Journey from Sickness to Science-Backed Healing.</h1>
            <p className="about-lead">Founded by Coach Nandan Singh, Aanandam Wellness Center is a movement to reclaim health naturally.</p>
            <p className="section-desc">Born out of the desire to see a medication-free India, we have spent the last 14 years perfecting a system that addresses the root cause of lifestyle diseases, not just the symptoms.</p>
          </div>
        </div>
        <div className="mission-section mb-16">
          <div className="section-header text-center" style={{ marginBottom: 40 }}>
            <span className="section-tag">Our Methodology</span>
            <h2 className="section-h2">The Five Pillars of Health</h2>
          </div>
          <div className="services-grid">
            {pillars.map((p, i) => (
              <div key={i} className="service-card text-center">
                <div className="service-emoji" style={{ color: '#E87722', marginBottom: 20 }}>{p.icon}</div>
                <h3 className="service-title">{p.title}</h3>
                <p className="service-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="team-section">
          <div className="section-header text-center" style={{ marginBottom: 40 }}>
            <span className="section-tag">Our Experts</span>
            <h2 className="section-h2">Meet Our Specialists</h2>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {team.map((t, i) => (
              <div key={i} className="team-member-card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid var(--accent)' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className="service-title" style={{ fontSize: '20px', marginBottom: '4px' }}>{t.name}</h3>
                <p className="section-tag" style={{ fontSize: '12px', background: 'transparent', padding: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="history-text-section" style={{ marginTop: '80px', background: '#FAFAFA', padding: '60px', borderRadius: '32px', border: '1px solid var(--border)' }}>
          <div className="section-header text-center" style={{ marginBottom: 40 }}>
            <span className="section-tag">Our Heritage & Partnership</span>
            <h2 className="section-h2">Lifestyle Nutrition Centre</h2>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontSize: '26px', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>Herbalife Health Nutrition Products</h3>
              <p>Lifestyle Nutrition Centre in Pakhowal Road has a wide range of Herbalife Health Nutrition products and services to cater to the varied requirements of their customers. The staff at this establishment are courteous and prompt at providing any assistance. They readily answer any queries or questions that you may have. This establishment is functional from 07:00 – 18:00.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '26px', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>About Lifestyle Nutrition Centre</h3>
              <p>Established in the year 2002, Lifestyle Nutrition Centre in Pakhowal Road, Ludhiana is a top player in the category Herbal Health Care Product Distributors-Herbalife in the Ludhiana. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Ludhiana. Over the course of its journey, this business has established a firm foothold in its industry. The belief that customer satisfaction is as important as their products and services, have helped this establishment garner a vast base of customers, which continues to grow by the day. This business employs individuals that are dedicated towards their respective roles and put in a lot of effort to achieve the common vision and larger goals of the company.</p>
              <br/>
              <p>In the near future, this business aims to expand its line of products and services and cater to a larger client base. In Ludhiana, this establishment occupies a prominent location in Pakhowal Road. It is an effortless task in commuting to this establishment as there are various modes of transport readily available. It is known to provide top service in the following categories: Herbal Health Care Product Distributors-Herbalife, Nutritional Supplement Retailers, Health Care Product Distributors-Herbalife, Weight Loss Product Distributors-Herbalife, Skin Care Product Manufacturers-Herbalife, Herbal Shampoo Distributors, Herbalife Weight Loss Product Distributors, Herbalife Weight Managemnet Products, Skin Care Product Manufacturers.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const COURSES_DATA = [
  { id: 1, title: "7-Day Gut Reset Mastery", price: "₹1,999", img: "https://images.unsplash.com/photo-1542614471-001ccf2b449c?q=80&w=800&auto=format&fit=crop", desc: "A comprehensive video guide to restoring your microbiome.", duration: "2.5 Hours • Video Course", lessons: "7 Modules" },
  { id: 2, title: "Hormonal Balance Blueprint", price: "₹3,499", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop", desc: "Learn to manage thyroid and cortisol through specific diet protocols.", duration: "4 Hours • Video Course", lessons: "12 Modules" },
  { id: 3, title: "Mindset for Longevity", price: "₹1,499", img: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=800&auto=format&fit=crop", desc: "Neuro-hacks to reduce systemic stress and improve deep sleep.", duration: "1.5 Hours • Audio + Video", lessons: "5 Modules" }
];

const ServicesPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
    <div className="container">
      <span className="section-tag">Our Expertise</span>
      <h1 className="section-h2 mb-12">Consultation Services</h1>
      <div className="services-grid mb-16">
        {CONSULTATION_SERVICES.map((s, i) => (
          <div key={i} className="service-card" style={{ padding: '40px' }}>
            <div className="service-img-wrap" style={{ marginBottom: '24px', height: '140px' }}><img src={s.img} alt={s.title} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <h3 className="service-title" style={{ fontSize: '24px' }}>{s.title}</h3>
            <p className="service-desc" style={{ fontSize: '16px' }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <span className="section-tag mt-8">Learn at your own pace</span>
      <h2 className="section-h2 mb-12">Premium Paid Courses</h2>
      <div className="services-grid">
        {COURSES_DATA.map((c) => (
          <div key={c.id} className="service-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}><img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="info-label" style={{ margin: 0 }}>{c.duration}</span>
                  <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '18px' }}>{c.price}</span>
               </div>
               <h3 className="service-title" style={{ fontSize: '22px' }}>{c.title}</h3>
               <p className="service-desc" style={{ marginBottom: '24px', flexGrow: 1 }}>{c.desc}</p>
               <Link to={`/course/${c.id}`} className="btn-ghost" style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>View Details <ArrowRight size={16} /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CourseDetailsPage = () => {
  const { id } = useParams();
  const course = COURSES_DATA.find(c => c.id === parseInt(id));
  
  if (!course) return <div className="page-padding container text-center">Course Not Found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
      <div className="container">
        <Link to="/services" className="nav-link" style={{ marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 0 }}>
          <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Services
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '60px', alignItems: 'flex-start', background: '#fff', padding: '48px', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} className="form-row">
           <div style={{ width: '100%' }}>
             <img src={course.img} alt={course.title} style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', height: '100%', minHeight: '300px', boxShadow: 'var(--shadow-md)' }} />
           </div>
           <div>
              <span className="section-tag" style={{ background: 'var(--bg-alt)', color: 'var(--accent-dark)' }}>{course.lessons}</span>
              <h1 className="section-h2" style={{ fontSize: '42px', margin: '16px 0 24px' }}>{course.title}</h1>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>{course.desc} This masterclass includes high-quality video content, downloadable PDFs, and lifetime access so you can learn at your own comfortable pace.</p>
              
              <div style={{ background: 'var(--bg-secondary)', padding: '24px 32px', borderRadius: '20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                 <div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px', margin: 0 }}>Total Price</p>
                    <p style={{ fontSize: '36px', color: 'var(--text-primary)', fontWeight: 800, margin: 0 }}>{course.price}</p>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Star size={16} color="var(--accent)" /> Lifetime Access</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Award size={16} color="var(--accent)" /> Certificate Included</span>
                 </div>
              </div>

              <button className="btn-primary w-full" style={{ padding: '20px', fontSize: '18px' }}>Proceed to Checkout</button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
    <div className="container">
      <div className="section-header text-center">
        <span className="section-tag">Health Blog</span>
        <h1 className="section-h2 mb-12">Latest Articles & Research</h1>
      </div>
      <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        {BLOG_POSTS.map((p) => (
          <motion.div key={p.id} className="service-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <span className="info-label">{p.date}</span>
              <h3 className="service-title" style={{ marginTop: '12px', fontSize: '20px' }}>{p.title}</h3>
              <p className="service-desc">{p.excerpt}</p>
              <Link to={`/blog/${p.id}`} className="nav-link p-0 mt-4" style={{ color: '#E87722', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Read Full Article <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const BlogDetailsPage = () => {
  const { id } = useParams();
  const currentId = parseInt(id);
  const post = BLOG_POSTS.find(p => p.id === currentId);

  if (!post) return <div className="page-padding container text-center">Post Not Found</div>;

  const nextPostId = currentId < BLOG_POSTS.length ? currentId + 1 : 1;
  const nextPost = BLOG_POSTS.find(p => p.id === nextPostId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" className="nav-link" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 0 }}>
          <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Blog
        </Link>
        <img src={post.img} alt={post.title} style={{ width: '100%', borderRadius: '32px', marginBottom: '40px', objectFit: 'cover', height: '400px', boxShadow: 'var(--shadow-md)' }} />
        
        <span className="section-tag">{post.date}</span>
        <h1 className="section-h2" style={{ margin: '24px 0 32px', fontSize: '56px' }}>{post.title}</h1>
        
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '19px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p className="about-lead" style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--text-primary)' }}>
            {post.excerpt}
          </p>
          
          <p style={{ marginBottom: '32px' }}>{post.content}</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--text-primary)', margin: '48px 0 24px' }}>The Science Behind The Approach</h3>
          <p style={{ marginBottom: '24px' }}>When we look deeply into how our bodies function on a cellular level, it becomes clear that isolated treatments often fall short. Holistic health requires us to analyze not just our biological markers, but our environment, daily stressors, and eating patterns. Integrating these allows true sustainable healing rather than temporary symptom management.</p>
          <p style={{ marginBottom: '32px' }}>Our modern lifestyle exposes us to unseen inflammation triggers. By returning to the foundational pillars of health, we signal to our genetics that it is safe to repair and thrive.</p>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--text-primary)', margin: '48px 0 24px' }}>Actionable Steps You Can Take Today</h3>
          <ul style={{ marginBottom: '48px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Start with Hydration:</strong> Drink at least 2 liters of water daily, infused with a pinch of Himalayan pink salt for natural electrolytes.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Mindful Eating:</strong> Chew your food slowly. Digestion begins in the mouth, and this simple act reduces gut inflammation significantly.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Prioritize Sleep:</strong> Your body does 90% of its healing, hormonal balancing, and cellular repair while you are in deep sleep.</li>
          </ul>

          <div style={{ padding: '40px', background: 'var(--bg-alt)', borderRadius: '24px', border: '1px solid var(--border-light)' }}>
            <p style={{ fontStyle: 'italic', fontSize: '20px', margin: 0, color: 'var(--accent-dark)' }}>
              "Choosing natural wellness is a commitment to your future self. At Coach Nandan's center, we believe in providing the education and tools necessary for you to become your own healthcare advocate."
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', fontWeight: 800 }}>Share Article</span>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', color: 'var(--text-primary)' }}>
              <Facebook /> <Instagram /> <Youtube />
            </div>
          </div>
          {nextPost && (
            <Link to={`/blog/${nextPost.id}`} className="btn-primary" style={{ padding: '16px 32px' }}>
              Read Next: {nextPost.title.split(' ').slice(0, 3).join(' ')}... <ArrowRight size={18} />
            </Link>
          )}
        </div>

      </div>
    </motion.div>
  );
};

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
    <div className="container">
      <div className="contact-grid">
        <div className="contact-left">
          <span className="section-tag">Reach Us</span>
          <h1 className="section-h2">Find Our Center</h1>
          <p className="section-desc">Located in the heart of Raipur, we are ready to welcome you for a physical consultation.</p>
          <div className="contact-info-list" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="info-item" style={{ marginBottom: 0 }}>
              <div className="info-icon"><MapPin size={18} /></div>
              <div><p className="info-label">Corporate Address</p><p className="info-text">First Floor, Raipur Rd, above Aarti Medical Stores, Krishna Nagar, Ramnagar, Kota, Raipur, Gudhiyari, Chhattisgarh 492009</p></div>
            </div>
            <div className="info-item" style={{ marginBottom: 0 }}>
              <div className="info-icon"><Mail size={18} /></div>
              <div><p className="info-label">Email Us</p><p className="info-text"><a href="mailto:Nandansinghgod@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>Nandansinghgod@gmail.com</a></p></div>
            </div>
            <div className="info-item" style={{ marginBottom: 0 }}>
              <div className="info-icon"><MessageCircle size={18} /></div>
              <div><p className="info-label">Contact No.</p><p className="info-text">+91 98272 45171</p></div>
            </div>
          </div>
          <div className="map-placeholder" style={{ marginTop: '30px', height: '300px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <iframe 
              src="https://maps.google.com/maps?q=First+Floor,+Raipur+Rd,+above+Aarti+Medical+Stores,+Krishna+Nagar,+Ramnagar,+Kota,+Raipur,+Gudhiyari,+Chhattisgarh+492009&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="Aanandam Wellness Center Location"
            ></iframe>
          </div>
        </div>
        <div className="contact-right">
          <div className="form-card" style={{ marginBottom: 0 }}>
            <h3 className="service-title">Request a Call</h3>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" placeholder="Full Name" required /></div>
                <div className="form-group"><label>WhatsApp Number</label><input type="tel" placeholder="+91 XXXX" required /></div>
              </div>
              <div className="form-group">
                <label>Service Interested In</label>
                <select required>
                  <option value="">Choosing Path...</option>
                  <option value="nutrition">Therapeutic Nutrition</option>
                  <option value="weight">Weight Recomposition</option>
                </select>
              </div>
              <div className="form-group"><label>Current Challenges</label><textarea placeholder="e.g. Chronic Fatigue, Thyroid, etc." rows="3"></textarea></div>
              <button type="submit" className="btn-primary w-full btn-lg">Confirm My Free Consultation</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const LegalPage = ({ title, content }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-padding">
    <div className="container" style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '60px 80px', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
      <h1 className="section-h2" style={{ fontSize: '48px', marginBottom: '40px' }}>{title}</h1>
      <div style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {content}
      </div>
    </div>
  </motion.div>
);
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<LegalPage title="Terms and Condition" content={<><p>These terms and conditions outline the rules and regulations for the use of Coach Nandan's Website.</p><p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Coach Nandan if you do not agree to take all of the terms and conditions stated on this page.</p><p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.</p></>} />} />
          <Route path="/privacy" element={<LegalPage title="Privacy & Policy" content={<><p>At Coach Nandan, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Coach Nandan and how we use it.</p><p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p></>} />} />
          <Route path="/terms-service" element={<LegalPage title="Terms Of Service" content={<><p>By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p><p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Coach Nandan.</p><p>Coach Nandan has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p></>} />} />
          <Route path="/refund" element={<LegalPage title="Refund and Replacement Policy" content={<><p>We stand behind our commitments and your satisfaction is important to us.</p><p>Because our consultation services and digital products are delivered directly, we have a strict policy on when refunds and replacements apply. If there are processing issues or errors in delivery, we will happily review it upon request.</p><p>Refund requests are handled on a case-by-case basis and are examined carefully to ensure fairness for both parties.</p></>} />} />
        </Routes>
        <Footer />
        <WhatsAppFAB />
      </div>
    </Router>
  );
}

export default App;
