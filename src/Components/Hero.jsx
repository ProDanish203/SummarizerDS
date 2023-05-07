import React from 'react'
import { logo } from "../assets";

export const Hero = () => {
  return (
    <>
    <header className="p-5 w-screen md:mb-10 mb-20 block">
        <nav className='flex justify-between items-center'>
          <img src={logo} alt="LOGO" className="w-52"/>
          <button className='btn p-2 pr-4 pl-4 bg-black text-white rounded-[4px] cursor-pointer'
          onClick={() => {window.location.assign("https://github.com/ProDanish203")}}
          >
              Github
          </button>
        </nav>

        <h1 className='md:text-8xl text-5xl font-bold text-gray-200 text-center mt-10 mb-10'>
          Summarize Articles with <span className='orange_gradient'>Summarizer.DS</span>
        </h1>

        <p className='text-center text-[18px] text-gray-300 md:max-w-[70%] m-auto'>
          Simplify your reading with Summarizer, an open-source AI tool to summarize any article, transforms lengthy articles into clear and consise summaries.
        </p>
        
    </header>
    </>
  )
}
