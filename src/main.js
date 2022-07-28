// import libraries
const core = require("@actions/core");
const github = require("@actions/github");
const axios = require('axios');

// helper function that gets Github Actions logs
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
    
    return await instance.get(logURL).then((res) => {return res.data}).catch(console.log("at getMetadata"));

};

// helper function that gets currentworkflow logs
async function getJobsURL(jobsURL){
    let instance = axios.create({
        baseURL: '',
        headers: {
          Accept: 'application/json',
        }
      });
    
    return await instance.get(jobsURL).then((res) => {return res.data}).catch(console.log("at getJobsURL"));
}

async function parseJson(){
    // get raw metadata of the repo
    let rawMetadata = await getMetadata();

    // get the latest attempt log messages
    let cur_attempt = rawMetadata.workflow_runs[0];

    let jsonDict = {};

    jsonDict["time"] = cur_attempt.created_at;
    jsonDict["runid"] = cur_attempt.id;
    jsonDict["repository"] = cur_attempt.repository.full_name;

    let jobsMetadata = await getJobsURL(cur_attempt.jobs_url).catch(console.log("at parseJson"));
    
    let jobsDict = {};
    for (var i=0; i < jobsMetadata.jobs.length; i++){
        let stepsDcit = {};
        for (var j=0; j<jobsMetadata.jobs[i].steps.length; j++){
            let curStepDict = {};
            curStepDict["conclusion"] = jobsMetadata.jobs[i].steps[j].conclusion
            curStepDict["status"] = jobsMetadata.jobs[i].steps[j].status
            stepsDcit[jobsMetadata.jobs[i].steps[j].name] = curStepDict;
        }
        jobsDict[jobsMetadata.jobs[i].name] = stepsDcit;
    }
    jsonDict["jobs"] = jobsDict;
    // console.log(jsonDict);
    console.log(JSON.stringify(jsonDict));
};

parseJson().catch(console.log("at main"));