import {
  LifecycleStage,
  Customer,
  Transaction,
  FraudRisk,
  TransactionType,
  AuditReport,
  TrainingPackage,
  LoanApplication,
} from "../types";

const firstNames = ["Jordan", "Taylor", "Avery", "Morgan", "Riley", "Casey", "Quinn", "Alex"];
const lastNames = ["Parker", "Brooks", "Hayes", "Reed", "Foster", "Carter", "Bennett", "Shaw"];
const occupations = ["Operations Analyst", "Nurse", "Electrician", "Teacher", "Project Manager", "Engineer"];
const incomeBrackets = ["$35k-$60k", "$60k-$90k", "$90k-$140k", "$140k+"];
const streets = ["Maple Ave", "Oak Street", "Pine Road", "Cedar Lane", "River Blvd", "Hillcrest Dr"];

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const randomDigits = (count: number): string =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 10).toString()).join("");

export const generateSyntheticCustomer = async (): Promise<Customer> => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const id = `CUS-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const riskScore = Math.floor(Math.random() * 45) + 35;
  const occupation = pick(occupations);
  const incomeBracket = pick(incomeBrackets);

  return {
    id,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@examplemail.com`,
    phone: `(${randomDigits(3)}) ${randomDigits(3)}-${randomDigits(4)}`,
    address: `${Math.floor(Math.random() * 9999) + 1} ${pick(streets)}, San Francisco, CA`,
    ssnMasked: `***-**-${randomDigits(4)}`,
    stage: LifecycleStage.PROSPECT,
    riskScore,
    pepStatus: Math.random() < 0.08,
    onboardingDate: new Date().toISOString(),
    metadata: {
      avatar: `https://i.pravatar.cc/150?u=${id}`,
      occupation,
      incomeBracket,
    },
  };
};

export const analyzeLoanApplication = async (
  application: LoanApplication,
  customer: Customer,
): Promise<{ status: "APPROVED" | "REJECTED"; analysis: string }> => {
  const score =
    customer.riskScore -
    Math.floor(application.amount / 4000) -
    Math.floor(application.term / 24) +
    (application.loanType === "PERSONAL" ? -6 : application.loanType === "AUTO" ? 2 : 4);

  const approved = score >= 28;
  const monthlyEstimate = Math.round((application.amount * 1.05) / application.term);

  return {
    status: approved ? "APPROVED" : "REJECTED",
    analysis: approved
      ? `Simulation decision: approved based on profile risk ${customer.riskScore}/100 and stable requested terms. Estimated monthly payment is $${monthlyEstimate}.`
      : `Simulation decision: declined due to elevated modeled risk against requested amount/term. Suggest reducing amount or selecting a longer term and reapplying.`,
  };
};

export const simulateWhatsAppResponse = async (userMessage: string): Promise<string> => {
  const text = userMessage.toLowerCase();

  if (text.includes("balance")) {
    return "Simulation mode: your available balance is $4,280.42 in Checking and $12,910.00 in Savings.";
  }
  if (text.includes("transfer")) {
    return "Simulation mode: transfer request captured. Please confirm recipient and amount to proceed.";
  }
  if (text.includes("card") || text.includes("freeze")) {
    return "Simulation mode: your card freeze request is queued. A mock confirmation has been sent.";
  }
  if (text.includes("loan")) {
    return "Simulation mode: you can apply from the Loan tab. Typical review time is under 2 minutes in this demo.";
  }

  return "Simulation mode active. I can help with balance checks, transfers, card controls, and loan questions.";
};

export const analyzeTransactionsForFraud = async (
  transactions: Transaction[],
): Promise<{ transactionId: string; reason: string; severity: FraudRisk }[]> => {
  return transactions
    .map((txn) => {
      if (txn.amount > 3500) {
        return {
          transactionId: txn.id,
          reason: "High-value transfer exceeds simulation threshold.",
          severity: FraudRisk.HIGH,
        };
      }
      if (txn.type === TransactionType.WIRE && txn.amount > 1500) {
        return {
          transactionId: txn.id,
          reason: "Wire transfer pattern flagged for manual review.",
          severity: FraudRisk.MEDIUM,
        };
      }
      return null;
    })
    .filter((item): item is { transactionId: string; reason: string; severity: FraudRisk } => item !== null);
};

export const performUXAudit = async (patternDescription: string): Promise<AuditReport> => {
  const normalized = patternDescription.toLowerCase();
  const hasMobile = normalized.includes("mobile");
  const hasA11y = normalized.includes("accessibility") || normalized.includes("wcag") || normalized.includes("ada");
  const hasDisclosure = normalized.includes("disclosure") || normalized.includes("apr");

  const alignmentScore = 62 + (hasMobile ? 12 : 0) + (hasA11y ? 16 : 0) + (hasDisclosure ? 8 : 0);
  const issues: string[] = [];
  if (!hasMobile) issues.push("Missing explicit mobile touch-target and layout behavior.");
  if (!hasA11y) issues.push("No accessibility acceptance criteria were provided.");
  if (!hasDisclosure) issues.push("Financial disclosure language is not clearly defined.");

  const status: AuditReport["status"] =
    alignmentScore >= 90 ? "Approved" : alignmentScore >= 75 ? "Conditional" : "Failed";

  return {
    id: `AUD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    patternName:
      patternDescription.substring(0, 30) + (patternDescription.length > 30 ? "..." : ""),
    status,
    alignmentScore: Math.min(alignmentScore, 99),
    criticalIssues: issues,
    mobileReadiness: hasMobile
      ? "Mobile behavior is clearly described for this simulation."
      : "Mobile behavior is incomplete and needs explicit breakpoints and target sizing.",
    complianceChecklist: [
      { label: "ADA WCAG 2.1 AA", passed: hasA11y },
      { label: "NCUA Disclosure Part 707", passed: hasDisclosure },
      { label: "CCPA Privacy Notice", passed: true },
      { label: "Touch Target 44px", passed: hasMobile },
    ],
    remediationPlan:
      issues.length === 0
        ? "No blocking gaps detected in simulation. Proceed to QA sign-off."
        : `Address priority gaps: ${issues.join(" ")}`,
  };
};

export const generateTrainingVariants = async (patternName: string): Promise<TrainingPackage> => {
  const baseId = `NS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return {
    patternName,
    timestamp: new Date().toISOString(),
    variants: [
      {
        title: "Compliant Reference",
        type: "COMPLIANT",
        patternId: `${baseId}-C`,
        description: `Production-safe version of "${patternName}" with clear labels, keyboard flow, and disclosure placement.`,
        complianceNotes: [
          "Uses semantic landmarks and visible focus states.",
          "Error messaging is persistent and screen-reader friendly.",
          "Disclosure content appears before final submission.",
        ],
        codeSnippet:
          "export const Pattern = () => (<form aria-label=\"Compliant pattern\"><button>Submit</button></form>);",
        qaChecklist: [
          "Keyboard navigation covers all controls.",
          "Contrast ratio passes AA.",
          "Disclosure copy verified with compliance.",
        ],
        businessImpact: "Reduces rework and lowers compliance remediation cost.",
      },
      {
        title: "Anti-Pattern Example",
        type: "ERROR",
        patternId: `${baseId}-E`,
        description: `Intentionally flawed "${patternName}" variant for training and review calibration.`,
        complianceNotes: [
          "Missing field labels and inaccessible icon-only actions.",
          "No disclosure hierarchy near conversion CTA.",
          "Validation is delayed until submit with unclear feedback.",
        ],
        codeSnippet:
          "export const Pattern = () => (<div onClick={() => {}}>Continue</div>); // anti-pattern",
        qaChecklist: [
          "Identify inaccessible controls.",
          "Document required remediation tasks.",
          "Map issue to policy or standard.",
        ],
        businessImpact: "Helps teams recognize and prevent costly UX compliance failures.",
      },
      {
        title: "Innovation Concept",
        type: "INNOVATION",
        patternId: `${baseId}-I`,
        description: `Forward-looking "${patternName}" with adaptive guidance and progressive disclosure.`,
        complianceNotes: [
          "Contextual helper text is announced to assistive tech.",
          "Guidance adapts without changing legal disclosure order.",
          "Design tokens preserve consistency across breakpoints.",
        ],
        codeSnippet:
          "export const Pattern = () => (<section><h2>Adaptive Guidance</h2><button>Review</button></section>);",
        qaChecklist: [
          "Test on mobile portrait and landscape.",
          "Verify ARIA announcements remain concise.",
          "Confirm disclosure sequencing with legal.",
        ],
        businessImpact: "Improves completion rates while preserving regulatory confidence.",
      },
    ],
  };
};

export const generateRandomTransaction = (customerId: string, accountId: string): Transaction => {
  const types = Object.values(TransactionType);
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = Math.floor(Math.random() * 5000) + 1;

  return {
    id: `TXN-${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
    accountId,
    customerId,
    amount,
    type,
    description: `Simulated ${type} transfer`,
    timestamp: new Date().toISOString(),
    status: "COMPLETED",
    location: "San Francisco, CA",
    riskRating: FraudRisk.LOW,
  };
};
