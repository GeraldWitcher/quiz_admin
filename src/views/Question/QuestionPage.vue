<template>
    <div style="display: flex;justify-content: center;">
        <SideBar/>
        <v-img 
            v-if="questions.status_code == 204"
            src="@/assets/no-data.svg"
            style="position: absolute;width: 50%; margin-top: 100px"   
        />
        <v-container fluid style="padding: 30px 100px 0px 100px;">
            <v-row no-gutters class="mt-2 mb-5">
                <div style="color: #323b50; font-size: 25px">Questions</div>
                <v-spacer />
                <v-btn
                    elevation="0"
                    style="color: #7FBA5E; border: 1px solid #7FBA5E; background-color: transparent"
                    @click="drawer = !drawer"
                >
                    <v-icon color="#7FBA5E"> mdi-head-question-outline </v-icon>
                    +
                </v-btn>
            </v-row>
            <v-row no-gutters style="width: 400px;flex-wrap: nowrap;">
                <v-combobox 
                    v-model="filter.subject" 
                    outlined 
                    dense
                    :items="subjects" 
                    item-text="name" 
                    @change="getQuestions"
                    label="subject"
                    clearable
                />
                <v-combobox 
                    v-model="filter.exam" 
                    outlined 
                    dense 
                    class="ml-5" 
                    :items="exams" 
                    item-text="name" 
                    @change="getQuestions"
                    label="exam"
                    clearable
                />
            </v-row>

            <v-navigation-drawer
                temporary
                absolute
                v-model="drawer"
                right
                width="400"
                class="pa-8"
            >
                <div style="font-size: 20px;margin-bottom: 20px">Add new question</div>
                    <v-combobox 
                        v-model="filterAdd.subject" 
                        outlined 
                        dense 
                        :items="subjects" 
                        item-text="name" 
                        item-value="id" 
                        label="subject"
                        clearable
                    />
                    <v-combobox 
                        v-model="filterAdd.exam" 
                        outlined 
                        dense 
                        :items="exams" 
                        item-text="name"
                        item-value="id" 
                        label="exam"
                        clearable
                    />
                <v-textarea 
                    outlined 
                    v-model="questionText"
                    label="Question"
                />
                <v-text-field 
                    outlined
                    dense
                    label="option1"
                    v-model="options[0].option"
                />
                <v-text-field 
                    outlined
                    dense
                    label="option2"
                    v-model="options[1].option"
                />
                <v-text-field 
                    outlined
                    dense
                    label="option3"
                    v-model="options[2].option"
                />
                <v-text-field 
                    outlined
                    dense
                    label="option4"
                    v-model="options[3].option"
                />
                <v-combobox 
                    v-model="correctAnswer" 
                    outlined 
                    dense 
                    :items="options" 
                    item-text="option"
                    label="correct answer"
                />
                
                <v-btn
                    elevation="0"
                    width="100%"
                    height="35"
                    style="color: #7FBA5E; font-size: 17px; font-weight: 300; border: 1px solid #7FBA5E; background-color: transparent;"
                    @click="saveQuestion"
                >
                    Save
                </v-btn>
            </v-navigation-drawer>

            <v-simple-table dense v-if="questions.length > 0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, i) in headers"
                                :key="i"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, i) in questions" 
                            :key="i"
                        >
                            <td>{{ item.id }}</td>
                            <td style="max-width: 300px">{{ item.question_text }}</td>
                            <td :style="item.correct_answer === 1 ? 'color: green' : 'color: red'">{{ item.option1 }}</td>
                            <td :style="item.correct_answer === 2 ? 'color: green' : 'color: red'">{{ item.option2 }}</td>
                            <td :style="item.correct_answer === 3 ? 'color: green' : 'color: red'">{{ item.option3 }}</td>
                            <td :style="item.correct_answer === 4 ? 'color: green' : 'color: red'">{{ item.option4 }}</td>
                            <td>
                                <v-btn icon x-small>
                                    <v-icon color="orange" size="18">mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn icon x-small @click="deleteQuestion(item.id)">
                                    <v-icon color="red" size="18">mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script src="./QuestionPage.js"/>

<style scoped src="./QuestionPage.css"/>