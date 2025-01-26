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
      <h1 className="text-3xl font-bold mb-6">Tables</h1>
      <div className="space-y-4">
        <Input placeholder="Search invoices..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Select</TableHead>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => handleSort("invoice")}>
                  Invoice
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("paymentStatus")}>
                  Status
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("paymentMethod")}>
                  Method
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort("totalAmount")}>
                  Amount
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(invoice.invoice)}
                    onChange={() => handleRowSelect(invoice.invoice)}
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <h2 className="text-lg font-semibold">Table Interactions:</h2>
          <p>Sort Column: {sortColumn || "None"}</p>
          <p>Sort Direction: {sortDirection}</p>
          <p>Search Term: {searchTerm || "None"}</p>
          <p>Selected Rows: {selectedRows.join(", ") || "None"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}

