import { useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ContactList from "./ContactList";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.trim() === "") {
      alert("First name is empty");
      return;
    }
    if (lastName.trim() === "") {
      alert("Last name is empty");
      return;
    }

    addContactMutation.mutate({
      id: uuidv4(),
      firstName,
      lastName,
      status,
    });
    //
  };

  const addContactMutation = useMutation(
    async (newContact) => {
      try {
        await axios.post(
          "https://contact-data-dfa0.onrender.com/contacts",
          newContact
        );

        setFirstName("");
        setLastName("");
        setStatus("active");
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        alert("Contact added successfully");
      },
    }
  );

  return (
    <>
      <div className="flex flex-col items-center gap-8 max-w-6xl mx-5 mt-10 w-full ">
        <form
          className="bg-white p-8 rounded-lg shadow-lg  w-full "
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-bold mb-6 text-center">
            Add New Contact
          </h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-3xl font-semibold mb-2">
              First Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-2xl focus:outline-none focus:border-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-3xl font-semibold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-2xl focus:outline-none focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Status:
            </label>
            <select
              className="w-full px-4 py-2 border text-2xl rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 text-2xl rounded-md hover:bg-blue-600"
            type="submit"
          >
            Save Contact
          </button>
        </form>
        <ContactList />
      </div>
    </>
  );
};

export default ContactForm;
