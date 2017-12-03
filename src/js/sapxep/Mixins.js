export default {
    methods: {
        scrollWin() {
            let myInterval = setInterval(function (){
                if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight){
                    clearInterval(myInterval);
                }
                //window.scrollBy(0, 100)
                window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight)
            }, 5)
        }
    }
}
