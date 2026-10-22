import { cn } from "@/utils/utils"
import * as React from "react"

const CompanyTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto text-white">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
)
CompanyTable.displayName = "CompanyTable"

const CompanyTableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b bg-secondary/30", className)} {...props} />
  )
)
CompanyTableHeader.displayName = "CompanyTableHeader"

const CompanyTableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
)
CompanyTableBody.displayName = "CompanyTableBody"

const CompanyTableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors",
        className
      )}
      {...props}
    />
  )
)
CompanyTableRow.displayName = "CompanyTableRow"

const CompanyTableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, style, ...props }, ref) => (
    <th
      ref={ref}
      style={style} // Ensure style is passed through
      className={cn(
        "h-12 py-1.5 px-4 text-left align-middle font-medium text-sub-header",
        className
      )}
      {...props}
    />
  )
)
CompanyTableHead.displayName = "CompanyTableHead"

const CompanyTableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, style, ...props }, ref) => (
    <td 
      ref={ref} 
      style={style} // Ensure style is passed through
      className={cn("py-1 px-4 align-middle font-light", className)} 
      {...props} 
    />
  )
)
CompanyTableCell.displayName = "CompanyTableCell"

export { CompanyTable, CompanyTableHeader, CompanyTableBody, CompanyTableHead, CompanyTableRow, CompanyTableCell }