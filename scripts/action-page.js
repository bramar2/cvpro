for(const input of document.querySelectorAll('.option > input')) {
    const id = input.id;
    input.addEventListener('change', (e) => {
        console.log("Change", id);
    });
}