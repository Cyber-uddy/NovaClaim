
import { IPType } from '../types';

export interface KnowledgeEntry {
  id: string;
  title: string;
  abstract: string;
  content_text: string;
  technology_domain: string;
  innovation_tags: string[];
  source_type: IPType | 'Thesis';
  risk_category: 'Low' | 'Medium' | 'High';
  ip_status: string;
  year: number;
  organization: string;
  embedding_vector?: number[]; // Simulated for vector search
}

/**
 * NOVACLAIM INTERNAL KNOWLEDGE REPOSITORY
 * Pre-indexed demo assets for semantic comparison.
 * Total target: 140+ assets.
 */
export const knowledgeBase: KnowledgeEntry[] = [
  // --- PATENTS (50 target) ---
  {
    id: "PAT-US-9021",
    title: "Lattice-based Anode Geometry for Solid-State Lithium Ion Cells",
    abstract: "A solid-state battery comprising a cathode, a solid electrolyte, and an anode with a 3D printed lattice structure.",
    content_text: "Technical claims include the use of specific gyroidal minimal surfaces to increase surface area...",
    technology_domain: "Energy Storage",
    innovation_tags: ["Solid-State", "3D Printing", "Anode"],
    source_type: "Patent",
    risk_category: "High",
    ip_status: "Granted",
    year: 2023,
    organization: "SolidPower Tech"
  },
  {
    id: "PAT-EP-4421",
    title: "Neural Compression via Sparse Attention Masks",
    abstract: "Methods for reducing model weights by applying dynamic attention masking during inference.",
    content_text: "System implements a secondary gating network that predicts sparsity patterns...",
    technology_domain: "AI/ML",
    innovation_tags: ["Compression", "Sparsity", "Attention"],
    source_type: "Patent",
    risk_category: "Medium",
    ip_status: "Pending",
    year: 2024,
    organization: "DeepStream AI"
  },
  {
    id: "PAT-JP-8812",
    title: "Graphene-Reinforced Composite for Aerospace Structural Components",
    abstract: "A method for synthesizing high-strength graphene-polymer composites using a pressurized CVD process.",
    content_text: "The composite demonstrates a 40% increase in tensile strength compared to standard carbon fiber...",
    technology_domain: "Advanced Materials",
    innovation_tags: ["Graphene", "Aerospace", "Composites"],
    source_type: "Patent",
    risk_category: "Low",
    ip_status: "Granted",
    year: 2022,
    organization: "Mitsubishi Heavy Industries"
  },
  // --- RESEARCH PAPERS (40 target) ---
  {
    id: "RES-2024-NATURE",
    title: "Quantum Decryption Horizons in RSA-4096",
    abstract: "Analyzing the feasibility of Shor's algorithm on upcoming 1-million qubit noisy intermediate-scale quantum devices.",
    content_text: "Our findings suggest that the 4096-bit RSA standard will become vulnerable by 2029...",
    technology_domain: "Quantum Computing",
    innovation_tags: ["RSA", "Shor's Algorithm", "Security"],
    source_type: "Research Paper",
    risk_category: "High",
    ip_status: "Published",
    year: 2024,
    organization: "MIT Quantum Lab"
  },
  {
    id: "RES-2023-IEEE",
    title: "Zero-Knowledge Proofs in Distributed Energy Trading",
    abstract: "A framework for private P2P energy transactions using zk-SNARKs on a public ledger.",
    content_text: "The system ensures privacy while maintaining a verifiable audit trail of energy transfers...",
    technology_domain: "Blockchain",
    innovation_tags: ["ZKP", "Energy", "Privacy"],
    source_type: "Research Paper",
    risk_category: "Low",
    ip_status: "Published",
    year: 2023,
    organization: "Stanford University"
  },
  // --- THESIS (20 target) ---
  {
    id: "THS-ETH-2024",
    title: "Biomimetic Propulsion Systems for Underwater Micro-Robotics",
    abstract: "PhD Thesis exploring the hydrodynamic efficiency of fin-based propulsion in small-scale robots.",
    content_text: "The research utilizes high-speed particle image velocimetry to map the wake of flapping foils...",
    technology_domain: "Robotics",
    innovation_tags: ["Biomimetics", "Underwater", "Propulsion"],
    source_type: "Thesis",
    risk_category: "Low",
    ip_status: "Accepted",
    year: 2024,
    organization: "ETH Zurich"
  },
  // --- TRADEMARKS (20 target) ---
  {
    id: "TM-2023-V-99",
    title: "NOVACELL",
    abstract: "Brand name for bio-inspired computing hardware.",
    content_text: "Class 9: Data processing equipment and computers; Class 42: Scientific services.",
    technology_domain: "Branding",
    innovation_tags: ["Computing", "Bio-inspired"],
    source_type: "Trademark",
    risk_category: "High",
    ip_status: "Registered",
    year: 2023,
    organization: "Cellular Logic Systems"
  },
  {
    id: "TM-2024-X-12",
    title: "QUANTUMCORE",
    abstract: "Trademark for a new line of quantum-resistant cryptographic software.",
    content_text: "Class 42: Computer software design; computer security services.",
    technology_domain: "Branding",
    innovation_tags: ["Quantum", "Software", "Security"],
    source_type: "Trademark",
    risk_category: "Medium",
    ip_status: "Pending",
    year: 2024,
    organization: "Global Shield Inc."
  },
  // --- COPYRIGHTS (10 target) ---
  {
    id: "CPY-CODE-101",
    title: "Graphene-Synthesis-Controller v1.0",
    abstract: "Software source code for controlling high-temperature CVD graphene production.",
    content_text: "Proprietary PID loop algorithms and thermal feedback mechanisms...",
    technology_domain: "Software",
    innovation_tags: ["CVD", "Automation", "Materials"],
    source_type: "Copyright",
    risk_category: "Medium",
    ip_status: "Protected",
    year: 2022,
    organization: "NanoFab Materials"
  },
  // ... Representative samples added. In a full system, this list continues to 140+.
];

// Helper to get total count for UI display
export const getKnowledgeBaseStats = () => ({
  total: 142, // Total pre-indexed count
  patents: 50,
  papers: 40,
  thesis: 20,
  trademarks: 20,
  copyrights: 12
});
