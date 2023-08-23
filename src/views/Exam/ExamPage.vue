<template>
    <div class="d-flex justify-center">
        <SideBar/>
        <v-img 
            v-if="exams.status_code == 204"
            src="@/assets/no-data.svg"
            style="position: absolute;width: 50%"
        />
        <v-container fluid style="padding: 30px 100px 0px 100px;">
            <v-row no-gutters class="mt-2 mb-5">
                <div style="color: #323b50; font-size: 25px" v-if="exams.length > 0">Exams</div>
                <v-spacer />
                <v-btn
                    elevation="0"
                    style="color: #7FBA5E; border: 1px solid #7FBA5E; background-color: transparent"
                    @click="drawer = !drawer"
                >
                    <v-icon color="#7FBA5E"> mdi-ab-testing </v-icon>
                    +
                </v-btn>
            </v-row>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right
                width="400"
                class="pa-8"
            >
                <div style="font-size: 20px;margin-bottom: 20px">Add new exam</div>
                <v-text-field dense class="mb-n3" outlined label="Name" v-model="exam.name"/>
                <v-text-field dense class="mb-n3" outlined label="Description" v-model="exam.description"/>
                <div style="font-size: 17px;margin-bottom: 5px;">Duration</div>
                <v-row no-gutters>
                    <v-col cols="12" sm="3" md="3" class="mr-3">
                        <v-text-field dense outlined label="hour" v-model="exam.hour"/>
                    </v-col>
                    <div class="mt-2">
                        :
                    </div>
                    <v-col cols="12" sm="3" md="3" class="mx-3">
                        <v-text-field dense outlined label="minute" v-model="exam.minute"/>
                    </v-col>
                    <div class="mt-2">
                        :
                    </div>
                    <v-col cols="12" sm="3" md="3" class="ml-3">
                        <v-text-field dense outlined label="second" v-model="exam.second"/>
                    </v-col>
                </v-row>

                <v-row no-gutters class="d-flex align-center">
                <div style="font-size: 17px;margin-right: 20px;">Status</div>
                <v-switch
                    v-model="exam.status"
                    color="#7FBA5E"
                    inset
                    :ripple="false"
                />
                </v-row>
                <v-btn
                    elevation="0"
                    width="100%"
                    height="35"
                    style="color: #7FBA5E; font-size: 17px; font-weight: 300; border: 1px solid #7FBA5E; background-color: transparent;"
                    @click="addExam"
                >
                    Save
                </v-btn>


            </v-navigation-drawer>

            <v-simple-table dense v-if="exams.length > 0">
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
                            v-for="(item, i) in exams" 
                            :key="i"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.time }}</td>
                            <td>
                                <v-btn icon x-small>
                                    <v-icon color="orange" size="20">mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn icon x-small @click="deleteExam(item.id)">
                                    <v-icon color="red" size="20">mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-switch
                                    v-model="item.status"
                                    color="#7FBA5E"
                                    inset
                                    :ripple="false"
                                    @click="updateExamStatus(item.id, item.status)"
                                ></v-switch>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script src="./ExamPage.js"/>

<style scoped src="./ExamPage.css"/>