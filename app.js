const puppeteer = require('puppeteer');
const { connectToMongoDB, closeMongoDBConnection } = require('./mongodb')
require('dotenv').config();


const scrapeJobs = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
 
    await page.goto('https://www.skipthedrive.com/job-category/remote-accounting-jobs/', { waitUntil: 'load', timeout: 0 });

   
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
    //  console.log('Final job list with details:', jobs);
 
  await browser.close();  

  return jobs;
};

// save to mongodb

const saveToMongoDB = async (jobs) => {
  const collection = await connectToMongoDB();

  try {
    
    for (const job of jobs) {
      await collection.updateOne(
        { jobTitle: job.jobTitle, companyName: job.companyName },
        { $set: job },
        { upsert: true }
      );
      console.log(`Job saved: ${job.jobTitle} at ${job.companyName}`);
    }
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
  } finally {
    await closeMongoDBConnection();
  }
};

scrapeJobs().then((jobs) => {
  console.log(JSON.stringify(jobs, null, 2));
  saveToMongoDB(jobs);
}).catch((error) => {
  console.error('Error during scraping:', error);
});
