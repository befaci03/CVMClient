const { Client } = require('discord-rpc');

const rpc = new Client({ transport: 'ipc' });
let currentUser = { username: 'Connecting...', status: 'Do Not Distribute!' };
let currentTab = { website: 'cvmclient:loading', title: 'Loading the client' };
let hideUsername = false;

function updateActivity() {
    let statusicon;
    if (currentUser.status === "AFK") statusicon = "afks";
    else if (currentUser.status === "Online") statusicon = "onlines";
    else if (currentUser.status === "Do Not Distribute!") statusicon = "dnds";
    rpc.setActivity({
        details: `On ${currentTab.website}${hideUsername ? "" : " as " + currentUser.username}`,
        state: `${currentUser.status}`,
        largeImageText: 'CollabVM',
        smallImageKey: statusicon,
        smallImageText: currentUser.status,
        buttons: [{
            label: "Download",
            url: "https://rickroll.it"
        }],
        startTimestamp: new Date(),
        instance: false
    }).catch(console.error);
}

(async () => {
    try {
        await rpc.login({ clientId: '1356343085835227417' });
        console.log('RPC connecté avec succès!');
        updateActivity();
    } catch (error) {
        console.error('Erreur RPC:', error);
    }
})();

module.exports = {
    updateUserStatus: (username, status) => {
        currentUser = { username, status };
        updateActivity();
    },
    updateTabInfo: (website) => {
        currentTab.website = website;
        updateActivity();
    },
    updateUserSettingsRPC: (args) => {
        hideUsername = args.user.username.hide;
        updateActivity();
    }
};
