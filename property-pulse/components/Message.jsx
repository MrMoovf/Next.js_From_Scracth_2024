'use client'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const Message = ({message, messages, setMessages}) => {

	const [isRead, setIsRead] = useState(message.read);
	const [loading, setLoading] = useState(false);


	const handleReadClick = async () => {
		try {
			setLoading(true);
			const res = await fetch(`/api/messages/${message._id}`,{method:'PUT'});
			if(res.ok){
				const data = await res.json();
				setIsRead(data.read);
				toast.success(`Marked as ${data.read ? 'read' : 'new'}`);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}finally{
			setLoading(false);
		}

	}

	const handleDeleteClick = async () => {
		try {
			setLoading(true);
			const res = await fetch(`/api/messages/${message._id}`,{method:'DELETE'});

			if(res.ok){
				// const data = await res.json();
				setMessages(messages.filter( item => item._id !== message._id ));
				toast.success(`Message deleted`);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}finally{
			setLoading(false);
		}

	}

	return (
		<div class="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
			{!isRead && (
				<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
					New!
				</div>
			)}
			<h2 class="text-xl mb-4">
				<span class="font-bold">Property Inquiry: </span>
				{message.property.name}
			</h2>
			<p class="text-gray-700">
				{message.body}
			</p>

			<ul class="mt-4">
				<li><strong>Name:</strong> {message.sender.username}</li>
				<li>
					<strong>Reply Email: </strong>
					<a href={`mailto:${message.email}`} class="text-blue-500"
					>{message.email}</a>
				</li>
				<li>
					<strong>Reply Phone: </strong>
					<a href={`tel:${message.phone}`} class="text-blue-500"
					>{message.phone}</a>
				</li>
				<li><strong>Received: </strong>
					{new Date(message.createdAt).toLocaleString() }
				</li>
			</ul>
			<button onClick={handleReadClick} class={`mt-4 mr-3 w-32 h-8 ${isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'} text-center py-1 px-3 rounded-md`}>
				{loading 
				? (<Spinner  size={20} color='#FFFF' mx='1' loading={loading}/>)
				:
					<>
						{isRead ? 'Mark as new' : 'Mark as read'}
					</>
				
				}
			</button>
			<button onClick={handleDeleteClick} class="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
			{loading 
				? (<Spinner  size={20} color='#FFFF' mx='1' loading={loading}/>)
				:
					<>
						{'Delete'}
					</>
				
				}
			</button>
		</div>
 	)	
}

export default Message
