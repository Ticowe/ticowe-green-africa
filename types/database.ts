export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          country: string | null;
          role: "admin" | "user";
          created_at: string;
          last_seen: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          country?: string | null;
          role?: "admin" | "user";
          created_at?: string;
          last_seen?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };

      volunteers: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          country: string;
          skills: string | null;
          motivation: string | null;
          duration: string | null;
          status: "pending" | "approved" | "rejected" | "active";
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          country: string;
          skills?: string | null;
          motivation?: string | null;
          duration?: string | null;
          status?: "pending" | "approved" | "rejected" | "active";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["volunteers"]["Insert"]>;
      };

      messages: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          status: "unread" | "read" | "replied";
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          status?: "unread" | "read" | "replied";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };

      news: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          status: "draft" | "published";
          author_id: string | null;
          cover_image: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          status?: "draft" | "published";
          author_id?: string | null;
          cover_image?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["news"]["Insert"]>;
      };

      donations: {
        Row: {
          id: string;
          donor_name: string | null;
          donor_email: string | null;
          amount: number;
          currency: string;
          frequency: "once" | "monthly" | "annually";
          payment_method: string | null;
          status: "pending" | "completed" | "failed";
          created_at: string;
        };
        Insert: {
          id?: string;
          donor_name?: string | null;
          donor_email?: string | null;
          amount: number;
          currency?: string;
          frequency?: "once" | "monthly" | "annually";
          payment_method?: string | null;
          status?: "pending" | "completed" | "failed";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["donations"]["Insert"]>;
      };
    };
  };
}

// Convenience row types
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type VolunteerRow = Database["public"]["Tables"]["volunteers"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];
export type NewsRow = Database["public"]["Tables"]["news"]["Row"];
export type DonationRow = Database["public"]["Tables"]["donations"]["Row"];
