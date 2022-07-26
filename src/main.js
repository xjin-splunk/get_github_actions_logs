const core = require("@actions/core");
const github = require("@actions/github");

const axios = require('axios');


async function run(){
    const githubToken = core.getInput("token");
    const repo_name = core.getInput("repo_name");
    const repo_owner = core.getInput("repo_owner");

    // const octokit = github.getOctokit(githubToken);
    
    const logURL = 'https://api.github.com/repos/'+repo_owner+'/'+repo_name+'/'+'actions/runs?owner='+repo_owner+'&repo='+repo_name

    let instance = axios.create({
        baseURL: '',
        headers: {
          Accept: 'application/json',
        }
      });
    
    await instance.get(logURL).then((res) => {console.log(res.data)});
    
    // await octokit.request('GET '+logURL).then((data) => {console.log(data.url)});

};

run();