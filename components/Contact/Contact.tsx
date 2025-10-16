import { Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import ContactForm from './Form'
import FormSection from './FormSection'
import Hero from '../Common/Hero'
import Map from './Map'

const Contact = () => {
    return (
        <div className='bg-[#F6F9FC]'>
            <Hero
                isContact
                title1={"Let's"}
                title1Color={"Connect"}
                desc1='We’re here to help you with your investment and corporate advisor'
                desc2='needs. Reach out to us, and our team will get back to you soon.'
                mobDes1='We’re here to help you with your investment '
                mobDes2='and corporate advisor needs. Reach out to us, and our team will get back to you soon.'
            />
            <FormSection />
            <Map />
        </div>
    )
}

export default Contact