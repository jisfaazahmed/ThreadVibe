
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "@/utils/order-status";

type StatusSelectorProps = {
  status: string;
  setStatus: (status: string) => void;
  size?: "sm" | "default";
};

const StatusSelector = ({ status, setStatus, size = "default" }: StatusSelectorProps) => {
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className={size === "sm" ? "h-8 text-xs" : ""}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
