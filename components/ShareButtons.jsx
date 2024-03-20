import React from 'react'
import {TwitterIcon, FacebookIcon, WhatsappIcon, EmailIcon, FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';

const ShareButtons = ({property}) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
    return (
        <>
            <h3 className='text-xl font-bold text-center pt-2'>Share this property</h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type}ForRent`} >
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={`\n ${shareUrl}`} title={property.name} hashtags={[`${property.type}ForRent`]} >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton url={`\n ${shareUrl}`} title={property.name} separator=':: ' >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton url={`\n ${shareUrl}`} subject={`${property.name}`} body={`Check out this listing!`} >
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>

            </div>
        </>
    )
}

export default ShareButtons
