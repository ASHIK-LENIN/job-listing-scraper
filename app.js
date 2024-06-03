const puppeteer = require('puppeteer');

const scrapeJobs = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
 
    // await page.screenshot({ path: 'demo.png' , fullPage: true}) ==> it screenshot of the full page
     // await page.pdf({ path: 'demo.pdf', format: 'A4' }); ==> it takes the entire page into a pdf format

    // const html = await page.content(); ==> it display all the html tags used in the web app
    // console.log(html);
    
    // const title = await page.evaluate(() => document.title) ==> it display the title of the web app
    // console.log(title)

    // const text = await page.evaluate(()=> document.body.innerText)
    // console.log(text)
    
    // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a') , (e) => e.href)  )

    // console.log(links)
    // await browser.close();
    

    await page.goto('https://www.skipthedrive.com/job-category/remote-accounting-jobs/', { waitUntil: 'load', timeout: 0 });

    // Scrape job listings from the homepage
    const jobs = await page.evaluate(() => {
      const jobNodes = document.querySelectorAll('.post-content');
      const jobList = [];
  
      jobNodes.forEach((job) => {
        const jobTitle = job.querySelector('.post-title.entry-title a')?.innerText || null;
        const companyName = job.querySelector('.custom_fields_company_name_display_search_results')?.innerText.trim() || null;
        const jobLocation = job.querySelector('.custom_fields_job_location_display')?.innerText.trim() || null;
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

    // // Log the initial job list
    // console.log('Initial job list:', jobs);


  // Iterate through each job listing to get detailed job descriptions and company info
  
  for (const job of jobs) {
    await page.goto(job.descriptionUrl, { waitUntil: 'load', timeout: 0 });

    const jobDetails = await page.evaluate(() => {
      const jobDescription = document.querySelector('.entry-content')?.innerText || null;
      const companyWebsite = document.querySelector('.custom_fields_company_name_display a')?.href || null;
      const companyLogoUrl = null; // No logo URL is available in the provided HTML snippet
      const companyDescription = document.querySelector('.custom_fields_company_name_display')?.innerText || null;

      return {
        jobDescription,
        companyWebsite,
        companyLogoUrl,
        companyDescription
      };
    });

    Object.assign(job, jobDetails);

      // // Log the job details as they are fetched
      // console.log('Job details:', job);
  }


     // Log the final job list with details
     console.log('Final job list with details:', jobs);
 
  await browser.close();  

  
};

 
scrapeJobs();