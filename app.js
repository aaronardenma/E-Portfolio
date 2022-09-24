// template_9c2jfam
// service_hy7uh26
// FJDSzEdVOUyIA0qfL

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')

    emailjs
        .sendForm(
            'service_hy7uh26',
            'template_9c2jfam',
            event.target,
            'FJDSzEdVOUyIA0qfL'
        ).then(() => {
            loading.classList.remove('modal__overlay--visible')
            success.classList += ' modal__overlay--visible'
        }).catch(() => {
            loading.classList.remove("modal__overlay--visible")
            alert(
                "The email service is termporarily unavailable. Please contact me directly on aaronardenma@gmail.com"
            );
        })
}

let isModalOpen = false;
function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}