/*
* Collection of service functions to work with github
* No public api provided
* */
import rp from 'request-promise';

/**
 * Gets lists of user's repos from github
 */
function getUserRepos(user) {
    let url = user._json.repos_url;

    let options = {
        'headers': {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${user.tokens.access_token}`,
        },
        'json': true,
        'uri': url,
    };

    return rp(options);
}

export {getUserRepos};
