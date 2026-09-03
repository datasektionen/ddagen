import Locale from "@/locales";
import { ExtraOrderItem, ExtraOrderPerson } from "@/shared/Classes";
import { type ColumnDef } from "@tanstack/react-table";

interface ColumnProps {
  t: Locale;
  showAction?: boolean;
  showPerson?: boolean;
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export type ExtraOrderColumns = Omit<ExtraOrderItem, "type" | "amount" | "price_per_unit"> & {
  type?: string;
  amount?: number;
  price_per_unit?: number;
  readOnly?: boolean;
  action?: string;
  actionColor?: string;
  person?: ExtraOrderPerson;
};

const formatAction = (action?: string) =>
  action
    ? action.toLowerCase().replace(/(^|_)(\w)/g, (_, separator, character) =>
        `${separator ? " " : ""}${character.toUpperCase()}`
      )
    : "";

export const getOrderColumns = ({
  t,
  showAction,
  showPerson,
  onAccept,
  onCancel,
  onEdit
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
            {formatAction(row.original.action)}
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
          <span className="text-header">{row.original.person?.email?.replace("@ddagen.se", "")?.toLowerCase() ?? "-"}</span>
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
        <div className="text-header">
          <span>{row.original.type}</span>
          {row.original.ticket_name && (
            <p className="text-sm text-primary/80">
              {row.original.ticket_name}
              {row.original.ticket_value?.length
                ? ` (${row.original.ticket_value.join(", ")})`
                : ""}
              {row.original.ticket_comment ? ` - ${row.original.ticket_comment}` : ""}
            </p>
          )}
        </div>
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
            <p className="text-primary">{row.original.amount ?? ""}</p>
          </div>
        </div>
      );
    },
  });

  columns.push({
    id: "price_per_unit",
    size: 250,
    header: () => (
      <div className="flex items-center justify-end text-primary font-bold gap-3">
        <p className="font-medium text-sub-header">{t.admin.extraOrders.itemFields.price_per_unit}</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-1 justify-end items-center">
          <div className="flex flex-1 cursor-text justify-end items-center h-10">
            <p className="text-primary">
              {row.original.price_per_unit == null ? "" : `${row.original.price_per_unit}:-`}
            </p>
          </div>
        </div>
      );
    },
  });

  if(!!onAccept || !!onCancel || !!onEdit){
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
              {onEdit && !row.original.readOnly &&
                <button
                  type="button"
                  className="hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:23px_23px] w-[26px] h-[26px] bg-no-repeat bg-origin-content pl-1 pb-1 rounded-md"
                  onClick={() => onEdit(row.original.id)}
                  aria-label={t.admin.extraOrders.addItem.edit}
                />
              }
              {onAccept &&
                <button
                  className="rounded-md border-1 border-cerise background-transparent hover:scale-105"
                  onClick={() => onAccept(row.original.id)}
                >
                  <img src={"/icons/check.png"} alt={t.admin.extraOrders.addItem.accept} className="max-h-6" />
                </button>
              }
              {onCancel && !row.original.readOnly &&
                <button
                  className="rounded-md border-1 border-white background-transparent hover:scale-105"
                  onClick={() => onCancel(row.original.id)}
                >
                  <img src={"/icons/cross.png"} alt={t.admin.extraOrders.addItem.cancelRequest} className="max-h-6" />
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