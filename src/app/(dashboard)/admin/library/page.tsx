"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, Loader2, BookCopy } from "lucide-react"
import AddBookForm from "@/components/forms/AddBookForm"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  quantity: number
  available: number
}

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/library")
      if (res.ok) {
        const data = await res.json()
        setBooks(data)
      }
    } catch (error) {
      console.error("Failed to fetch books", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Library</h2>
          <p className="text-muted-foreground">Manage books, inventory, and book issuance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Book Catalog</h3>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search title or author..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Copies</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-semibold text-foreground flex items-center gap-2">
                    <BookCopy className="h-4 w-4 text-muted-foreground" />
                    {book.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{book.author}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{book.isbn}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {book.available}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Issue</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No books found in the library.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAddForm && (
        <AddBookForm 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            setShowAddForm(false)
            fetchBooks()
          }} 
        />
      )}
    </div>
  )
}
