"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { addUser } from "@/lib/db";
import { useEffect, useState } from "react";
import { message } from "@tauri-apps/plugin-dialog";
import { check_permission_notification_send_notification } from "@/lib/notification";


const Page = () => {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");






  function save_on_database() {
    addUser({
      fullname: name,
      username: username,
    }).then(async (v) => {
      if (v == true) {
        setname("")
        setusername("")
        check_permission_notification_send_notification(
          "Data has been saved",
          "Message"
        )
      } else {
        await message("not saved, Try again!", {
          title: "Tauri",
          kind: "error",
        });
      }
    });
  }

  return (
    <div className="flex justify-center  h-full items-center">
      <FieldSet className="w-full max-w-md ">
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>
          This appears on invoices and emails.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              onChange={(e) => setname(e.target.value)}
              value={name ?? ""}
              autoFocus
              id="name"
              autoComplete="off"
              placeholder="Evil Rabbit"
            />
            <FieldDescription>
              This appears on invoices and emails.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              value={username ?? ""}
              onChange={(e) => setusername(e.target.value)}
              placeholder="username"
              aria-invalid
              autoComplete="off"
            />
            <FieldError>Choose another username.</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Button
              onClick={save_on_database}
              className="w-full bg-[#80CED0] hover:bg-[#2D838D]"
            >
              save
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default Page;
