document.getElementById('profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const profileResult = document.getElementById('profile-result');

    try {
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
            throw new Error(`User ${username} not found.`);
        }

        const user = await response.json();
        profileResult.innerHTML = `
            <div class="profile-info">
                <p><strong>Username:</strong> ${user.login}</p>
                <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
                <p><strong>Company:</strong> ${user.company || 'N/A'}</p>
                <p><strong>Location:</strong> ${user.location || 'N/A'}</p>
                <p><strong>Public Repos:</strong> ${user.public_repos}</p>
                <p><strong>Followers:</strong> ${user.followers}</p>
                <p><strong>Following:</strong> ${user.following}</p>
                <p><strong>Bio:</strong> ${user.bio || 'N/A'}</p>
                <p><strong>URL:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            </div>
        `;
    } catch (error) {
        profileResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});
