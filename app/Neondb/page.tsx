'use client'


import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
// import { getposts } from "@/lib/db"
import { supabase } from "@/lib/supabase"



interface d {
  name: string,
  id: number,
  status: string
}

export default function Page() {

  const [mydata, setmydata] = useState<d[]>([])


  // useEffect(() => {
  //   getposts().then((c) => {
  //     setmydata(c as d[])
  //   })


  // }, [])


  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('mytab').select()

      if (todos) {
        setmydata(todos)
      }
    }

    getTodos()



  }, [])


  useEffect(() => {

    const channels = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'mytab' },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new) {
            setmydata((prev) => [...prev, payload.new as d])
          } else if (payload.eventType === "UPDATE" && payload.new) {
            setmydata((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new as d : item))
            )
          } else if (payload.eventType === "DELETE" && payload.old) {
            setmydata((prev) => prev.filter((item) => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }

  }, [])




  return (
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>


        {
          mydata.map((value, index) =>

            <TableRow key={index}>
              <TableCell className="font-medium">{value.name}</TableCell>
              <TableCell>{value.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"secondary"}
                  className="border bg-mybgforbtn"
                >
                  call
                </Button>
              </TableCell>
            </TableRow>
          )
        }
        
        


      </TableBody>
    </Table>
  )
}
