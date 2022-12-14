// template_9c2jfam
// service_hy7uh26
// FJDSzEdVOUyIA0qfL

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1/20;
let isMarketingProjectsOpen = false;
let isSoftwareProjectsOpen = false;


function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;
    console.log(x,y)

    for (let i=0; i< shapes.length; ++i) {
        const isOdd = i % 2 === 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList += " modal__overlay--visible";

    emailjs
        .sendForm(
            'service_hy7uh26',
            'template_9c2jfam',
            event.target,
            'FJDSzEdVOUyIA0qfL'
        ).then(() => {
            loading.classList.remove('modal__overlay--visible')
            success.classList += ' modal__overlay--visible'
        })
        .catch(() => {
            loading.classList.remove("modal__overlay--visible")
            alert(
                "The email service is termporarily unavailable. Please contact me directly on aaronardenma@gmail.com"
            );
        })
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}

function toggleSoftwareProjects() {
    const marketingProject = document.querySelectorAll(".marketing-project");
    const softwareProject = document.querySelectorAll('.software-project');
    
    isSoftwareProjectsOpen = !isSoftwareProjectsOpen;
    isMarketingProjectsOpen = false
    
    if (isSoftwareProjectsOpen) {
        marketingProject.forEach(mp => {mp.classList.add('marketing__hidden')});
        softwareProject.forEach(sp => {sp.classList.remove('software__hidden')});   

    }
    else {
        marketingProject.forEach(mp => {mp.classList.remove('marketing__hidden');   
    })}
        
}

function toggleMarketingProjects() {
    const marketingProject = document.querySelectorAll(".marketing-project");
    const softwareProject = document.querySelectorAll('.software-project');

    isMarketingProjectsOpen = !isMarketingProjectsOpen;
    isSoftwareProjectsOpen = false
    
    if (isMarketingProjectsOpen) {
        softwareProject.forEach(sp => {sp.classList.add('software__hidden');
    })
        marketingProject.forEach(mp => {mp.classList.remove('marketing__hidden');   
})}
    else {
        softwareProject.forEach(sp => {sp.classList.remove('software__hidden');   
    })}

}

