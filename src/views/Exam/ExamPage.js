import SideBar from '@/components/sidebar/SideBar';
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';


export default {
    data() {
        return {
            exam: {},
            exams: [],
            drawer: null,
            headers: ['ID', 'Name', 'Description', 'Duration', 'Actions', 'Status'],
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
        this.getExams()
    },
    methods: {
        async getExams() {
            await axiosInstance.get('/exam/')
            .then((res) => {
                this.exams = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
        },

        async addExam() {
            if (this.exam.name === undefined || this.exam.description === undefined 
                || this.exam.hour === undefined || this.exam.minute === undefined || 
                this.exam.second === undefined) {
                    console.log(1, this.exam)
                    this.Toast.fire({
                        icon: 'error',
                        title: 'All fields are required'
                    })
                } else {
                    if (this.exam.hour.length === 1) this.exam.hour = '0' + this.exam.hour
                    if (this.exam.minute.length === 1) this.exam.minute = '0' + this.exam.minute
                    if (this.exam.second.length === 1) this.exam.second = '0' + this.exam.second
                    let time = this.exam.hour + ':' + this.exam.minute + ':' + this.exam.second
                    if (this.exam.status === undefined) this.exam.status = false
                    await axiosInstance.post('/exam/', {
                        name: this.exam.name,
                        description: this.exam.description,
                        time: time,
                        status: this.exam.status
                    })
                    .then(() => {
                        this.exam = {}
                        this.getExams()
                        this.drawer = !this.drawer
                        this.Toast.fire({
                            icon:'success',
                            title: 'Successfully saved'
                        })
                        
                    })
                    .catch((err) => {
                        this.Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong'
                        })
                        console.log(err)
                        console.log(2, this.exam)
                    });
                }
        },

        async updateExamStatus(id, status) {
            await axiosInstance.patch('/exam/' + id + '/', {
                status: status
            })
            .then(() => {
                let title = 'Exam deactivated'
                this.getExams()
                if (status) title = 'Exam activated'
                this.Toast.fire({
                    icon:'success',
                    title: title
                })
            })
            .catch((err) => {
                this.Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
                console.log(err)
            })
        },

        async deleteExam(id) {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete('/exam/' + id + '/')
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Deleted!',
                        })
                        this.getExams()
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
    }
}