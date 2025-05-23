
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminOrders from "@/components/admin/AdminOrders";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if current user is an admin
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from("customers")
        .select("is_admin")
        .eq("id", user.id)
        .single();
      
      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }
      
      return data?.is_admin || false;
    },
    enabled: !!user,
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You must be logged in to access this page.",
      });
      navigate("/account");
      return;
    }

    // Redirect if not an admin
    if (!loading && !checkingAdmin && isAdmin === false) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard.",
      });
      navigate("/");
    }
  }, [user, loading, isAdmin, checkingAdmin, navigate]);

  if (loading || checkingAdmin) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect due to useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
