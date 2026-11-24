import type { StaticImageData } from 'next/image';

import hyderabadSkylineHero from '@/src/assets/images/hyderabad_skyline_hero_1795550618455.jpg';
import luxuryVillaJubilee from '@/src/assets/images/luxury_villa_jubilee_1795550652501.jpg';
import skyscraperApartmentsNeopolis from '@/src/assets/images/skyscraper_apartments_neopolis_1795550615280.jpg';
import commercialOfficeHitec from '@/src/assets/images/commercial_office_hitec_1795550632015.jpg';
import plottedEstateCorridor from '@/src/assets/images/plotted_estate_corridor_1795550617935.jpg';
import globalRealEstateDubai from '@/src/assets/images/global_real_estate_dubai_1795550617749.jpg';
import rkArchitecturalEmblem from '@/src/assets/images/rk_architectural_emblem_1795551554770.jpg';

export type PropertySegment =
  | 'Luxury Villas'
  | 'Skyscrapers & Apartments'
  | 'Open Plots'
  | 'Commercial & Office'
  | 'Global Opportunities';

export interface PortfolioProperty {
  id: string;
  title: string;
  segment: PropertySegment;
  location: string;
  corridor: 'West Hyderabad' | 'Central Heritage' | 'South Corridor' | 'International';
  areaSpec: string;
  configuration: string;
  possession: string;
  approvalStatus: string;
  priceGuidance: string;
  summary: string;
  highlights: string[];
  image: StaticImageData;
  imageAlt: string;
  featuredSpan?: 'wide' | 'standard';
}

export interface AdvisoryService {
  index: string;
  title: string;
  segment: PropertySegment | 'Residential Communities';
  subtitle: string;
  description: string;
  corridors: string;
  deliverables: string[];
}

export interface CorridorProfile {
  corridor: string;
  microMarkets: string;
  primaryAssetClasses: string;
  growthDriver: string;
}

export const CONSULTANT = {
  fullName: 'Radha Kishan Bhavani Prasad',
  shortName: 'Radha Kishan',
  monogram: 'RK',
  role: 'Property Consultant & Real Estate Advisor',
  city: 'Hyderabad',
  country: 'India',
  phoneDisplay: '+91 75698 91812',
  phoneRaw: '+917569891812',
  whatsappDigits: '917569891812',
  operatingHours: 'Mon – Sun · 9:30 AM to 8:00 PM IST',
  headline: 'Radha Kishan Bhavani Prasad',
  subheadline:
    'Independent property consultant in Hyderabad advising private families, corporate occupiers, and NRI investors across luxury villas, skyscrapers, apartments, open plots, commercial offices, and global real estate.',
  heroImage: hyderabadSkylineHero,
  heroImageAlt: 'Hyderabad Financial District and HITEC City glass skyscrapers illuminated at twilight',
  logoImage: rkArchitecturalEmblem,
};

export function getWhatsAppHref(customMessage?: string): string {
  const defaultMsg =
    customMessage ||
    `Hello Radha Kishan, I visited your website and would like to discuss real estate opportunities in Hyderabad.`;
  return `https://wa.me/${CONSULTANT.whatsappDigits}?text=${encodeURIComponent(defaultMsg)}`;
}

export function buildVCardString(websiteUrl?: string): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Prasad;Radha Kishan Bhavani;;;`,
    `FN:${CONSULTANT.fullName}`,
    `ORG:Radha Kishan Real Estate Advisory`,
    `TITLE:${CONSULTANT.role}`,
    `TEL;TYPE=CELL,VOICE,WHATSAPP:${CONSULTANT.phoneRaw}`,
    `ADR;TYPE=WORK:;;Hyderabad;Telangana;;India`,
    `NOTE:Real Estate Professional in Hyderabad dealing in Luxury Villas, Skyscrapers, Apartments, Residential Open Plots, Commercial Properties, Office Spaces & Global Real Estate Opportunities.`,
  ];
  if (websiteUrl) {
    lines.push(`URL:${websiteUrl}`);
  }
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export const ADVISORY_METRICS = [
  {
    value: '06',
    label: 'Real Estate Segments',
    detail: 'Villas, skyscrapers, plots, offices & global assets',
  },
  {
    value: '18+',
    label: 'Hyderabad Micro-Markets',
    detail: 'Jubilee Hills to Neopolis, Kokapet & ORR corridors',
  },
  {
    value: '100%',
    label: 'Title & Approval Screening',
    detail: 'HMDA, DTCP & TS-RERA compliance checks',
  },
  {
    value: 'Direct',
    label: 'Local & NRI Advisory',
    detail: 'Site inspections, negotiations & cross-border desk',
  },
];

export const ADVISORY_SERVICES: AdvisoryService[] = [
  {
    index: '01',
    title: 'Luxury Villas & Independent Estates',
    segment: 'Luxury Villas',
    subtitle: 'Bespoke gated villas and standalone residences in Hyderabad’s premier enclaves.',
    description:
      'Private sourcing of triplex villas, courtyard residences, and boutique gated villa communities across Jubilee Hills, Banjara Hills, Kokapet, Gandipet, and Mokila.',
    corridors: 'Jubilee Hills · Banjara Hills · Gandipet · Mokila',
    deliverables: [
      'Off-market & developer-direct luxury villa mandates',
      'Plot orientation, Vaastu & clubhouse evaluation',
      'Private accompanied site walkthroughs and price benchmarking',
    ],
  },
  {
    index: '02',
    title: 'Skyscrapers & High-Rise Apartments',
    segment: 'Skyscrapers & Apartments',
    subtitle: 'Landmark vertical residences and sky-villas in West Hyderabad’s skyline.',
    description:
      'End-to-end selection across 35-to-60 storey ultra-luxury skyscrapers and gated high-rise apartments in Neopolis, Financial District, Gachibowli, and Kondapur.',
    corridors: 'Neopolis · Financial District · Gachibowli · Hi-Tech City',
    deliverables: [
      'Floor-rise, skyline view & carpet-area efficiency comparison',
      'Builder track record & TS-RERA milestone audit',
      'Pre-launch allocation access and structured payment advisory',
    ],
  },
  {
    index: '03',
    title: 'Open Plots & Plotted Communities',
    segment: 'Open Plots',
    subtitle: 'Clear-title HMDA and DTCP approved residential land banks along high-growth corridors.',
    description:
      'High-appreciation open plots and gated residential layouts strategically located along the Outer Ring Road (ORR), Regional Ring Road (RRR), Shankarpally, and Shamshabad corridors.',
    corridors: 'Shamshabad · Shankarpally · Maheshwaram · Shadnagar',
    deliverables: [
      'HMDA / DTCP layout verification and link-document checks',
      'Infrastructure proximity mapping (ORR exits, Metro & Airport)',
      'Long-term capital appreciation and resale liquidity guidance',
    ],
  },
  {
    index: '04',
    title: 'Commercial Spaces & Grade-A Offices',
    segment: 'Commercial & Office',
    subtitle: 'Corporate office floors, high-street retail, and pre-leased yield assets.',
    description:
      'Acquisition and leasing advisory for IT/ITES office spaces, warm-shell corporate floors, showroom frontages, and pre-leased commercial assets in Hyderabad’s business hubs.',
    corridors: 'HITEC City · Madhapur · Raidurg · Financial District',
    deliverables: [
      'Rental yield modeling, lock-in period & tenant covenant review',
      'Grade-A commercial tower leasing & strata-sale transactions',
      'High-street retail visibility and footfall corridor assessment',
    ],
  },
  {
    index: '05',
    title: 'Residential Homes & Family Upgrades',
    segment: 'Residential Communities',
    subtitle: 'Ready-to-move and under-construction homes tailored to family lifestyle needs.',
    description:
      'Dedicated advisory for end-user homebuyers seeking well-connected 2, 3, and 4 BHK gated residences near international schools, hospitals, and employment zones.',
    corridors: 'Narsingi · Tellapur · Miyapur · Kompally',
    deliverables: [
      'Shortlisting aligned to commute, school zones & community amenities',
      'Home-loan bank tie-up coordination and closing support',
      'Transparent cost-sheet breakdown with zero hidden charges',
    ],
  },
  {
    index: '06',
    title: 'Global Real Estate Opportunities',
    segment: 'Global Opportunities',
    subtitle: 'Cross-border residential and investment portfolios for Indian and NRI buyers.',
    description:
      'Curated access to high-yield international real estate markets including Dubai waterfront residences, London prime apartments, and NRI-focused Hyderabad repatriation portfolios.',
    corridors: 'Dubai · Abu Dhabi · London · Singapore',
    deliverables: [
      'Developer-direct international launches and Golden Visa-eligible properties',
      'Rental yield & currency-hedged portfolio diversification',
      'Remote video walkthroughs and end-to-end NRI documentation desk',
    ],
  },
];

export const PORTFOLIO_PROPERTIES: PortfolioProperty[] = [
  {
    id: 'jubilee-limestone-villa',
    title: 'The Courtyard Pavilion Villa',
    segment: 'Luxury Villas',
    location: 'Jubilee Hills · Road No. 45 Enclave',
    corridor: 'Central Heritage',
    areaSpec: '6,850 sq.ft. Built-up · 600 sq.yd. Plot',
    configuration: '5 BHK Triplex Villa with Private Lap Pool',
    possession: 'Ready to Move',
    approvalStatus: 'Clear Freehold Title · GHMC Approved',
    priceGuidance: 'On Private Request',
    summary:
      'Architectural limestone-and-teak contemporary villa tucked in a quiet cul-de-sac of Jubilee Hills, featuring double-height living courts, private elevator shaft, and landscaped pool terrace.',
    highlights: [
      'North-East corner orientation with 40 ft approach road',
      'Private temperature-controlled lap pool and sunken outdoor lounge',
      'Dedicated home theatre, staff quarters, and 4-car covered bay',
    ],
    image: luxuryVillaJubilee,
    imageAlt: 'Contemporary luxury villa in Jubilee Hills Hyderabad with courtyard pool at dusk',
    featuredSpan: 'wide',
  },
  {
    id: 'neopolis-sky-residences',
    title: 'Neopolis Crest Sky-Villas',
    segment: 'Skyscrapers & Apartments',
    location: 'Neopolis · Kokapet Financial Corridor',
    corridor: 'West Hyderabad',
    areaSpec: '4,280 – 5,900 sq.ft.',
    configuration: '4 BHK & Duplex Sky Residences · 52 Storeys',
    possession: 'Q4 2027 Handover',
    approvalStatus: 'HMDA & TS-RERA Registered',
    priceGuidance: '₹4.90 Cr onwards',
    summary:
      'Ultra-low-density skyscraper living with two residences per floor, panoramic views of Osman Sagar lake and the West Hyderabad skyline, and a 55,000 sq.ft. sky clubhouse.',
    highlights: [
      '270-degree uninterrupted lake and Financial District skyline views',
      'Private elevator foyer opening directly into Italian travertine lounge',
      '2 minutes from Outer Ring Road Exit 1 and Kokapet SEZ',
    ],
    image: skyscraperApartmentsNeopolis,
    imageAlt: '40th-floor luxury skyscraper apartment interior overlooking twilight Hyderabad skyline and lake',
    featuredSpan: 'standard',
  },
  {
    id: 'financial-district-grade-a',
    title: 'Apex Meridian Grade-A Commercial',
    segment: 'Commercial & Office',
    location: 'Financial District · Nanakramguda',
    corridor: 'West Hyderabad',
    areaSpec: '5,500 – 48,000 sq.ft. Floor Plates',
    configuration: 'Warm-Shell Office Suites & Pre-Leased Units',
    possession: 'Operational & Leasing Active',
    approvalStatus: 'LEED Platinum Pre-Certified · OC Received',
    priceGuidance: '7.8% – 8.5% Est. Gross Yield',
    summary:
      'Institutional-grade commercial office tower with grand travertine colonnade arrival plaza, high-efficiency 82% floor plates, and marquee multinational tenant mix.',
    highlights: [
      'Direct access to HITEC City, Raidurg Metro, and ORR corridor',
      'Ideal for corporate headquarters or pre-leased rental yield portfolios',
      '100% power backup, high-speed destination elevators, and multilevel parking',
    ],
    image: commercialOfficeHitec,
    imageAlt: 'Modern Grade-A commercial glass office tower and colonnade plaza in Hyderabad Financial District',
    featuredSpan: 'standard',
  },
  {
    id: 'orr-plotted-estate',
    title: 'Veranda Greens Plotted Estate',
    segment: 'Open Plots',
    location: 'Shamshabad – Tukkuguda ORR Corridor',
    corridor: 'South Corridor',
    areaSpec: '267 – 600 sq.yd. Clear-Title Plots',
    configuration: 'Gated Residential Plotted Community · 42 Acres',
    possession: 'Immediate Registration',
    approvalStatus: 'HMDA Final Layout & TS-RERA Approved',
    priceGuidance: '₹92 Lakhs onwards',
    summary:
      'Master-planned open-plot residential community featuring 60 ft palm-lined blacktop avenues, underground cabling, landscaped central lakefront park, and compound security.',
    highlights: [
      '12 minutes from Rajiv Gandhi International Airport & ORR Exit 14',
      '100% Vaastu-compliant demarcated plots with clear link documents',
      'Clubhouse, avenue plantation, and overhead water infrastructure complete',
    ],
    image: plottedEstateCorridor,
    imageAlt: 'Aerial sunset view of master-planned gated open plots residential estate in Hyderabad corridor',
    featuredSpan: 'standard',
  },
  {
    id: 'dubai-marina-waterfront',
    title: 'Harbourfront Sovereign Residences',
    segment: 'Global Opportunities',
    location: 'Dubai Marina & Creek Harbour · UAE',
    corridor: 'International',
    areaSpec: '1,450 – 3,600 sq.ft.',
    configuration: '2, 3 & 4 BHK Waterfront Branded Apartments',
    possession: '2027 – 2028 Payment Plan',
    approvalStatus: 'DLD Escrow Protected · Golden Visa Eligible',
    priceGuidance: 'AED 2.2M onwards',
    summary:
      'Tax-free dollar-pegged waterfront residences crafted for Hyderabad and NRI investors seeking global lifestyle assets, strong holiday/long-term rental yields, and UAE residency eligibility.',
    highlights: [
      'Direct marina promenade frontage with private yacht berth access',
      'Flexible 60/40 construction-linked developer payment schedule',
      'Dedicated Hyderabad-to-Dubai consultation and remote booking desk',
    ],
    image: globalRealEstateDubai,
    imageAlt: 'Luxury waterfront skyscraper residential towers overlooking calm marina at sunset',
    featuredSpan: 'standard',
  },
  {
    id: 'mokila-gated-villas',
    title: 'Deccan Grove Boutique Villas',
    segment: 'Luxury Villas',
    location: 'Mokila · Shankarpally Growth Belt',
    corridor: 'West Hyderabad',
    areaSpec: '4,100 sq.ft. Built-up · 330 sq.yd. Plot',
    configuration: '4 BHK Contemporary Gated Villas',
    possession: 'Q2 2026 Handover',
    approvalStatus: 'HMDA & TS-RERA Approved',
    priceGuidance: '₹4.40 Cr onwards',
    summary:
      'Low-density green-belt villa enclave just 18 minutes from Neopolis and Financial District, blending quiet suburban greenery with fast access to international schools.',
    highlights: [
      'Only 68 private villas across 9.5 landscaped acres',
      'Double-height family courtyard and home-office suite on ground level',
      'Close to Indus International School and Kollur ORR Exit',
    ],
    image: luxuryVillaJubilee,
    imageAlt: 'Boutique gated villa community architecture at twilight in West Hyderabad',
    featuredSpan: 'standard',
  },
  {
    id: 'gachibowli-highrise',
    title: 'Horizon One Executive Residences',
    segment: 'Skyscrapers & Apartments',
    location: 'Gachibowli · IT & Financial Hub',
    corridor: 'West Hyderabad',
    areaSpec: '2,650 – 3,820 sq.ft.',
    configuration: '3 & 4 BHK Corner High-Rise Apartments',
    possession: 'Ready to Move',
    approvalStatus: 'OC Received · TS-RERA Certified',
    priceGuidance: '₹2.85 Cr onwards',
    summary:
      'Move-in ready luxury corner apartments designed for senior technology executives and NRI families wanting walk-to-work convenience in Gachibowli and HITEC City.',
    highlights: [
      'Zero shared walls with expansive wrap-around sit-out decks',
      '5 minutes from major Fortune 500 campuses and Continental Hospital',
      'Strong corporate rental demand and resale liquidity',
    ],
    image: skyscraperApartmentsNeopolis,
    imageAlt: 'High-rise corner apartment living room with panoramic city views in Gachibowli',
    featuredSpan: 'standard',
  },
  {
    id: 'madhapur-retail-office',
    title: 'HITEC Avenue High-Street & Office',
    segment: 'Commercial & Office',
    location: 'Madhapur – Raidurg Main Spine',
    corridor: 'West Hyderabad',
    areaSpec: '2,200 – 14,500 sq.ft.',
    configuration: 'High-Street Showroom & Corporate Office Suites',
    possession: 'Ready for Fit-Out',
    approvalStatus: 'GHMC Commercial Approved · Clear Title',
    priceGuidance: 'Sale & Long-Term Lease',
    summary:
      'High-visibility corner commercial frontage along the Madhapur–Raidurg corridor with direct metro connectivity, ideal for flagship showrooms, clinics, or boutique offices.',
    highlights: [
      '120 ft main road frontage with heavy daily corporate footfall',
      '300 meters from Raidurg Metro terminal station',
      'Flexible strata acquisition or turnkey corporate lease structures',
    ],
    image: commercialOfficeHitec,
    imageAlt: 'Commercial high-street and corporate office tower along Madhapur Raidurg corridor',
    featuredSpan: 'standard',
  },
];

export const HYDERABAD_CORRIDORS: CorridorProfile[] = [
  {
    corridor: 'West Financial & Tech Belt',
    microMarkets: 'Neopolis, Kokapet, Financial District, Gachibowli, HITEC City',
    primaryAssetClasses: 'Skyscrapers, Grade-A Offices, Luxury Apartments',
    growthDriver: 'Global GCC expansions, Neopolis auctions & ORR connectivity',
  },
  {
    corridor: 'Central Heritage Enclaves',
    microMarkets: 'Jubilee Hills, Banjara Hills, Film Nagar, Somajiguda',
    primaryAssetClasses: 'Bespoke Luxury Villas, Boutique Residences, Flagship Retail',
    growthDriver: 'Scarcity value, prime social infrastructure & legacy prestige',
  },
  {
    corridor: 'West Green-Belt Villa Corridor',
    microMarkets: 'Mokila, Tellapur, Kollur, Shankarpally, Gandipet',
    primaryAssetClasses: 'Gated Luxury Villas, Open Residential Plots, Family Communities',
    growthDriver: 'Low-density living, top international schools & radial roads',
  },
  {
    corridor: 'South Airport & Future City Belt',
    microMarkets: 'Shamshabad, Tukkuguda, Maheshwaram, Shadnagar',
    primaryAssetClasses: 'HMDA/DTCP Open Plots, Plotted Estates, Logistics & Commercial',
    growthDriver: 'International Airport expansion, Pharma/Future City & RRR',
  },
];

export const ADVISORY_PROCESS = [
  {
    step: '01',
    title: 'Requirement & Capital Brief',
    description:
      'Align on lifestyle objectives, target micro-markets, yield or appreciation horizon, and budget structure in a confidential 1-on-1 call.',
  },
  {
    step: '02',
    title: 'Curated Shortlist & Accompanied Tours',
    description:
      'Compare 3–5 pre-screened properties across developers and resale mandates with objective pros, cons, and physical or live-video walkthroughs.',
  },
  {
    step: '03',
    title: 'Legal, RERA & Valuation Due Diligence',
    description:
      'Verify HMDA/DTCP approvals, TS-RERA status, link documents, and real recent transaction comps before committing capital.',
  },
  {
    step: '04',
    title: 'Negotiation, Registration & Post-Closure',
    description:
      'Negotiate optimal developer or seller terms, coordinate banking and registration, and support leasing or portfolio management after handover.',
  },
];
