// Get rhymes from the Datamuse API
async function getRhyme(word) {
    const apiUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.length > 0) {
        return data[0].word;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching rhymes:', error);
      return null;
    }
  }
  
  //Replace headlines with rhyming sentences
  async function replaceHeadlinesWithRhymes() {
    const headlines = document.querySelectorAll('.lightCardTitle'); 
  
    headlines.forEach(async (headline) => {
      const originalText = headline.innerText;
      const words = originalText.split(' ');
  
      // create rhymes for each word in the headline
      const rhymes = await Promise.all(words.map(getRhyme));
  
      // Replace the headline with rhyming sentences
      headline.innerText = rhymes.join(' ');
    });
  }
  
  // Run when the page is fully loaded
  window.addEventListener('load', replaceHeadlinesWithRhymes);
  