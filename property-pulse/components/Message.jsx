import React from 'react'

const Message = ({message}) => {
  return (
    <div
    class="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
                        <h2 class="text-xl mb-4">
                          <span class="font-bold">Property Inquiry: </span>
                          {message.property}
                        </h2>
                        <p class="text-gray-700">
                          {message.body}
                        </p>
          
                        <ul class="mt-4">
                          <li><strong>Name:</strong> {message.name}</li>
          
                          <li>
                            <strong>Reply Email:</strong>
                            <a href={`mailto:${message.email}`} class="text-blue-500"
                              >{message.email}</a>
                          </li>
                          <li>
                            <strong>Reply Phone:</strong>
                            <a href={`tel:${message.phone}`} class="text-blue-500"
                              >{message.phone}</a>
                          </li>
                          <li><strong>Received: </strong>
                            {message.createdAt.substring(0,10)}
                          </li>
                        </ul>
                        <button
                          class="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
                        >
                          Mark As Read
                        </button>
                        <button class="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
                          Delete
                        </button>
                      </div>
  )
}

export default Message
