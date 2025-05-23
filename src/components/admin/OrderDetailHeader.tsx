
import React from "react";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderDetailHeaderProps {
  id: string;
  createdAt: string;
  status: string;
  onPrint: () => void;
}

const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({
  id,
  createdAt,
  status,
  onPrint,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'processing':
        return "bg-blue-100 text-blue-800";
      case 'shipped':
        return "bg-purple-100 text-purple-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Order #{id.substring(0, 8)}</CardTitle>
        <CardDescription>
          Placed on {format(new Date(createdAt), "MMM d, yyyy")}
        </CardDescription>
      </div>
      <div className="flex items-center gap-4">
        <Badge
          variant="outline"
          className={getStatusColor(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <Button variant="outline" size="sm" onClick={onPrint}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>
    </CardHeader>
  );
};

export default OrderDetailHeader;
