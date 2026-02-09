'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

interface AdminContextType {
  adminId: string | null;
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminId, setAdminId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Verify if user is admin
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', session.user.email!)
            .single();

          if (adminUser && session.user.email) {
            setAdminId(session.user.id);
            setEmail(session.user.email);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const supabase = getSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user && session.user.email) {
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', session.user.email)
          .single();

        if (adminUser) {
          setAdminId(session.user.id);
          setEmail(session.user.email);
        } else {
          setAdminId(null);
          setEmail(null);
        }
      } else {
        setAdminId(null);
        setEmail(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verify admin status
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user && session.user.email) {
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', session.user.email)
          .single();

        if (adminError || !adminUser) {
          await supabase.auth.signOut();
          throw new Error('You do not have admin access');
        }

        setAdminId(session.user.id);
        setEmail(session.user.email);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
      setAdminId(null);
      setEmail(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminId,
        email,
        isLoading,
        isAuthenticated: !!adminId,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
