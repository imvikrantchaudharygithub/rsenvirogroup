# 🌊 RS ENVIRO GROUP — Complete Website Development Prompt for Cursor AI

> **Instruction to Cursor:** Use your full UI/UX Pro skills to design and build this website. Apply production-grade design thinking, advanced CSS animations, smooth scroll interactions, and a highly polished visual identity. Every section must feel intentional, modern, and premium. Do not use generic layouts or cookie-cutter components.

---

## 📋 PROJECT OVERVIEW

**Client:** RS Enviro Group  
**Website Name:** rsenvirogroup  
**Business Type:** Environmental Engineering & Water Treatment Solutions + Electrical Control Panel Manufacturing  
**Location:** Ghaziabad, Uttar Pradesh, India  
**GST No:** 09BMKPS9449G3Z6  
**Contact:** +91-8860245912 | +91-9871189839  
**Email:** rscontrol1988@gmail.com  
**Owner/Proprietor:** Jitendra Singh  

### Two Core Business Divisions:
1. **R.S. Enviro Water & Management** — Design, supply, installation & O&M of STP, ETP, WTP, RO, Softener, UF Plants
2. **R.S. Control Panel & Automation** — Manufacturer & supplier of HT/LT panels, MCC, PLC, STP/ETP panels, Drive Panels, and all electrical automation systems

---

## 🎨 DESIGN SYSTEM

### Color Palette

```css
:root {
  /* Primary — Deep Ocean Blue */
  --color-primary:        #0B2B5C;   /* navbar, section headers, trust elements */
  --color-primary-light:  #1A4A8A;   /* hover states, active links */

  /* Accent — Electric Teal / Aqua */
  --color-accent:         #00C9B1;   /* CTAs, highlights, animated underlines */
  --color-accent-glow:    #00FFE1;   /* glow effects, neon accents */

  /* Secondary — Steel Grey */
  --color-secondary:      #1E293B;   /* dark section backgrounds */
  --color-surface:        #F0F6FF;   /* light section backgrounds */

  /* Neutrals */
  --color-white:          #FFFFFF;
  --color-off-white:      #F7FAFD;
  --color-text-dark:      #0D1B2A;
  --color-text-mid:       #3D5A80;
  --color-text-light:     #8EAFD4;
  --color-border:         rgba(0, 201, 177, 0.2);

  /* Gradients */
  --gradient-hero:     linear-gradient(135deg, #0B2B5C 0%, #0E4D7B 50%, #0B2B5C 100%);
  --gradient-accent:   linear-gradient(90deg, #00C9B1, #0087FF);
  --gradient-card:     linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  --gradient-water:    linear-gradient(180deg, #0B2B5C 0%, #0A1628 100%);
}
```

### Typography

```css
/* Import in <head> */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display:  'Syne', sans-serif;       /* headings, hero, section titles */
  --font-body:     'DM Sans', sans-serif;    /* body text, descriptions, nav */
  --font-mono:     'JetBrains Mono', monospace; /* stats, numbers, labels */

  --size-hero:     clamp(3rem, 7vw, 6.5rem);
  --size-h2:       clamp(2rem, 4vw, 3.5rem);
  --size-h3:       clamp(1.3rem, 2.5vw, 1.8rem);
  --size-body:     1.05rem;
  --size-small:    0.875rem;
  --line-body:     1.75;
}
```

### Spacing & Layout

```css
:root {
  --section-padding: clamp(5rem, 10vw, 9rem) 0;
  --container:       min(90%, 1280px);
  --radius-sm:       8px;
  --radius-md:       16px;
  --radius-lg:       24px;
  --radius-xl:       40px;
  --shadow-card:     0 4px 24px rgba(11, 43, 92, 0.12);
  --shadow-glow:     0 0 40px rgba(0, 201, 177, 0.25);
  --transition:      all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## ✨ ANIMATIONS & INTERACTION SYSTEM

### Required Animation Library
```html
<!-- In <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<!-- Before </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

### Animation Patterns to Implement

**1. Hero Section — Cinematic Entrance:**
- Background: animated gradient + floating particle dots (SVG/canvas water ripple effect)
- Headline: staggered word-by-word reveal using `clipPath` or `translateY` + opacity
- Subtext: fade-in with 0.4s delay after headline
- CTA buttons: slide-up with scale bounce
- Hero image/mockup: parallax depth on scroll

**2. Scroll-Triggered Section Reveals:**
```js
// Pattern for all sections
gsap.from(".section-content", {
  scrollTrigger: { trigger: ".section-content", start: "top 80%" },
  y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
});
```

**3. Counter Animation (Stats Section):**
- Numbers count up from 0 when scrolled into view
- Use `IntersectionObserver` + requestAnimationFrame

**4. Hover Effects:**
- Service cards: `transform: translateY(-8px)` + left border glow in `--color-accent`
- Navigation links: animated underline that slides in from left
- Buttons: background gradient shift + slight scale on hover

**5. Water Wave Divider:**
- SVG wave between sections — animate with CSS `@keyframes` horizontal movement

**6. Floating Elements:**
- Subtle `@keyframes float` on decoration elements (icons, blobs)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
```

**7. Cursor Custom Style:**
```css
* { cursor: none; }
/* Custom aqua dot cursor that trails the mouse */
```

**8. Page Load Preloader:**
- Minimal preloader: animated water drop SVG + "RS ENVIRO GROUP" text fading in/out
- Fade out after 1.5s

---

## 🗺️ WEBSITE STRUCTURE & PAGE ARCHITECTURE

### Single Page Application (SPA) with smooth anchor scroll

```
/index.html
  ├── Preloader
  ├── Navigation (sticky, transforms on scroll)
  ├── Section 1: Hero
  ├── Section 2: About Us
  ├── Section 3: Our Divisions (2 business units)
  ├── Section 4: Services — Water Treatment
  ├── Section 5: Services — Control Panels
  ├── Section 6: Products Gallery
  ├── Section 7: Stats / Why Choose Us
  ├── Section 8: Clients / Projects
  ├── Section 9: Process / How We Work
  ├── Section 10: Testimonials (placeholder)
  ├── Section 11: Contact
  └── Footer
```

---

## 🔧 SECTION-BY-SECTION DETAILED SPECS

---

### 🔹 PRELOADER
- Full-screen dark overlay (`#0B2B5C`)
- Animated SVG water drop that fills with `--color-accent`
- Company name "RS ENVIRO GROUP" typed out character by character
- Smooth fade-out transition to hero

---

### 🔹 NAVIGATION

**Design:**
- Transparent on top of hero → solid `rgba(11, 43, 92, 0.95)` + `backdrop-filter: blur(20px)` on scroll (using `scrolled` class added via JS)
- Logo: Left — "RS ENVIRO GROUP" in `--font-display`, bold, with teal accent dot on "RS"
- Nav Links (right): Home | About | Services | Products | Clients | Contact
- CTA Button: "Get a Quote" — teal filled, pill shape, with hover glow effect
- Mobile: hamburger menu → full-screen slide-over panel with stagger animation

**HTML Structure:**
```html
<nav id="navbar" class="navbar">
  <div class="nav-container">
    <a href="#" class="nav-logo">
      <span class="logo-rs">RS</span> ENVIRO GROUP
    </a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="#clients">Clients</a></li>
      <li><a href="#contact" class="nav-cta">Get a Quote</a></li>
    </ul>
    <button class="hamburger" aria-label="menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

---

### 🔹 SECTION 1: HERO

**Layout:** Full-viewport height, dark background with animated water particle effect

**Content:**
```
TAGLINE (small caps, teal, tracking-wide):
  "CLEAN WATER. SMART POWER. BETTER ENVIRONMENT."

HEADLINE (Syne, 6rem, white, bold):
  "Engineering India's
   Water Future"

SUBTEXT (DM Sans, 1.2rem, light blue-grey):
  "RS Enviro Group delivers end-to-end environmental engineering solutions — 
   from Sewage & Effluent Treatment Plants to advanced Electrical Control 
   Automation — serving 20+ prestigious clients across North India since 2008."

CTA BUTTONS:
  [Explore Services →]   [View Our Projects]

SCROLL INDICATOR: animated bouncing chevron at bottom
```

**Background:**
- Dark gradient (`--gradient-water`)
- Animated floating particles (small white dots, low opacity — simulating water molecules)
- Large decorative water drop SVG shape on the right side (partially off-screen, filled with gradient + glass effect)
- Subtle animated mesh gradient overlay

**Stats Bar (below fold, scroll to trigger):**
```
  [20+] Projects Delivered   |   [15+] Years Experience   |   [6+] States Served   |   [500+] KLD Capacity Managed
```
(Each number counts up on scroll)

---

### 🔹 SECTION 2: ABOUT US

**Layout:** Two-column — left: content, right: image/visual composition

**Content:**
```
LABEL: "WHO WE ARE"

HEADLINE:
  "A Legacy of Clean Water
   & Reliable Power"

BODY TEXT:
  RS Enviro Group is an Ghaziabad-based environmental engineering 
  group comprising two complementary divisions: R.S. Enviro Water & 
  Management, specializing in design, supply, installation, and operation 
  of water and wastewater treatment systems; and R.S. Control Panel & 
  Automation, a manufacturer and supplier of industrial electrical control 
  panels and automation systems.

  Founded to address India's growing demand for clean water and 
  smart infrastructure, we bring together chemical, mechanical, and 
  electrical engineers with decades of combined experience. We serve 
  group housing societies, hospitals, hotels, industrial units, and 
  municipalities across Uttar Pradesh, Uttarakhand, Haryana, and beyond.

  Our GST-registered operations are guided by a core belief: every drop 
  of water matters, and every circuit must be right.

KEY POINTS (icon + text grid, 2×2):
  💧 Established 2008 (Control Panels) / 2019 (Water Systems)
  ⚡ Dual expertise: Water + Electrical Automation
  🏗️ 20+ major infrastructure projects delivered
  🔒 GST Certified | Registered Company | Insured Operations
```

**Right Visual:**
- Layered image card composition showing plant photos from the PDF
- Floating badge element: "Since 2008" in a circular accent badge
- Decorative teal vertical line element

---

### 🔹 SECTION 3: OUR DIVISIONS

**Layout:** Two large side-by-side cards, full width, with hover depth effect

**Card 1 — R.S. Enviro Water & Management:**
```
ICON: animated water drop SVG
TITLE: "Enviro Water & Management"
TAGLINE: "Treating every drop with precision"
DESCRIPTION:
  Specialists in the design, supply, installation, and operation & maintenance 
  of complete water and wastewater treatment systems. From sewage and 
  effluent treatment to RO-based purification and water softening — we 
  engineer compliance-ready, eco-friendly water solutions.

TAGS: STP | ETP | WTP | RO | Softener | UF Plants | O&M Contracts

LINK: "Explore Water Solutions →"
```

**Card 2 — R.S. Control Panel & Automation:**
```
ICON: animated circuit/panel SVG
TITLE: "Control Panel & Automation"  
TAGLINE: "Right and Smart — powering every process"
DESCRIPTION:
  A Faridabad-based manufacturer and Ghaziabad-based supplier of a 
  comprehensive range of electrical panels including HT/LT Panels, Motor 
  Control Centres, PLC Panels, Drive Panels, STP/ETP Panels, and more. 
  Trusted by hospitals, builders, and industry since 2008.

TAGS: HT Panel | MCC | PLC | Drive Panels | RO Panels | STP/ETP Panels

LINK: "Explore Panel Solutions →"
```

**Design:**
- Dark card (#1E293B) with glass-morphism border
- On hover: card lifts + glowing teal left border + subtle background shift
- Large icon with animated stroke on hover

---

### 🔹 SECTION 4: WATER TREATMENT SERVICES

**Layout:** Header + 3-column card grid (2 rows = 6 services)

**Section Header:**
```
LABEL: "WATER & WASTEWATER SOLUTIONS"
HEADLINE: "Complete Water Treatment
           Under One Roof"
SUBTEXT: "From design to commissioning to long-term O&M — we handle every 
          stage of your water treatment lifecycle."
```

**Service Cards (6 total):**

```
1. SEWAGE TREATMENT PLANT (STP)
   Biological treatment of domestic and municipal sewage using MBR, SBR, 
   FAB, and conventional activated sludge processes. Capacities from 10 KLD 
   to 900 KLD — compliant with CPCB norms for reuse in flushing and gardening.
   ICON: sewage/pipe illustration

2. EFFLUENT TREATMENT PLANT (ETP)
   Industrial wastewater treatment for chrome plating units, automobile 
   industries, car washing, textile, and food processing. Physio-chemical 
   treatment with filter press and membrane recovery systems.
   ICON: industrial tank

3. WATER TREATMENT PLANT (WTP)
   Pre-filtration and softening systems for group housing societies. 
   Available from 100 KLD to 240 KLD capacity. Includes sand filtration, 
   activated carbon filtration, and multi-grade filter systems.
   ICON: filtration system

4. REVERSE OSMOSIS (RO) SYSTEM
   Industrial RO mineral water plants for offices, hospitals, restaurants, 
   laboratories, and bottled water facilities. Capacities from 100 LPH to 
   50,000 LPH — single, double, triple-pass configurations.
   ICON: RO membrane

5. SOFTENING & DM PLANTS
   Water softening plants for laundry, boilers, ice factories, and soft 
   drink plants. Demineralized water plants for paper mills, testing labs, 
   and pharmaceutical use. DM Plant with MB Unit (5 m³/hr capacity).
   ICON: softener tanks

6. ULTRA-FILTRATION (UF) PLANTS
   Membrane-based UF systems for wastewater recovery, process water 
   reuse, and high-purity applications. Oil/water separators. 
   Operation & Maintenance contracts available for all plant types.
   ICON: UF membrane

PLUS ADDITIONAL O&M SERVICES:
   Annual Maintenance Contracts | Manpower Supply | Commissioning |
   Chemical & Spares Supply | Equipment Revamping & Upgradation
```

**Card Design:**
- White background on light section
- Teal top-border accent (3px)
- Icon in teal circle background
- Hover: card elevates, border becomes full teal glow
- "Learn More" link in teal with animated arrow

---

### 🔹 SECTION 5: CONTROL PANEL PRODUCTS

**Layout:** Header + icon-grid product list + featured product visual on right

**Section Header:**
```
LABEL: "ELECTRICAL CONTROL SYSTEMS"
HEADLINE: "Industrial-Grade Panels
           Built for Reliability"
SUBTEXT: "RS Control Panel & Automation — Right and Smart. Established 2008, 
          we manufacture tailored electrical control solutions for water 
          treatment, industrial, and commercial applications."
```

**Product Grid (3 columns × 2 rows, icon cards):**
```
Row 1:
  HT Panel              | Main LT Panels          | Motor Control Centre (MCC)
  Double Bus Bar System | Control & Relay Panels  | DG AMF Panels

Row 2:
  PLC Panels            | AC Drive & Soft Starter | STP / ETP Panels
  RO Panels             | APFCR Panels            | Lighting Distribution Boards

Row 3:
  Drive Panels          | Junction Boxes & Bay    | Automatic Power Factor
                        | Marshaling Kiosks       | Correction Panel
                        
  Distribution Boards   | Feeder Pillar Panel     | Bus Ducts
```

**Manufacturing Capabilities (side panel):**
```
  Our Equipment:
  • Pneumatic Tools
  • Ferule Printing Machine
  • PVC Wire Cutting Machine
  • Stripping & Lug Crimping Machine
```

**Values Grid (bottom of section):**
```
  ✦ Core Values: Excellence | Empathy | Environment | Ethics
  ✦ Vision: Customer-driven total quality, world-class manufacturing
  ✦ Team: Professionalism | Passion | Positive Attitude | Pride
```

---

### 🔹 SECTION 6: PRODUCTS / PROJECT GALLERY

**Layout:** Masonry/bento grid image gallery

**Gallery Categories (filter tabs):**
- All | STP Plants | ETP Plants | WTP/Pre-Filtration | RO Systems | UF Plants | Control Panels

**Featured Projects (use image placeholders with overlay captions — actual images from client):**
```
1. RO Plant 3000 LPH with Pre-Filters (Residential)
2. Pre-Filtration & Softening System — 100 KLD
3. Pre-Filtration & Softening System — 240 KLD
4. Sewage Treatment Plant — 200 KLD
5. Ultra-Filtration Plant (HydraCap 80 membranes)
6. Effluent Treatment Plant — 30 KLD
7. ETP 10 KLD — Chrome Plating Unit
8. ETP 10 KLD — Automobile Industries
9. ETP 10 KLD — Car Washing Application
10. DM Plant with MB Unit — 5 m³/hr
11. Control Panels — HT/LT, MCC, PLC series
```

**Gallery Design:**
- Dark section background
- Each item: dark card with image + teal category tag + title overlay
- Hover: image zooms slightly + overlay darkens + "View Project" button appears
- Filter tabs animate with underline slide effect

---

### 🔹 SECTION 7: WHY CHOOSE US / STATS

**Layout:** Dark section, full-width, 2 halves: stats left, content right

**Stats (animated count-up on scroll):**
```
  20+       Projects Delivered
  15+       Years Combined Experience
  500+ KLD  Treatment Capacity Managed
  6+        States Served
  50+       Industrial RO Plants Supplied
  100 LPH   to 50,000 LPH — RO Range
```

**Why Choose Us — 4 Pillars:**
```
  💡 INTEGRATED EXPERTISE
     One group delivering both water treatment engineering AND 
     electrical control automation — rare synergy for turnkey projects.

  🏗️ TURNKEY CAPABILITY
     Design → Engineering → Supply → Installation → Commissioning 
     → Operation & Maintenance. Complete project lifecycle management.

  📋 COMPLIANCE-FIRST
     All systems designed for CPCB/SPCB compliance. Serving 
     hospitals, municipalities, and housing societies with regulatory 
     peace of mind.

  ⚙️ RAPID RESPONSE
     Committed service within promised timelines. Trained technicians 
     on standby. Annual Maintenance Contracts ensure zero downtime.
```

---

### 🔹 SECTION 8: OUR CLIENTS

**Layout:** Tabbed client showcase — Builders | Hospitals | Hotels | Industry | Government

**Headline:**
```
"Trusted by India's Leading Organizations"
"20+ Prestigious Clients | North India's Premier Water & Automation Partner"
```

**Client List (from PDFs):**

**Builders & Developers:**
- Gaursons Group (Greater Noida) — STP 425/400/575 KLD
- Nirala Group (Greater Noida) — STP 420 KLD
- County Group (Noida) — STP 320/250 KLD
- SKA Group (Greater Noida) — WTP 200 KLD
- Saya Group (Ghaziabad) — STP cum WTP 200 KLD
- Himalaya Group (Ghaziabad) — STP 160 KLD
- Migsun Group (Ghaziabad) — STP 500 KLD
- Karyan Group (Ghaziabad) — STP 100 KLD
- Ashiana Homes NCLT (Gurgaon) — STP 900 KLD
- MKS County (Haryana) — STP 400 KLD
- Manisha Project Pvt Ltd (Aligarh) — STP 200 KLD
- Arcadia Heloxe (Dehradun) — STP 100 KLD
- Earthcon Builders (Dehradun) — STP 100 KLD
- Ghati Developers (Dehradun) — STP 40 KLD

**Hospitals & Healthcare:**
- KGMU Hospital (Lucknow) — STP cum ETP 150 KLD
- Coronation Hospital (Dehradun) — STP 40 KLD
- City Hearts Hospital (Dehradun)
- Heart Hospital (Dehradun) — STP 10 KLD
- Hans Foundation (Dehradun)
- Saint Paul Hospital
- Arogyam

**Hotels & Resorts:**
- ITC Hotel, Jim Corbett (Corporate) — STP cum ETP 40 KLD
- Marbella Hotel & Resorts (Dehradun) — STP 30 KLD
- Hotel Ghati Developeresh (Dehradun)
- Hotel The Ritz & Resorts
- BDJ Enterprises (Muzaffarnagar)
- Motel Gajraj | Imperial Plaza

**Industries & Others:**
- Hero Motors (Karnal) — STP cum ETP 80 KLD
- NDDB Dairy Services
- Shakti Pump
- BCC Infrastructure Pvt Ltd (Bharat City)
- Dhal Engineering
- Hyatt Regency Dehradun

**Panel & Automation Clients (RS Control Panel):**
- BCC Infrastructure Pvt Ltd (Bharat City)
- Dhal Engineering | Shakti Pump
- King George's Medical University (KGMU)
- Fortune Hotels (ITC Group)
- Migsun Group | Sun City | Earthcon
- Ghati Developers | NDDB Dairy Services
- County Group | ABA Corp | Himalaya City Center
- Shiv Kumar Aggarwal Dehradun
- Auric City Homes Faridabad
- Vanshika Greens | City of Maple Heights
- Government Medical College, Pali Rajasthan
- Arcadia Hillocks Mussorie Road, Dehradun

**Design:**
- Client logo grid with grayscale → color on hover
- Project cards with client name, location, plant type, capacity
- Tabbed filter for sector
- Infinite horizontal scroll marquee for logo strip

---

### 🔹 SECTION 9: HOW WE WORK (PROCESS)

**Layout:** Horizontal timeline (desktop) / Vertical timeline (mobile)

**Steps:**
```
  01. ENQUIRY & CONSULTATION
      Share your requirements. Our engineers analyze site conditions, 
      water quality, and regulatory requirements to understand your needs.

  02. FEASIBILITY & DESIGN
      We prepare a detailed feasibility study, engineering design, 
      process flow diagrams, and cost estimates tailored to your project.

  03. SUPPLY & MANUFACTURING
      All equipment is sourced/manufactured to exact specifications. 
      Electrical panels are assembled at our Ghaziabad facility with 
      quality-tested components.

  04. INSTALLATION & COMMISSIONING
      Our expert team installs and commissions the complete system 
      on-site, ensuring it meets performance guarantees and 
      regulatory compliance before handover.

  05. OPERATION & MAINTENANCE
      Ongoing O&M contracts, manpower supply, annual maintenance, 
      spares supply, and 24/7 support to ensure zero downtime and 
      full regulatory compliance.
```

**Design:**
- Numbered steps with teal accent circles connected by animated line
- On scroll, the connecting line draws itself (SVG stroke animation)
- Icon illustration for each step

---

### 🔹 SECTION 10: CONTACT

**Layout:** Left — contact info + map placeholder, Right — contact form

**Contact Information:**
```
R.S. ENVIRO WATER & MANAGEMENT
Plot No. 31, S3 Naveen Park, Sahibabad,
Ghaziabad – 201005, Uttar Pradesh, India

R.S. CONTROL PANEL & AUTOMATION
Plot No. 4, Anand Industrial Area,
Mohan Nagar, Ghaziabad, U.P.

📞 +91-8860245912
📞 +91-9871189839
✉️ rscontrol1988@gmail.com
🌐 www.rscontrol.onlineindia.org
🏛️ GST No: 09BMKPS9449G3Z6

OWNER: Jitendra Singh (Proprietor)
```

**Contact Form Fields:**
```
- Full Name *
- Company / Organization
- Email Address *
- Phone Number *
- Service Interest (Dropdown):
    → STP | ETP | WTP | RO Plant | Softener/DM Plant
    → Control Panels | O&M Contract | Other
- Capacity / Requirement (text)
- Message / Project Details
- [Send Enquiry →] Button
```

**Design:**
- Dark section background
- Form: glass-morphism card with teal focus states
- Input labels animate above on focus (floating label pattern)
- Submit button: full-width, teal gradient, hover glow
- Left side: info blocks with teal icon + text, separated by subtle lines

---

### 🔹 FOOTER

**Design:** Dark (`#0A1628`), organized 4-column layout

```
Column 1: LOGO + TAGLINE
  RS ENVIRO GROUP
  "Engineering India's Water Future"
  [Social icons: LinkedIn | WhatsApp | Email]

Column 2: QUICK LINKS
  Home | About | Water Services | Panel Products
  Gallery | Clients | Process | Contact

Column 3: OUR SERVICES
  Sewage Treatment Plants
  Effluent Treatment Plants
  Water Treatment Plants
  RO / Softener / DM Plants
  Control Panels & Automation
  O&M Contracts

Column 4: CONTACT
  Plot No. 31, S3 Naveen Park
  Sahibabad, Ghaziabad-201005
  +91-8860245912
  rscontrol1988@gmail.com
  GST: 09BMKPS9449G3Z6

BOTTOM BAR:
  © 2024 RS Enviro Group. All Rights Reserved.
  | Designed with 💧 for a Cleaner India
```

**Footer Design:**
- Subtle water wave SVG at the very top of footer
- Thin teal divider line
- Social links with hover glow animation

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
@media (min-width: 480px)  { /* small mobile */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* laptop */ }
@media (min-width: 1280px) { /* desktop */ }
@media (min-width: 1536px) { /* wide screens */ }
```

**Key Responsive Rules:**
- Navigation: hamburger → full-screen mobile menu with slide-in animation
- Hero headline: scale from 2.5rem (mobile) to 6.5rem (desktop)
- Services grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Stats bar: 2×2 grid (mobile) → 4-in-a-row (desktop)
- Process timeline: vertical (mobile) → horizontal (desktop)
- Client logos: 2 col (mobile) → marquee scroll (desktop)
- Footer: stacked (mobile) → 4-column (desktop)

---

## ⚙️ TECHNICAL REQUIREMENTS

### File Structure
```
rsenvirogroup/
├── index.html
├── css/
│   ├── main.css          (variables, reset, base)
│   ├── animations.css    (all keyframes, transitions)
│   ├── components.css    (cards, buttons, forms)
│   └── responsive.css    (all media queries)
├── js/
│   ├── main.js           (init, scroll, navbar)
│   ├── animations.js     (GSAP, counters, reveals)
│   ├── particles.js      (hero particle effect)
│   └── preloader.js      (loading screen)
├── images/               (client to provide actual images)
│   ├── hero-bg.jpg
│   ├── plants/           (product images)
│   └── clients/          (client logos)
└── assets/
    └── icons/            (SVG icons)
```

### Performance Requirements
- Lazy load all images below the fold
- CSS animations prefer `transform` and `opacity` (GPU composited)
- Use `will-change: transform` sparingly on animated elements
- Intersection Observer for all scroll-triggered animations
- Critical CSS inlined in `<head>`
- Fonts preloaded with `<link rel="preload">`

### SEO Basics
```html
<title>RS Enviro Group | Water Treatment & Control Panel Solutions — Ghaziabad</title>
<meta name="description" content="RS Enviro Group — Leading provider of STP, ETP, WTP, RO water treatment systems and industrial electrical control panels in North India. Serving 20+ clients since 2008.">
<meta name="keywords" content="STP, ETP, WTP, RO plant, water treatment, control panel, Ghaziabad, Noida, Dehradun, wastewater, sewage treatment">
```

---

## 🎯 UI/UX PRO DIRECTIVES FOR CURSOR

> **Cursor must implement all of the following without exception:**

1. **No generic layouts.** Every section must have a unique compositional approach — no two sections should feel like copies of each other.

2. **Micro-interactions everywhere.** Every button, link, card, and input must have a thoughtful hover/focus/active state.

3. **Depth and layering.** Use z-index, subtle shadows, glassmorphism, and overlapping elements to create visual depth throughout.

4. **Motion hierarchy.** The most important content animates first and most prominently. Supporting content follows with slight delay.

5. **Dark sections alternate with light.** Hero (dark) → About (light) → Divisions (dark) → Services (light) → Gallery (dark) → Stats (dark) → Clients (light) → Process (light) → Contact (dark) → Footer (darkest).

6. **Custom SVG illustrations.** Create simple but elegant SVG icons for each service, and decorative SVG wave/water elements for dividers.

7. **Smooth scroll behavior.** `scroll-behavior: smooth` + custom JS smooth scroll with easing for navigation links.

8. **WhatsApp floating button.** Fixed bottom-right: "Chat on WhatsApp" with animated pulse ring — links to `https://wa.me/918860245912`.

9. **Back to Top button.** Appears after 300px scroll, smooth return to top.

10. **Form validation.** Real-time validation with helpful error messages. Submit shows loading spinner → success message.

11. **Accessibility.** ARIA labels, keyboard navigation, focus rings, skip-to-content link, proper heading hierarchy.

12. **Water theme throughout.** Ripple effects, wave SVGs, droplet shapes, fluid motion — water should be the visual metaphor woven through the entire design.

---

## 🚀 PRIORITY BUILD ORDER

Build in this exact sequence for best results:

```
Phase 1: Foundation
  ✅ CSS variables, reset, typography, grid system
  ✅ Navigation component (responsive)
  ✅ Hero section (with particles)
  ✅ Preloader

Phase 2: Core Sections
  ✅ About Us
  ✅ Two Divisions cards
  ✅ Water Services grid
  ✅ Control Panel products

Phase 3: Rich Content
  ✅ Gallery with filter
  ✅ Stats/counter section
  ✅ Clients section (with logos)

Phase 4: Conversion & Utility
  ✅ Process timeline
  ✅ Contact form
  ✅ Footer
  ✅ WhatsApp button + Back to top

Phase 5: Polish
  ✅ GSAP scroll animations
  ✅ Counter animations
  ✅ Custom cursor
  ✅ Preloader refinement
  ✅ Mobile QA
  ✅ Performance pass
```

---

## 📌 IMPORTANT NOTES FOR CURSOR

- **Brand name in UI:** Use "RS Enviro Group" as the umbrella brand. Subdivision names appear in relevant sections only.
- **Tone of copy:** Professional, trustworthy, technically credible, yet accessible. No jargon overload.
- **Image placeholders:** Use tasteful gradient placeholder cards with icons until real images are provided. Do NOT use Lorem Picsum random images.
- **No stock photos of generic people.** Only use industrial/technical imagery relevant to water treatment and electrical panels.
- **Color purity:** Never introduce off-brand colors. Stick strictly to the defined palette.
- **Testing:** Ensure the site looks perfect on iPhone 14 (390px), iPad Pro (1024px), and 1920px desktop.

---

*Prompt Version: 1.0 | Created for: RS Enviro Group Website Development*  
*Use this file as the complete design + content brief in Cursor AI*  
*All content derived from official company documents provided by the client*
