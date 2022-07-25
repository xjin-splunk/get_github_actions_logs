import core from "@actions/core";
import github from "@actions/github";
import Octokit from '@octokit/rest';

const githubToken = core.getInput("token");

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = github.getOctokit(githubToken);

await octokit.request('GET /xjin-splunk/get_github_actions_logs/actions/runs', {
    owner: 'xjin-splunk',
    repo: 'get_github_actions_logs'
})