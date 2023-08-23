import SideBar from '@/components/sidebar/SideBar';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axiosInstance';

export default {
    data: () => ({
        newStudent: {},
        sortType: false,
        drawer: null,
        addStudentDialog: false,
        showStudentDialog: false,
        studentExtra: {},
        groups: [],
        groupValues: [],
        groupIds: [],
        headers: [
            'ID',
            'Student ID',
            'Name',
            'Surname',
            'Username',
            'Group',
            'Actions'
        ],
        students: [],
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

    computed: {
        
    },

    watch: {
    },

    created () {
        this.getStudents()
    },

    methods: {
        sortBy (item) {
            this.sortType = !this.sortType
            if (item === 'ID' && this.sortType) {
                this.students.sort((s1, s2) => (s1.id < s2.id ? 1 : (s1.id > s2.id) ? -1 : 0))
            } else if (item === 'ID' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.id > s2.id ? 1 : (s1.id < s2.id) ? -1 : 0))
            }
            if (item === 'Student ID' && this.sortType) {
                this.students.sort((s1, s2) => (s1.student_id < s2.student_id ? 1 : (s1.student_id > s2.student_id) ? -1 : 0))
            } else if (item === 'Student ID' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.student_id > s2.student_id ? 1 : (s1.student_id < s2.student_id) ? -1 : 0))
            }
            if (item === 'Name' && this.sortType) {
                this.students.sort((s1, s2) => (s1.name < s2.name ? 1 : (s1.name > s2.name) ? -1 : 0))
            } else if (item === 'Name' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.name > s2.name ? 1 : (s1.name < s2.name) ? -1 : 0))
            }
            if (item === 'Surname' && this.sortType) {
                this.students.sort((s1, s2) => (s1.surname < s2.surname ? 1 : (s1.surname > s2.surname) ? -1 : 0))
            } else if (item === 'Surname' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.surname > s2.surname ? 1 : (s1.surname < s2.surname) ? -1 : 0))
            }
            if (item === 'Username' && this.sortType) {
                this.students.sort((s1, s2) => (s1.username < s2.username ? 1 : (s1.username > s2.username) ? -1 : 0))
            } else if (item === 'Username' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.username > s2.username ? 1 : (s1.username < s2.username) ? -1 : 0))
            }
            if (item === 'Group' && this.sortType) {
                this.students.sort((s1, s2) => (s1.group.no < s2.group.no ? 1 : (s1.group.no > s2.group.no) ? -1 : 0))
            } else if (item === 'Group' && !this.sortType) {
                this.students.sort((s1, s2) => (s1.group.no > s2.group.no ? 1 : (s1.group.no < s2.group.no) ? -1 : 0))
            }
        },

        async getStudents() {
            await axiosInstance.get('/student/')
            .then((res) => {
                this.students = res.data
            })
            .catch((err) => {
                console.log(err)
                console.log(err.message)
            })
        },

        async addStudent() {
            // this.newStudent = {}
            this.drawer = !this.drawer
            await axiosInstance.get('/group/')
            .then((res) => {
                this.groups = res.data
                for (let i = 0; i < this.groups.length; i++) {
                    this.groupIds.push(this.groups[i].id)
                    this.groupValues.push(this.groups[i].no)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },

        async saveStudent() {
            let index = this.groupValues.indexOf(this.newStudent.group)
            await axiosInstance.post('/auth/create-student/', {
                student_id: Number(this.newStudent.student_id),
                name: this.newStudent.name,
                surname: this.newStudent.surname,
                username: this.newStudent.username,
                password: this.newStudent.password,
                group_id: Number(this.groupIds[index])
            })
            .then(() => {
                this.newStudent = {}
                this.drawer = !this.drawer
                this.getStudents()
                this.Toast.fire({
                    icon:'success',
                    title: 'Student added successfully'
                })
            })
            .catch((err) => {
                console.log(err)
                this.newStudent = {}
                this.Toast.fire({
                    icon:'error',
                    title: 'Something went wrong!'
                })
            })
        },

        async deleteStudent(id) {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete('/student/' + id + '/')
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Deleted!',
                        })
                        this.getStudents()
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
        },



        async showStudent(student) {
            this.studentExtra = student
            console.log(this.studentExtra)
            this.showStudentDialog = true
        },
        
        async editStudent(student) {
            this.drawer = !this.drawer
            await axiosInstance.get('/group/')
            .then((res) => {
                this.groups = res.data
                for (let i = 0; i < this.groups.length; i++) {
                    this.groupIds.push(this.groups[i].id)
                    this.groupValues.push(this.groups[i].no)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            this.newStudent.student_id = student.student_id
            this.newStudent.name = student.name
            this.newStudent.surname = student.surname
            this.newStudent.username = student.username
            this.newStudent.group = student.group.no
        }
    },
    components: {
      SideBar,
    },  
}