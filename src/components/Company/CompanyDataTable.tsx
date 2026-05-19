import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  RowData,
  RowSelectionState,
} from "@tanstack/react-table";
import { cn } from "@/utils/utils";
import type { Dispatch, SetStateAction } from "react";
import { CompanyTable, CompanyTableBody, CompanyTableCell, CompanyTableHead, CompanyTableHeader, CompanyTableRow } from "./CompanyTable";

interface CompanyDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData?: Dispatch<SetStateAction<TData[]>>;
  editingIds?: RowSelectionState;
  globalValue?: string;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  className?: string;
}

export function CompanyDataTable<TData, TValue>({
  columns,
  data,
  className,
}: CompanyDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row: any) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn(
        "rounded-md border border-white bg-background overflow-hidden",
        className
    )}>
      <CompanyTable>
        <CompanyTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <CompanyTableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <CompanyTableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </CompanyTableHead>
              ))}
            </CompanyTableRow>
          ))}
        </CompanyTableHeader>
        <CompanyTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <CompanyTableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <CompanyTableCell 
                    key={cell.id}
                    style={{ width: `${cell.column.getSize()}px` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </CompanyTableCell>
                ))}
              </CompanyTableRow>
            ))
          ) : (
            <CompanyTableRow>
              <CompanyTableCell
                colSpan={columns.length}
                className="h-24 text-center text-placeholder"
              >
                Inga resultat hittades.
              </CompanyTableCell>
            </CompanyTableRow>
          )}
        </CompanyTableBody>
      </CompanyTable>
    </div>
  );
}