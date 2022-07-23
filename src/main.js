import core from "@actions/core";
import github from "@actions/github";
import Octokit from '@octokit/rest';

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: `${github.token}`
})

await octokit.request('GET /xjin-splunk/get_github_actions_logs/actions/runs', {
    owner: 'xjin-splunk',
    repo: 'get_github_actions_logs'
})