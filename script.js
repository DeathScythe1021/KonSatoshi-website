// homepage-lang-btn
const langButton = document.querySelectorAll('.lang-btn');

langButton.forEach(btn=>{
    btn.addEventListener("click",function(){
        document.querySelector('.lang-btn.active')?.classList.remove('active');
        this.classList.add('active');
    });
})