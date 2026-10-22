"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, Search, Loader2, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudentLibrary() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/library")
        if (res.ok) {
          const data = await res.json()
          setBooks(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const filteredBooks = books.filter((b: any) => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Digital Library</h2>
        <p className="text-muted-foreground">Search and browse books available in your school library.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by title or author..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-xl bg-card mt-4">
            <Library className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No books found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredBooks.map((book: any) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-32 bg-secondary/30 flex items-center justify-center border-b border-border">
                <BookOpen className="h-10 w-10 text-primary/40" />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg line-clamp-1" title={book.title}>{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">By {book.author}</p>
                
                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                    book.available > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}>
                    {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">ISBN: {book.isbn || 'N/A'}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
