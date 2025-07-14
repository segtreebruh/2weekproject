import { useState } from "react";
import type { Contact } from "@shared/types";
import * as contactService from "../services/contactService";
import { useNotification } from "./useNotification";
import { isAxiosError } from "axios";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { showNotification } = useNotification();

  const handleAddContact = async (name: string, number: string) => {
    try {
      const addedContact = await contactService.create({ name, number });
      setContacts((contacts) => contacts.concat(addedContact));
      showNotification(`Added ${addedContact.name}`, "success");
    } catch (error) {
      console.error("Add contact failed:", error);
      if (isAxiosError(error)) {
        showNotification(`${error.response?.data.error}`, "error");
      }
    }
  };

  return {
    contacts,
    setContacts,
    handleAddContact,
  };
}
