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
    
    await octokit.request('GET /repos/'+repo_owner+'/'+repo_name+'/actions/runs', {
        owner: `${repo_owner}`,
        repo: `${repo_name}`
    }).then((data) => {console.log(data)}).catch(console.log("get log failed"));
};

run().catch(console.log("get log failed"));