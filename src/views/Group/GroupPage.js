import SideBar from '@/components/sidebar/SideBar';
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            group_no: null,
            drawer: null,
            headers: ['id', 'group no', 'actions'],
            groups: [],
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
        }
    },
    created() {
        this.getGroups()
    },
    methods: {
        async getGroups() {
            await axiosInstance.get('/group/')
            .then((res) => {
                this.groups = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        async addGroup() {
            if (this.group_no === null) {
                this.Toast.fire({
                    icon: 'warning',
                    title: 'Group number must not be empty',
                })
            } else {
                this.group_no = Number(this.group_no)
                if (Number.isNaN(this.group_no)) {
                    this.group_no = null
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Group number must be a number',
                    })
                } else {
                    await axiosInstance.post('/group/', {
                        no: this.group_no
                    })
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Succesfully saved',
                        })
                        this.drawer = !this.drawer
                        this.getGroups()
                    })
                    .catch((err) => {
                        console.log(err)
                        this.Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong!',
                        })
                        this.group_no = null
                    })
                }
            }
        },
        async deleteGroup(id) {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete('/group/' + id + '/')
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Deleted!',
                        })
                        this.getGroups()
                    })
                    .catch((err) => {
                        console.log(err)
                        this.Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong!',
                        })
                    })
                }
            })
        }
    },
    components: {
        SideBar
    },
    setup() {
    }
}