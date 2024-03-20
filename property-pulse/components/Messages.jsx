'use client'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Message from './Message';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect( () => {
        const getMessages = async () => {
            try {
                const res = await fetch('/api/messages');
                if(res.ok){
                    const data = await res.json();
                    console.log(data);
                    setMessages(data);

                }
            } catch (error) {
                console.log(error);
                     
            }finally{
                setLoading(false)
            }
        }
        getMessages();
    },[])

    useEffect( ()=>{
        console.log(messages);
    },[messages])


    return (
        <div>
            {loading 
            ? <Spinner loading={loading}/>
            :
            (
                <section class="bg-blue-50">
                <div class="container m-auto py-24 max-w-6xl">
                  <div
                    class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                  >
                    <h1 class="text-3xl font-bold mb-4">Your Messages</h1>
          
                    <div class="space-y-4">
                        {messages.length == 0 ? 'No messages' 
                        : 
                        messages.map( message => {
                            return (<Message key={message._id} message={message} messages={messages} setMessages={setMessages}/>)
                        })
                        }
                      
                    </div>
                  </div>
                </div>
              </section>
            )
            }
        </div>
    )
}

export default Messages
