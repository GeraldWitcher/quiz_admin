import SideBar from '@/components/sidebar/SideBar';
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            headers: ['ID', 'question', 'option1', 'option2', 'option3', 'option4', 'actions'],
            filter: {},
            filterAdd: {},
            drawer: null,
            questions: [],
            subjects: [],
            exams: [],
            questionText: '',
            options: [
                { id: 1, option: ''},
                { id: 2, option: ''},
                { id: 3, option: ''},
                { id: 4, option: ''},
            ],
            correctAnswer: null,
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
        this.getSubjects(),
        this.getExams(),
        this.getQuestions()
    },
    methods: {
        async getQuestions() {
            let params = {}
            if (this.filter.subject) params.subject_id = this.filter.subject.id
            if (this.filter.exam) params.exam_id = this.filter.exam.id
            await axiosInstance.get('/question/', { params: params })
            .then((res) => {
                this.questions = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        async getSubjects() {
            await axiosInstance.get('/subject/')
            .then((res) => {
                this.subjects = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        async getExams() {
            await axiosInstance.get('/exam/')
            .then((res) => {
                this.exams = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        async saveQuestion() {
            if (!this.filterAdd.subject || !this.filterAdd.exam || !this.questionText === ''
            || this.options[0].option === '' || this.options[1].option === '' || this.options[2].option === '' || this.options[3].option === ''
            || this.correctAnswer === null) {
                this.Toast.fire({
                    icon: 'error',
                    title: 'All fields are required'
                })
            } else {
                await axiosInstance.post('/question/', {
                    question_text: this.questionText,
                    option1: this.options[0].option,
                    option2: this.options[1].option,
                    option3: this.options[2].option,
                    option4: this.options[3].option,
                    correct_answer: this.correctAnswer.id,
                    subject_id: this.filterAdd.subject.id,
                    exam_id: this.filterAdd.exam.id
                })
                .then(() => {
                    this.getQuestions()
                    this.drawer = !this.drawer
                    this.questionText = '',
                    this.options = [
                        { id: 1, option: ''},
                        { id: 2, option: ''},
                        { id: 3, option: ''},
                        { id: 4, option: ''},
                    ],
                    this.correctAnswer = null,
                    this.Toast.fire({
                        icon:'success',
                        title: 'Successfully saved'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })
                })
            }
        },

        async deleteQuestion(id) {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete('/question/' + id + '/')
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Deleted!',
                        })
                        this.getQuestions()
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