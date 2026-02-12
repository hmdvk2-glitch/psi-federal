
export enum LifecycleStage {
  PROSPECT = 'PROSPECT',
  APPLICANT = 'APPLICANT',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  REGULAR = 'REGULAR',
  DORMANT = 'DORMANT',
  CHURNED = 'CHURNED'
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  BUSINESS = 'BUSINESS',
  JOINT = 'JOINT'
}

export enum AccountStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  RESTRICTED = 'RESTRICTED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'
}

export enum TransactionType {
  ACH = 'ACH',
  WIRE = 'WIRE',
  P2P = 'P2P',
  BILL_PAY = 'BILL_PAY',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL'
}

export enum FraudRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ssnMasked: string;
  stage: LifecycleStage;
  riskScore: number;
  pepStatus: boolean;
  onboardingDate: string;
  metadata: {
    avatar: string;
    occupation: string;
    incomeBracket: string;
  };
}

export interface Account {
  id: string;
  customerId: string;
  type: AccountType;
  status: AccountStatus;
  balance: number;
  accountNumber: string;
  routingNumber: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  customerId: string;
  amount: number;
  type: TransactionType;
  description: string;
  timestamp: string;
  status: 'PENDING' | 'COMPLETED' | 'FLAGGED' | 'REJECTED';
  location: string;
  counterparty?: string;
  riskRating: FraudRisk;
}

export interface FraudAlert {
  id: string;
  transactionId: string;
  reason: string;
  severity: FraudRisk;
  timestamp: string;
  isDismissed: boolean;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  loanType: 'AUTO' | 'MORTGAGE' | 'PERSONAL';
  amount: number;
  term: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submissionDate: string;
  analysis?: string;
}

export interface SupportMessage {
  id: string;
  sender: 'MEMBER' | 'AI';
  text: string;
  timestamp: string;
}

export interface AuditReport {
  id: string;
  timestamp: string;
  patternName: string;
  status: 'Approved' | 'Conditional' | 'Failed';
  alignmentScore: number;
  criticalIssues: string[];
  mobileReadiness: string;
  complianceChecklist: { label: string; passed: boolean }[];
  remediationPlan: string;
}

export interface UIPattern {
  id: string;
  name: string;
  category: string;
  version: string;
  status: string;
  lastAudited: string;
}

export interface TrainingPackage {
  patternName: string;
  timestamp: string;
  variants: DesignVariant[];
}

export interface DesignVariant {
  title: string;
  type: 'COMPLIANT' | 'ERROR' | 'INNOVATION';
  patternId: string;
  description: string;
  complianceNotes: string[];
  codeSnippet: string;
  qaChecklist: string[];
  businessImpact: string;
}

export interface IANode {
  label: string;
  path: string;
  children?: IANode[];
}

export interface ComplianceRequirement {
  id: string;
  category: string;
  requirement: string;
  status: 'PASS' | 'FAIL';
  note: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  timeline: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';
  deliverables: string[];
}

export interface Metric {
  label: string;
  value: string;
  target: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
}
