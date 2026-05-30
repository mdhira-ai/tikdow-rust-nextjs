"use client"; // required — Tauri APIs are client-only

import { useEffect, useState } from "react";
import { deleteuser, getDb, User } from "@/lib/db";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      const db = await getDb();
      const result = await db.select<User[]>("SELECT * FROM myusers");
      setUsers(result);
    }
    load();
  }, []);


  function deletefromdatabase(id:number){
    deleteuser(id).then((value) => {
        setUsers(value)
    })

  }




  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>username</TableHead>
          <TableHead>full name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#272d2d]" align="end">
                    <DropdownMenuItem>Edit {user.id}</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => user.id && deletefromdatabase(user.id)} variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
