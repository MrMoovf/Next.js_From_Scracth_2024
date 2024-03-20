'use client'
import React from 'react'

import { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker} from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';



const PropertyMap = ({property}) => {
    const [lat,setLat] = useState(null);
    const [lng,setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longtitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px',
    });
    const [loading,setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
      });

    useEffect(()=>{
        const fetchCoords = async()=>{
            try {
                const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

                // Check for results
                if(res.results.length == 0){
                    setGeocodeError(true);
                }
                const {lat, lng} = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longtitude:lng
                });
            } catch (error) {
                setGeocodeError(true);
            }
            finally{
                setLoading(false);
            }
        }
        fetchCoords();
    },[])
    


    
    return (
        <>
            {loading && (
            <Spinner loading={loading}/>
        )}

            {!loading && !geocodeError && (
                <Map 
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude:lng,
                    latitude:lat,
                    zoom:10,

                }}
                style={{
                    width: '100%',
                    height: 500
                }}
                mapStyle={'mapbox://styles/mapbox/streets-v9'}

            >
                <Marker latitude={lat} longitude={lng} anchor='bottom'>
                        <Image src={pin} width={40} height={40} alt='location'/>
                </Marker>
            </Map>
            )}

            {geocodeError && (
                <h1 className='text-2xl font-bold'>No location data</h1>
            )}
        </>
    )
}

export default PropertyMap
