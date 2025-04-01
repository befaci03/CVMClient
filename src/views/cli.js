document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('winmin').addEventListener('click', () => {
        window.bvmAPI.window.minimize();
    });

    document.getElementById('winmaximize').addEventListener('click', () => {
        window.bvmAPI.window.maximize();
    });

    document.getElementById('winclose').addEventListener('click', () => {
        window.bvmAPI.window.close();
    });

});
