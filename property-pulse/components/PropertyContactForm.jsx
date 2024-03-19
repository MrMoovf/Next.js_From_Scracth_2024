'use client'
import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify';

const PropertyContactForm = ({property}) => {
    const [fields, setFields] = useState({
        name: 'Anders',
        email: 'anders@kozuch.dk',
        phone: '12341234',
        message: 'Hej den ser fed ud'
    });
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const handleChange = (e)=>{
        const id = e.target.id;
        const value = e.target.value;
        setFields( (prev) => ({
            ...prev,
            [id]:value
        }));
        

    }
    useEffect(()=>{
        // console.log(fields);
    },[fields]);

    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            console.log(fields)

            const data = {
                ...fields,
                recipient: property.owner,
                property: property._id
                
            }

            console.log(data)

            const res = await fetch('/api/messages',{
                method:'POST', 
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if(res.ok){
                toast.success('Message sent successfully!')
            }
            else if(res.status == 400){
                toast.error(result.message)
            }
            else{
                throw Error(res.status)
            }

            console.log(res);


            // Resetting
            // setFields({
            //     name:'',
            //     email:'',
            //     phone:'',
            //     message:'',
            // });
        } catch (error) {
            console.log(error);
            toast.error('Woops, something went wrong')
        }finally{
            // setWasSubmitted(true);
        }

    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            {wasSubmitted && (
                <div className='m-auto text-center py-4 font-bold bg-blue-50 rounded-lg shadow-lg mb-4'>Message sent successfully</div>
            )}
            {!wasSubmitted && (
                <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='name'
                    >
                    Name:
                    </label>
                    <input
                    onChange={handleChange}
                    value={fields.name}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='Enter your name'             
                    required
                    />
                </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        onChange={handleChange}
                        value={fields.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    </div>
                    <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='phone'
                    >
                        Phone:
                    </label>
                    <input
                        onChange={handleChange}
                        value={fields.phone}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='phone'
                        type='text'
                        placeholder='Enter your phone number'
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={fields.message}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Enter your message"
                    ></textarea>
                    </div>
                    <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                        type="submit"
                    >
                        <FaPaperPlane className="fas fa-paper-plane mr-2"></FaPaperPlane> Send Message
                    </button>
                </div>
            </form>

            )}
            
        </div>
    )
}

export default PropertyContactForm
