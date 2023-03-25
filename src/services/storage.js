export const storage = {
  
    setItem(name, value){
        localStorage.setItem(name, value)
    },
    getItem(name){
        localStorage.getItem(name)
    },
    removeItem(name){
        localStorage.removeItem(name)
    },
    clear(){
        localStorage.clear()
    }
}