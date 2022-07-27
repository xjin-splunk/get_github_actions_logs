const core = require("@actions/core");
const github = require("@actions/github");

const axios = require('axios');


async function getMetadata(){
    const repo_name = core.getInput("repo_name");
    const repo_owner = core.getInput("repo_owner");
    
    const logURL = 'https://api.github.com/repos/'+repo_owner+'/'+repo_name+'/'+'actions/runs?owner='+repo_owner+'&repo='+repo_name

    let instance = axios.create({
        baseURL: '',
        headers: {
          Accept: 'application/json',
        }
      });
    
    return await instance.get(logURL).then((res) => {return res.data}).catch("at getMetadata");

};

async function getJobsURL(jobsURL){
    let instance = axios.create({
        baseURL: '',
        headers: {
          Accept: 'application/json',
        }
      });
    
    return await instance.get(jobsURL).then((res) => {return res.data}).catch("at getJobsURL");
}

async function parseJson(){
    let rawMetadata = await getMetadata();
    let cur_attempt = rawMetadata.workflow_runs[0];
    console.log(cur_attempt.created_at);
    console.log(cur_attempt.id);
    console.log(cur_attempt.name);
    console.log(cur_attempt.conclusion);
    console.log(cur_attempt.url);

    let jobsMetadata = await getJobsURL(cur_attempt.jobs_url).catch("at parseJson");
    console.log(jobsMetadata);
};

parseJson().catch("at main");