import * as React from "react";
import {ContactList} from "./ContactList";

export interface IAppProps {}

export default function IApp(props: IAppProps) {
    return <ContactList></ContactList>;
}
