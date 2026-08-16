import Locale from "@/locales";
import { ExtraOrderItem, ExtraOrderPerson } from "@/shared/Classes";
import { type ColumnDef } from "@tanstack/react-table";

interface ColumnProps {
  t: Locale;
  showAction?: boolean;
  showPerson?: boolean;
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export type ExtraOrderColumns = {
  action?: string;
  actionColor?: string;
  person?: ExtraOrderPerson;
} & ExtraOrderItem;

export const getOrderColumns = ({
  t,
  showAction,
  showPerson,
  onAccept,
  onCancel
}: ColumnProps): ColumnDef<ExtraOrderColumns>[] => {
  const columns: ColumnDef<ExtraOrderColumns>[] = [];

  if(!!showAction){
    columns.push({
      accessorKey: "action",
      header: () => (
        <div className="flex flex-1 items-center justify-start text-primary font-bold gap-3">
          <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.action}</p>
        </div>
      ),
      size: 300,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span
            className="text-header"
            style={{color: row.original.actionColor ?? "#FFFFFF"}}
          >
            {row.original.action}
          </span>
        </div>
      ),
    });
  }

  if(!!showPerson){
    columns.push({
      accessorKey: "person",
      header: () => (
        <div className="flex flex-1 items-center justify-start text-primary font-bold gap-3">
          <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.person}</p>
        </div>
      ),
      size: 30,
      cell: ({ row }) => (
        <div className="flex flex-1 items-center gap-3">
          {row.original.person?.is_admin ?
            <img
              src="/img/fluga_cerise.svg"
              alt="D-Dagen"
              className="h-6"
              />
            :
            <div className="min-w-6 min-h-6 h-6 w-6 max-w-6 max-h-6 bg-black rounded-md"></div>
          }
        </div>
      ),
    });
  }

  columns.push({
    accessorKey: "type",
    header: () => (
      <div className="flex flex-1 items-center justify-start text-primary font-bold gap-3">
        <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.type}</p>
      </div>
    ),
    size: 1000,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="text-header">{row.original.type}</span>
      </div>
    ),
  });

  columns.push({
    id: "amount",
    size: 240,
    header: () => (
      <div className="flex items-center justify-end text-primary font-bold gap-3">
        <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.amount}</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-1 justify-end items-center">
          <div className="flex flex-1 cursor-text justify-end items-center h-10">
            <p className="text-primary">{row.original.amount}</p>
          </div>
        </div>
      );
    },
  });

  columns.push({
    id: "price_per_unit",
    size: 240,
    header: () => (
      <div className="flex items-center justify-end text-primary font-bold gap-3">
        <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.price_per_unit}</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-1 justify-end items-center">
          <div className="flex flex-1 cursor-text justify-end items-center h-10">
            <p className="text-primary">{row.original.price_per_unit}:-</p>
          </div>
        </div>
      );
    },
  });

  if(!!onAccept || !!onCancel){
    console.log("CREATE COLUMN ACTIONS")
    columns.push({
      id: "actions",
      header: () => (
        <div className="flex items-center justify-end text-primary font-bold gap-3">
          <p className="font-medium text-sub-header"></p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-1 justify-end items-center">
            <div className="flex flex-1 cursor-text justify-end items-center h-10 gap-2">
              {onAccept &&
                <button
                  className="rounded-md border-1 border-cerise background-transparent hover:scale-105"
                  onClick={() => onAccept(row.original.id)}
                >
                  <img src={"/icons/check.png"} alt="Accept" className="max-h-6" />
                </button>
              }
              {onCancel &&
                <button
                  className="rounded-md border-1 border-white background-transparent hover:scale-105"
                  onClick={() => onCancel(row.original.id)}
                >
                  <img src={"/icons/cross.png"} alt="Cancel" className="max-h-6" />
                </button>
              }
            </div>
          </div>
        );
      },
    });
  }

  return columns;
}