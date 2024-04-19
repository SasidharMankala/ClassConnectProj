import Cookies from "js-cookie";

const Logout = ()=>{
    Cookies.remove('email');
    Cookies.remove('role');
    Cookies.remove('univname');
    Cookies.remove('password');
    window.location.reload();

}

export default Logout;
