"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

interface Invoice {
  invoice: string
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
}

const initialInvoices: Invoice[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TablesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [sortColumn, setSortColumn] = useState<keyof Invoice | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleSort = (column: keyof Invoice) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }

    const sortedInvoices = [...invoices].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1
      if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    setInvoices(sortedInvoices)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredInvoices = invoices.filter((invoice) =>
    Object.values(invoice).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRowSelect = (invoice: string) => {
    setSelectedRows((prev) => (prev.includes(invoice) ? prev.filter((row) => row !== invoice) : [...prev, invoice]))
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Tables</h1>
      <div className="space-y-4" data-testid="tables-container">
        <Input
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
          data-testid="search-input"
        />
        <Table data-testid="data-table">
          <TableCaption data-testid="table-caption">A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow data-testid="table-header-row">
              <TableHead className="w-[100px]">Select</TableHead>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => handleSort("invoice")} data-testid="sort-invoice-button">
                  Invoice
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("paymentStatus")} data-testid="sort-status-button">
                  Status
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("paymentMethod")} data-testid="sort-method-button">
                  Method
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort("totalAmount")} data-testid="sort-amount-button">
                  Amount
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-testid="table-body">
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.invoice} data-testid={`table-row-${invoice.invoice}`}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(invoice.invoice)}
                    onChange={() => handleRowSelect(invoice.invoice)}
                    data-testid={`row-checkbox-${invoice.invoice}`}
                  />
                </TableCell>
                <TableCell className="font-medium" data-testid={`cell-invoice-${invoice.invoice}`}>{invoice.invoice}</TableCell>
                <TableCell data-testid={`cell-status-${invoice.invoice}`}>{invoice.paymentStatus}</TableCell>
                <TableCell data-testid={`cell-method-${invoice.invoice}`}>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right" data-testid={`cell-amount-${invoice.invoice}`}>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div data-testid="table-state">
          <h2 className="text-lg font-semibold">Table Interactions:</h2>
          <p data-testid="sort-column">Sort Column: {sortColumn || "None"}</p>
          <p data-testid="sort-direction">Sort Direction: {sortDirection}</p>
          <p data-testid="search-term">Search Term: {searchTerm || "None"}</p>
          <p data-testid="selected-rows">Selected Rows: {selectedRows.join(", ") || "None"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
