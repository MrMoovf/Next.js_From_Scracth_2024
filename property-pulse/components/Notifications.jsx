'use client'
import { useGlobalContext } from '@/context/GlobalContext'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const Notifications = () => {
	const {notifications, setNotifications} = useGlobalContext();

	const {data: session} = useSession();

	useEffect( () => {
		const getNotificationNumber = async () => {
		if(!session){
			return;
		}
		try {
			const res = await fetch('/api/messages/unread-count');
			const data = await res.json();
			setNotifications(data.length);
		} catch (error) {
			console.log(error);
			
		}
		}
		getNotificationNumber();
	},[])
	return (
		<>
			{notifications > 0 && (
			<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
				{notifications}
			</span>

			)}
		</>
	)
}

export default Notifications
