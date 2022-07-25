const { core } = require("@actions/core");
const { github } = require("@actions/github");


async function run(){
    // const githubToken = core.getInput("token");

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    // const octokit = github.getOctokit(githubToken);
    const octokit = github.getOctokit('${github.token}');
    
    await octokit.request('GET /xjin-splunk/get_github_actions_logs/actions/runs', {
        owner: 'xjin-splunk',
        repo: 'get_github_actions_logs'
    }).then((data) => {console.log(data)});

    
};

run().catch(console.log("get log failed"));