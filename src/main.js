const core = require("@actions/core");
const github = require("@actions/github");


async function run(){
    const githubToken = core.getInput("token");
    const repo_name = core.getInput("repo_name");
    const repo_owner = core.getInput("repo_owner");

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = github.getOctokit(githubToken);
    // const octokit = github.getOctokit('${github.token}');
    
    const logURL = 'https://api.github.com/repos/'+repo_owner+'/'+repo_name+'/'+'actions/runs?owner='+repo_owner+'&repo='+repo_name
    
    await octokit.request('GET '+logURL).then((data) => {console.log(data.url)});
    // await octokit.request('GET '+logURL).then((data) => {console.log(data.url); await octokit.request('GET '+data.url).then((data)=>{console.log(data)})});
};

// run().catch(console.log("get log failed"));
run();