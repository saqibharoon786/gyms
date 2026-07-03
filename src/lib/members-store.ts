// Local data store for members, fees and admission inquiries.
// Uses localStorage so everything works without a backend.

export type Member = {
  id: string;            // e.g. TR-2026-0001
  name: string;
  email: string;
  phone: string;
  age: number;
  program: string;
  goal: string;
  joinDate: string;      // ISO
  registrationFee: number;
  registrationPaid: boolean;
  monthlyFee: number;
  height?: string;
  weight?: string;
  address?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  medicalIssues?: string;
};

export type MonthlyPayment = {
  memberId: string;
  month: string;         // "2026-06"
  amount: number;
  status: "Pending" | "Paid";
  paidDate?: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  program: string;
  message: string;
  createdAt: string;
};

const MEMBERS_KEY = "tr_members_v1";
const PAYMENTS_KEY = "tr_payments_v1";
const INQUIRIES_KEY = "tr_inquiries_v1";
const SEQ_KEY = "tr_member_seq_v1";

const read = <T,>(k: string, fallback: T): T => {
  try { const r = localStorage.getItem(k); return r ? JSON.parse(r) as T : fallback; } catch { return fallback; }
};
const write = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v));
const emit = () => window.dispatchEvent(new Event("tr-store-changed"));

export const generateMemberId = (): string => {
  const year = new Date().getFullYear();
  const seqRaw = read<{ year: number; n: number }>(SEQ_KEY, { year, n: 0 });
  const next = seqRaw.year === year ? seqRaw.n + 1 : 1;
  write(SEQ_KEY, { year, n: next });
  return `TR-${year}-${String(next).padStart(4, "0")}`;
};

export const getMembers = (): Member[] => read<Member[]>(MEMBERS_KEY, []);
export const getMember = (id: string) => getMembers().find((m) => m.id === id);

export const addMember = (m: Omit<Member, "id" | "joinDate"> & { joinDate?: string }): Member => {
  const joinDate = m.joinDate ? new Date(m.joinDate).toISOString() : new Date().toISOString();
  const { joinDate: _ignore, ...rest } = m;
  const newM: Member = { ...rest, id: generateMemberId(), joinDate };
  const all = getMembers();
  all.unshift(newM);
  write(MEMBERS_KEY, all);
  // Seed the first monthly fee for the join month
  const ym = joinDate.slice(0, 7);
  const pays = getPayments();
  pays.push({ memberId: newM.id, month: ym, amount: newM.monthlyFee, status: "Pending" });
  write(PAYMENTS_KEY, pays);
  emit();
  return newM;
};

export const updateMember = (id: string, patch: Partial<Member>) => {
  const all = getMembers().map((m) => (m.id === id ? { ...m, ...patch } : m));
  write(MEMBERS_KEY, all);
  emit();
};

export const getPayments = (): MonthlyPayment[] => read<MonthlyPayment[]>(PAYMENTS_KEY, []);
export const getMemberPayments = (memberId: string) =>
  getPayments().filter((p) => p.memberId === memberId).sort((a, b) => b.month.localeCompare(a.month));

export const markMonthlyPaid = (memberId: string, month: string) => {
  const pays = getPayments().map((p) =>
    p.memberId === memberId && p.month === month
      ? { ...p, status: "Paid" as const, paidDate: new Date().toISOString() }
      : p
  );
  write(PAYMENTS_KEY, pays);
  emit();
};

export const ensureCurrentMonthPayment = (memberId: string) => {
  const ym = new Date().toISOString().slice(0, 7);
  const pays = getPayments();
  const exists = pays.some((p) => p.memberId === memberId && p.month === ym);
  if (!exists) {
    const m = getMember(memberId);
    if (m) {
      pays.push({ memberId, month: ym, amount: m.monthlyFee, status: "Pending" });
      write(PAYMENTS_KEY, pays);
      emit();
    }
  }
};

export const getInquiries = (): Inquiry[] => read<Inquiry[]>(INQUIRIES_KEY, []);
export const addInquiry = (i: Omit<Inquiry, "id" | "createdAt">): Inquiry => {
  const all = getInquiries();
  const created: Inquiry = { ...i, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  all.unshift(created);
  write(INQUIRIES_KEY, all);
  emit();
  return created;
};

// Hook helper for components
import { useEffect, useState } from "react";
export const useStoreVersion = () => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const h = () => setV((x) => x + 1);
    window.addEventListener("tr-store-changed", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("tr-store-changed", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return v;
};

export const INQUIRY_RECIPIENT = "saqibharoonharoon@gmail.com";

export const buildInquiryMailto = (i: Omit<Inquiry, "id" | "createdAt">) => {
  const subject = `New Admission Inquiry - ${i.name} (The Runners Gym)`;
  const body = [
    "New admission inquiry received from The Runners Gym website",
    "",
    `Name:    ${i.name}`,
    `Email:   ${i.email}`,
    `Phone:   ${i.phone}`,
    `Age:     ${i.age}`,
    `Program: ${i.program}`,
    "",
    "Message:",
    i.message || "(no message)",
    "",
    "—",
    "The Runners Gym Admission System",
  ].join("\n");
  return `mailto:${INQUIRY_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
