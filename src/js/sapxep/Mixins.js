export default {
    methods: {
        scrollWin() {
            let myInterval = setInterval(function (){
                if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight){
                    clearInterval(myInterval);
                }
                window.scrollBy(0, 5);
            }, 5)
        }
    }
}
