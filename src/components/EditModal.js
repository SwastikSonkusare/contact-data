import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const EditModal = ({ contact, onClose }) => {
  const [editedContact, setEditedContact] = useState(contact);
  const queryClient = useQueryClient();

  const updateContactMutation = useMutation(
    async (updatedContact) => {
      const response = await axios.put(
        `https://contact-data-dfa0.onrender.com/contacts/${contact.id}`,
        updatedContact
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        onClose();
        alert("Contact Edited");
      },
    }
  );

  const handleEdit = () => {
    updateContactMutation.mutate(editedContact);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] m-6">
        <h2 className="Sfont-semibold mb-4 text-3xl text-center">
          Edit Contact
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2 text-2xl">
            First Name:
          </label>
          <input
            type="text"
            value={editedContact.firstName}
            onChange={(e) =>
              setEditedContact({
                ...editedContact,
                firstName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-2xl"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2 text-2xl">
            Last Name:
          </label>
          <input
            type="text"
            value={editedContact.lastName}
            onChange={(e) =>
              setEditedContact({
                ...editedContact,
                lastName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-2xl"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2 text-2xl">
            Status:
          </label>
          <select
            value={editedContact.status}
            onChange={(e) =>
              setEditedContact({
                ...editedContact,
                status: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-2xl"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="text-blue-500 hover:underline mr-2 text-2xl"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md text-2xl hover:bg-blue-600"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
