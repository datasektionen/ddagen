import { ExtraOrderItem } from "@/shared/Classes";
import { type ColumnDef } from "@tanstack/react-table";

interface ColumnProps {
}

export const getOrderColumns = ({

}: ColumnProps): ColumnDef<ExtraOrderItem>[] =>
  [
    {
      accessorKey: "type",
      header: () => (
        <div className="flex flex-1 items-center justify-start text-primary font-bold gap-3">
          <p className="font-medium text-sub-header">Typ</p>
        </div>
      ),
      size: 1000,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="font-semibold text-header">{row.original.type}</span>
        </div>
      ),
    },
    {
      id: "amount",
      size: 240,
      header: () => (
        <div className="flex items-center justify-end text-primary font-bold gap-3">
          <p className="font-medium text-sub-header">Antal</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-1 justify-end items-center">
            <div className="flex flex-1 cursor-text justify-end items-center h-10">
              <p className="text-primary font-bold">{row.original.amount}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "price_per_unit",
      size: 240,
      header: () => (
        <div className="flex items-center justify-end text-primary font-bold gap-3">
          <p className="font-medium text-sub-header">Pris/st</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-1 justify-end items-center">
            <div className="flex flex-1 cursor-text justify-end items-center h-10">
              <p className="text-primary font-bold">{row.original.price_per_unit}:-</p>
            </div>
          </div>
        );
      },
    },
  ];