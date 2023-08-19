import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import axios from "axios";
import EditModal from "./EditModal";

const ContactList = () => {
  const [selectedContact, setSelectedContact] = useState("");

  const queryClient = useQueryClient();
  const {
    data: contacts,
    error,
    isLoading,
  } = useQuery("contacts", async () => {
    const response = await axios.get(
      "https://contact-data-dfa0.onrender.com/contacts"
    );
    return response.data;
  });

  const deleteContactMutation = useMutation(
    async (id) => {
      await axios.delete(
        `https://contact-data-dfa0.onrender.com/contacts/${id}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        alert("Contact deleted");
      },
    }
  );

  const handleDelete = (id) => {
    deleteContactMutation.mutate(id);
  };

  if (isLoading) return <h1 className="text-4xl font-bold mb-4">Loading...</h1>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="text-4xl font-bold mb-4">Contact List</h2>
      {!contacts.length ? (
        <h1 className="text-4xl font-bold mt-4">No Contacts</h1>
      ) : (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-6 w-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-7  flex-wrap"
            >
              <div>
                <h3 className="text-3xl font-semibold">
                  {contact.firstName} <br />
                  {contact.lastName}
                </h3>
                <p className="text-gray-600 text-2xl mt-2">{contact.status}</p>
              </div>
              <div className="flex flex-row gap-4">
                <button
                  className="text-blue-500 text-2xl hover:underline mr-2"
                  onClick={() => setSelectedContact(contact)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 text-2xl hover:underline"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
                {selectedContact && (
                  <EditModal
                    contact={selectedContact}
                    onClose={() => setSelectedContact(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
