"use client";

import {
  CheckCircle2,
  Clock3,
  Copy,
  Mail,
  Phone,
  ReceiptText,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase/client";

type MembershipStatus = "pending" | "approved" | "rejected";

type Membership = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  receipt_number: string;
  status: MembershipStatus;
  created_at: string;
  updated_at?: string | null;
};

type StatusFilter = "all" | MembershipStatus;

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");
  const [error, setError] = useState("");

  async function loadMembers() {
    try {
      setLoading(true);
      setError("");

      const { data, error: membersError } = await supabase
        .from("memberships")
        .select(`
          id,
          full_name,
          email,
          phone,
          receipt_number,
          status,
          created_at,
          updated_at
        `)
        .order("created_at", {
          ascending: false,
        });

      if (membersError) {
        throw new Error(membersError.message);
      }

      setMembers((data ?? []) as Membership[]);
    } catch (err) {
      console.error("Failed to load members:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load membership applications.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMembers();
  }, []);

  async function updateMemberStatus(
    member: Membership,
    status: MembershipStatus,
  ) {
    const statusAction =
      status === "approved"
        ? "approve"
        : status === "rejected"
          ? "reject"
          : "mark as pending";

    const confirmed = window.confirm(
      `Are you sure you want to ${statusAction} ${member.full_name}'s membership application?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(member.id);
      setError("");

      const { data, error: updateError } = await (supabase as any)
  .from("memberships")
  .update({
    status,
    updated_at: new Date().toISOString(),
  })
  .eq("id", member.id)
  .select(`
    id,
    full_name,
    email,
    phone,
    receipt_number,
    status,
    created_at,
    updated_at
  `)
  .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      setMembers((currentMembers) =>
        currentMembers.map((currentMember) =>
          currentMember.id === member.id
            ? (data as Membership)
            : currentMember,
        ),
      );
    } catch (err) {
      console.error("Failed to update member:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update the membership application.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteMember(member: Membership) {
    const confirmed = window.confirm(
      `Delete ${member.full_name}'s membership application permanently? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(member.id);
      setError("");

      const { error: deleteError } = await supabase
        .from("memberships")
        .delete()
        .eq("id", member.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setMembers((currentMembers) =>
        currentMembers.filter(
          (currentMember) => currentMember.id !== member.id,
        ),
      );
    } catch (err) {
      console.error("Failed to delete member:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete the membership application.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function copyReceipt(receiptNumber: string) {
    try {
      await navigator.clipboard.writeText(receiptNumber);
    } catch (err) {
      console.error("Failed to copy receipt number:", err);
    }
  }

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return members.filter((member) => {
      const matchesStatus =
        statusFilter === "all" ||
        member.status === statusFilter;

      const matchesSearch =
        query === "" ||
        member.full_name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.receipt_number
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [members, searchQuery, statusFilter]);

  const statistics = useMemo(() => {
    return {
      total: members.length,
      pending: members.filter(
        (member) => member.status === "pending",
      ).length,
      approved: members.filter(
        (member) => member.status === "approved",
      ).length,
      rejected: members.filter(
        (member) => member.status === "rejected",
      ).length,
    };
  }, [members]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
              Membership Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#1A2A22] md:text-4xl">
              Members
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#68736C]">
              Review membership applications, verify M-Pesa
              receipts, approve applicants, reject applications,
              and manage existing records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadMembers()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0F4C4C]/20 bg-white px-5 py-3 text-sm font-bold text-[#0F4C4C] shadow-sm transition hover:bg-[#0F4C4C]/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticCard
            title="Total Applications"
            value={statistics.total}
            icon={<Users size={22} />}
            iconClassName="bg-[#0F4C4C]/10 text-[#0F4C4C]"
          />

          <StatisticCard
            title="Pending"
            value={statistics.pending}
            icon={<Clock3 size={22} />}
            iconClassName="bg-amber-100 text-amber-700"
          />

          <StatisticCard
            title="Approved"
            value={statistics.approved}
            icon={<CheckCircle2 size={22} />}
            iconClassName="bg-green-100 text-green-700"
          />

          <StatisticCard
            title="Rejected"
            value={statistics.rejected}
            icon={<XCircle size={22} />}
            iconClassName="bg-red-100 text-red-700"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-black"
            >
              ×
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879087]"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search name, email, phone or receipt..."
              className="w-full rounded-xl border border-[#E0D8C8] bg-[#F8F5EE] py-3 pl-11 pr-4 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "All",
                value: "all",
              },
              {
                label: "Pending",
                value: "pending",
              },
              {
                label: "Approved",
                value: "approved",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    filter.value as StatusFilter,
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  statusFilter === filter.value
                    ? "bg-[#0F4C4C] text-white"
                    : "bg-[#F5F1E6] text-[#48534B] hover:bg-[#0F4C4C]/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="text-center">
              <RefreshCw
                size={34}
                className="mx-auto animate-spin text-[#0F4C4C]"
              />

              <p className="mt-4 text-sm font-semibold text-[#68736C]">
                Loading membership applications...
              </p>
            </div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="rounded-3xl bg-white px-8 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F4C4C]/10 text-[#0F4C4C]">
              <Users size={35} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#1A2A22]">
              No members found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68736C]">
              There are no membership applications matching the
              current search and status filter.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-3xl bg-white shadow-sm lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-[#0F4C4C] text-left text-xs uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-6 py-4">
                        Applicant
                      </th>

                      <th className="px-6 py-4">
                        Contact
                      </th>

                      <th className="px-6 py-4">
                        M-Pesa Receipt
                      </th>

                      <th className="px-6 py-4">
                        Applied
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#EEE8DD]">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="transition hover:bg-[#F8F5EE]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C4C]/10 font-black text-[#0F4C4C]">
                              {member.full_name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-bold text-[#1A2A22]">
                                {member.full_name}
                              </p>

                              <p className="mt-1 text-xs text-[#879087]">
                                Member application
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-2 text-sm text-[#536057] hover:text-[#0F4C4C]"
                            >
                              <Mail size={14} />
                              {member.email}
                            </a>

                            <a
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-2 text-sm text-[#536057] hover:text-[#0F4C4C]"
                            >
                              <Phone size={14} />
                              {member.phone}
                            </a>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              void copyReceipt(
                                member.receipt_number,
                              )
                            }
                            title="Copy receipt number"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#F5F1E6] px-3 py-2 font-mono text-sm font-black uppercase text-[#C65D3A] transition hover:bg-[#EEE5D5]"
                          >
                            <ReceiptText size={15} />
                            {member.receipt_number}
                            <Copy size={13} />
                          </button>
                        </td>

                        <td className="px-6 py-5 text-sm text-[#536057]">
                          <p className="font-semibold">
                            {formatDate(member.created_at)}
                          </p>

                          <p className="mt-1 text-xs text-[#879087]">
                            {formatTime(member.created_at)}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <StatusBadge
                            status={member.status}
                          />
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            {member.status !==
                              "approved" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId === member.id
                                }
                                onClick={() =>
                                  void updateMemberStatus(
                                    member,
                                    "approved",
                                  )
                                }
                                title="Approve member"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                              >
                                <CheckCircle2 size={17} />
                              </button>
                            )}

                            {member.status !==
                              "rejected" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId === member.id
                                }
                                onClick={() =>
                                  void updateMemberStatus(
                                    member,
                                    "rejected",
                                  )
                                }
                                title="Reject application"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                              >
                                <XCircle size={17} />
                              </button>
                            )}

                            {member.status !== "pending" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId === member.id
                                }
                                onClick={() =>
                                  void updateMemberStatus(
                                    member,
                                    "pending",
                                  )
                                }
                                title="Return to pending"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
                              >
                                <Clock3 size={17} />
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={
                                deletingId === member.id
                              }
                              onClick={() =>
                                void deleteMember(member)
                              }
                              title="Delete application"
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              {deletingId === member.id ? (
                                <RefreshCw
                                  size={17}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
              {filteredMembers.map((member) => (
                <article
                  key={member.id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F4C4C]/10 text-[#0F4C4C]">
                        <UserRound size={22} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-black text-[#1A2A22]">
                          {member.full_name}
                        </h2>

                        <p className="mt-1 text-xs text-[#879087]">
                          {formatDate(member.created_at)}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={member.status} />
                  </div>

                  <div className="mt-5 space-y-3 border-y border-[#EEE8DD] py-5">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-sm text-[#536057]"
                    >
                      <Mail
                        size={16}
                        className="text-[#0F4C4C]"
                      />

                      <span className="truncate">
                        {member.email}
                      </span>
                    </a>

                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-sm text-[#536057]"
                    >
                      <Phone
                        size={16}
                        className="text-[#0F4C4C]"
                      />

                      {member.phone}
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        void copyReceipt(
                          member.receipt_number,
                        )
                      }
                      className="flex w-full items-center gap-3 text-left text-sm"
                    >
                      <ReceiptText
                        size={16}
                        className="text-[#0F4C4C]"
                      />

                      <span className="font-mono font-black uppercase text-[#C65D3A]">
                        {member.receipt_number}
                      </span>

                      <Copy
                        size={13}
                        className="ml-auto text-[#879087]"
                      />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {member.status !== "approved" && (
                      <button
                        type="button"
                        disabled={updatingId === member.id}
                        onClick={() =>
                          void updateMemberStatus(
                            member,
                            "approved",
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-50 px-3 py-3 text-xs font-bold text-green-700 disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                        Approve
                      </button>
                    )}

                    {member.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={updatingId === member.id}
                        onClick={() =>
                          void updateMemberStatus(
                            member,
                            "rejected",
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-3 py-3 text-xs font-bold text-amber-700 disabled:opacity-50"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    )}

                    {member.status !== "pending" && (
                      <button
                        type="button"
                        disabled={updatingId === member.id}
                        onClick={() =>
                          void updateMemberStatus(
                            member,
                            "pending",
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-3 text-xs font-bold text-blue-700 disabled:opacity-50"
                      >
                        <Clock3 size={15} />
                        Pending
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={deletingId === member.id}
                      onClick={() =>
                        void deleteMember(member)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-xs font-bold text-red-600 disabled:opacity-50"
                    >
                      {deletingId === member.id ? (
                        <RefreshCw
                          size={15}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={15} />
                      )}

                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatisticCard({
  title,
  value,
  icon,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#879087]">
            {title}
          </p>

          <p className="mt-3 text-4xl font-black text-[#1A2A22]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: MembershipStatus;
}) {
  const styles: Record<MembershipStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-700",
  };

  const icons: Record<
    MembershipStatus,
    React.ReactNode
  > = {
    pending: <Clock3 size={12} />,
    approved: <CheckCircle2 size={12} />,
    rejected: <XCircle size={12} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}