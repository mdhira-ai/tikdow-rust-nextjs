'use client'

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { get_settings_data } from "@/lib/db"
import { useEffect, useState } from "react"

interface n {
    name: string,
    value: number
}


export default function Page() {

    const [results, setresults] = useState<n[]>([])

    useEffect(() => {
        get_settings_data().then((data) => {
            console.log(data)
        })
    }, [])




    return (
        <FieldGroup className="w-full">

            <FieldLabel htmlFor="switch-notifications" className="border-none">
                <Field orientation="horizontal" >
                    <FieldContent >
                        <FieldTitle>Enable notifications</FieldTitle>
                        <FieldDescription>
                            Receive notifications when focus mode is enabled or disabled.
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="switch-notifications" />
                </Field>
            </FieldLabel>
        </FieldGroup>
    )
}
