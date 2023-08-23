import axiosInstance from "@/utils/axiosInstance"
import Swal from "sweetalert2"

export default {
    data: () => ({
        show1: false,
        password: '',
        username: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => v.length <= 10 || 'Username must be less than 10 characters',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length <= 10 || 'Password must be less than 10 characters',
        ],
        Toast: Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
    }),
    created() {
      this.deleteToken();
    },
    methods: {
      
      async deleteToken() {
        localStorage.removeItem('token')
      },
      async login() {
        if (this.username == '') {
          this.Toast.fire({
            icon: 'warning',
            title: 'Username is required'
          })
          this.username = ''
          this.password = ''
        } else
        if (this.password == '') {
          this.Toast.fire({
            icon: 'warning',
            title: 'Password is required'
          })
          this.username = ''
          this.password = ''
        } else
        await axiosInstance.post('auth/token-admin/', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          this.$router.push('/dashboard')
          localStorage.setItem('token', res.data.token)
          this.Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch((err) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Username or password is incorrect'
          })
          this.username = ''
          this.password = ''
          console.log(err)
        })
      }
    }
  }