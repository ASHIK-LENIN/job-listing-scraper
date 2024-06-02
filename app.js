const puppeteer = require('puppeteer');

const scrapeJobs = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
 
    
    

    await page.goto('https://www.skipthedrive.com/job-category/remote-accounting-jobs/', { waitUntil: 'load', timeout: 0 });

    // Scrape job listings from the homepage
    const jobs = await page.evaluate(() => {
      const jobNodes = document.querySelectorAll('.post-content');
      const jobList = [];
  
      jobNodes.forEach((job) => {
        const jobTitle = job.querySelector('.post-title.entry-title a')?.innerText || null;
        const companyName = job.querySelector('.custom_fields_company_name_display_search_results')?.innerText.trim() || null;
        const jobLocation = null; // job location is not present in the provided HTML snippet
        const descriptionUrl = job.querySelector('.post-title.entry-title a')?.href || null;
  
        if (jobTitle && companyName && descriptionUrl) {
          jobList.push({
            jobTitle,
            companyName,
            jobLocation,
            descriptionUrl
          });
        }
      });
  
      return jobList;
    });
  

   
console.log(jobs);
    
 
  await browser.close();  

  
};

 
scrapeJobs();