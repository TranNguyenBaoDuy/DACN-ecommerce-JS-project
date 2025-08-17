import React from 'react'
import Hero from '../../components/Hero/Hero'
import LatesCollection from '../../components/LatesCollection/LatesCollection'
import BestSeller from '../../components/LatesCollection/BestSeller'
import OurPolicy from '../../components/Policies/OurPolicy'
import NewsletterBox from '../../components/Newletter/NewsletterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <LatesCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
