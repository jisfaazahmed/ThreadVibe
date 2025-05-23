
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

type CustomerWithAuth = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  updated_at: string;
};

const AdminUsers = () => {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async (): Promise<CustomerWithAuth[]> => {
      // First get customers
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (customersError) {
        console.error("Error fetching customers:", customersError);
        throw customersError;
      }

      // Then fetch authentication info for each customer
      const customersWithAuth = await Promise.all(
        customers.map(async (customer) => {
          // Get auth user data for email
          const { data: authData, error: authError } = await supabase.auth.admin.getUserById(
            customer.id
          );

          // If error or no data, use placeholder
          const email = authError || !authData ? "unknown@example.com" : authData.user.email;

          return {
            ...customer,
            email: email || "unknown@example.com",
          };
        })
      );

      return customersWithAuth;
    },
  });

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("customers")
        .update({ is_admin: !currentStatus })
        .eq("id", userId);

      if (error) throw error;

      toast.success(`User admin status updated successfully`);
      refetch();
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update user admin status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          Manage user accounts and admin privileges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-center py-3 px-4">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      {user.first_name || ""} {user.last_name || ""}
                    </td>
                    <td className="py-4 px-4">{user.email || "N/A"}</td>
                    <td className="py-4 px-4">
                      {user.created_at
                        ? format(new Date(user.created_at), "MMM d, yyyy")
                        : "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      {user.city && user.country
                        ? `${user.city}, ${user.country}`
                        : "N/A"}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={user.is_admin || false}
                          onCheckedChange={() =>
                            toggleAdminStatus(user.id, user.is_admin)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
