<template>
  <v-app style="background-color: #faf9f7;">
    <div class="d-flex justify-center">
    <SideBar />
    <v-img 
      v-if="students.status_code == 204"
      src="@/assets/no-data.svg"
      style="position: absolute;width: 50%"
    />
    <v-container fluid style="padding: 30px 100px 0px 100px;">
      <v-row no-gutters class="mt-2 mb-5">
        <div style="color: #323b50; font-size: 25px" v-if="students.length > 0">Students</div>
        <v-spacer />
        <v-btn
          elevation="0"
          style="color: #7FBA5E; border: 1px solid #7FBA5E; background-color: transparent"
          @click="addStudent"
        >
          <v-icon color="#7FBA5E"> mdi-account-school-outline </v-icon>
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
        <div style="font-size: 20px;margin-bottom: 20px">Add new student</div>
        <v-text-field dense class="mb-n3" outlined label="Student ID" v-model="newStudent.student_id"/>
        <v-text-field dense class="mb-n3" outlined label="Name" v-model="newStudent.name"/>
        <v-text-field dense class="mb-n3" outlined label="Surname" v-model="newStudent.surname"/>
        <v-text-field dense class="mb-n3" outlined label="Username" v-model="newStudent.username"/>
        <v-text-field dense class="mb-n3" outlined label="Password" v-model="newStudent.password"/>
        <v-combobox :items='groupValues' dense class="mb-n3" outlined label="Group" v-model="newStudent.group"/>
        <v-btn
          elevation="0"
          width="100%"
          height="35"
          style="color: #7FBA5E; font-size: 17px; font-weight: 300; border: 1px solid #7FBA5E; background-color: transparent;"
          @click="saveStudent"
        >
          Save
        </v-btn>        
      </v-navigation-drawer>
      
      
      
      <v-simple-table dense v-if="students.length > 0" style="background-color: #faf9f7;">
        <template v-slot:default>
          <thead>
            <tr>
              <th 
                v-for="(item, i) in headers" 
                :key="i"
                @click="sortBy(item, sortType)"
                style="cursor: pointer;background-color: transparent !important"
              >
                {{ item }}
                <v-icon 
                  size="15" 
                  class="ml-1" 
                  v-if="item != 'Actions'"
                  :ripple="false"
                >
                  expand_all
                </v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, i) in students" :key="i" style="cursor: pointer;">
              <td @click="showStudent(student)">{{ student.id }}</td>
              <td @click="showStudent(student)">{{ student.student_id }}</td>
              <td @click="showStudent(student)">{{ student.name }}</td>
              <td @click="showStudent(student)">{{ student.surname }}</td>
              <td @click="showStudent(student)">{{ student.username }}</td>
              <td @click="showStudent(student)">{{ student.group.no }}</td>
              <td>
                <v-btn icon x-small @click="editStudent(student)">
                  <v-icon color="orange" size="18">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn icon x-small @click="deleteStudent(student.id)">
                  <v-icon color="red" size="18">mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-dialog v-model="showStudentDialog" max-width="500">
        <v-card 
            class="pa-5"
        > 
            <v-row>
                <v-col cols="12" md="6">
                    <v-card-title class="pa-0 student-header">ID</v-card-title>
                    <v-card-title class="pa-0 student-header">Student ID</v-card-title>
                    <v-card-title class="pa-0 student-header">Name</v-card-title>
                    <v-card-title class="pa-0 student-header">Surname</v-card-title>
                    <v-card-title class="pa-0 student-header">Username</v-card-title>
                    <v-card-title class="pa-0 student-header">Group</v-card-title>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card-title class="pa-0 student-body">{{ studentExtra.id }}</v-card-title>
                    <v-card-title class="pa-0 student-body">{{ studentExtra.student_id }}</v-card-title>
                    <v-card-title class="pa-0 student-body">{{ studentExtra.name }}</v-card-title>
                    <v-card-title class="pa-0 student-body">{{ studentExtra.surname }}</v-card-title>
                    <v-card-title class="pa-0 student-body">{{ studentExtra.username }}</v-card-title>
                    <v-card-title class="pa-0 student-body">{{ studentExtra.group }}</v-card-title>
                </v-col>
            </v-row>
        </v-card>
      </v-dialog>
    </v-container>
    </div>
  </v-app>
</template>

<script src="./StudentPage.js" />

<style scoped src="./StudentPage.css" />
