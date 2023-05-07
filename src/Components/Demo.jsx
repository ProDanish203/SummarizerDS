import React, { useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from "../assets";
import axios from 'axios';

export const Demo = () => {

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState("")
  

  useEffect(() => {

    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }

  }, [])

  const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: `${article.url}`,
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': '610dd1061dmshb3526e88258c147p1e2682jsn5aea63236f4e',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await axios.request(options);

      const newArticle = {...article, summary: response.data.summary }
      
      setArticle(newArticle);
      
      const updateAllArticles = [newArticle, ...allArticles]
      
      setAllArticles(updateAllArticles);
      
      localStorage.setItem('articles', JSON.stringify(updateAllArticles));
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError("Sorry for the trouble but i'm unable to summarize the article from the link you provided. Kindly check the link or try from another resource")
      console.error(error);
    }

  }
  
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  }


  return (
    <>
    <section className='md:mt-16 w-full max-w-xl'>

      <div className='flex flex-col md:max-w-[80vw] relative m-auto gap-2'>
        <form className='realtive flex justify-center items-center'
        onSubmit={handleSubmit}
        >
          
          <i className='fas fa-link absolute left-0 z-50 my-2 ml-3 w-5 text-[20px] text-gray-500'></i>

          <input 
          type="url" 
          placeholder='Enter the url of the article'
          value={article.url}
          onChange={(e) => {setArticle({
            ...article, url: e.target.value,
          })}}
          required
          className='url_input peer absolute left-0'
          autoCapitalize='off'
          />

          <button type='submit' className='submit_btn peer-focus:text-gray-700'>
            <i className='fas fa-paper-plane text-[18px]'></i>
          </button>

        </form>

        {/* Browse URL History */}

        <div className='flex flex-col gap-1 mt-10 max-h-60 overflow-y-auto'>
          {
            allArticles.map((item, index) => (
              <div
              key={`item-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <i className={`fas fa-${copied === item.url ? 'check' : 'copy'} text-blue-800 copy_icon`}></i>
                </div>
                <p style={{ textTransform: "lowercase"}} className='flex-1 text-blue-800 font-medium text-md truncate'>
                  {item.url}
                </p>
              </div>
            ))
          }
        </div>


      </div>

      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>

        {
          loading ? (
            <img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
          ) 
          :
          error ? (
            <p className='text-red-500 text-md'>
              {error}
            </p>
          ) 
          : (
            article.summary && (
              <div className='flex flex-col items-start gap-3'>
                <h2 className='font-bold text-gray-200 text-left text-xl'>
                  Article <span className='blue_gradient'>Summary</span>
                </h2>
                <div className="summary_box">
                  <p className='font-medium text-md text-gray-800'>
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )
        }

      </div>

    </section>    
    </>
  )
}
