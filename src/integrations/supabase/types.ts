export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          publish_date: string | null
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          publish_date?: string | null
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          publish_date?: string | null
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          phone: string | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          payment_method: string | null
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_postal_code: string
          shipping_state: string
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_method?: string | null
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_postal_code: string
          shipping_state: string
          status?: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_method?: string | null
          shipping_address?: string
          shipping_city?: string
          shipping_country?: string
          shipping_postal_code?: string
          shipping_state?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          product_id: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          product_id?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          product_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          color: string
          color_hex: string | null
          created_at: string | null
          id: string
          product_id: string | null
          size: string
          stock: number
          updated_at: string | null
        }
        Insert: {
          color: string
          color_hex?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          size: string
          stock?: number
          updated_at?: string | null
        }
        Update: {
          color?: string
          color_hex?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          size?: string
          stock?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          name: string
          price: number
          stock: number
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          name: string
          price: number
          stock?: number
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          price?: number
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          product_id: string | null
          rating: number
          title: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          rating: number
          title?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          rating?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
