import core from "@actions/core";
import github from "@actions/github";
import { composePaginateRest } from "@octokit/plugin-paginate-rest";
import Octokit from '@octokit/rest';

async function run(){
    const githubToken = core.getInput("token");

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = github.getOctokit(githubToken);
    
    const data = await octokit.request('GET /xjin-splunk/get_github_actions_logs/actions/runs', {
        owner: 'xjin-splunk',
        repo: 'get_github_actions_logs'
    })

    console.log(data);
};

run();